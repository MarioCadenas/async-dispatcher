import React, { useEffect, useState } from 'react';
import cache, { cacheAction } from './cache';

export default function asyncConnect(mapAsyncDispatch) {
  const asyncActions = mapAsyncDispatch(asyncConnect.dispatch);
  const actions = Object.keys(asyncActions.actions);

  return Component => {
    const WrappedComponent = props => {
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const actionsToCall = actions.filter(action => !cache.has(action));

      actions.forEach(cacheAction);

      useEffect(() => {
        async function dispatchAsyncActions() {
          try {
            const dispatchedActions = actionsToCall.map(action => asyncActions.actions[action]());
            await Promise.all(dispatchedActions);
            setLoading(false);
          } catch (e) {
            setError(e);
          }
        }
        dispatchAsyncActions();
      }, [setLoading]);

      if (loading) {
        return asyncActions.loading();
      }

      if (error) {
        return error;
      }

      return <Component loading={loading} error={error} {...props} />;
    };

    WrappedComponent.displayName = `asyncConnected(${Component.displayName || Component.name})`;

    return WrappedComponent;
  };
}
