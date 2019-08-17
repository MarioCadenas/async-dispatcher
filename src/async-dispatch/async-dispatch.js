import React, { useEffect, useState } from 'react';
import Cache from '@/cache';

function asyncDispatcher(mapAsyncDispatch) {
  const actions = Object.keys(mapAsyncDispatch.actions);

  return Component => {
    const WrappedComponent = props => {
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const actionsToCall = actions.filter(action => !Cache.contains(action));

      actions.forEach(Cache.cacheAction.bind(Cache));

      useEffect(() => {
        async function dispatchAsyncActions() {
          try {
            const dispatchedActions = actionsToCall.map(async action =>
              asyncDispatcher.dispatch(mapAsyncDispatch.actions[action]())
            );
            await Promise.all(dispatchedActions);
            setLoading(false);
          } catch (e) {
            setError(e);
          }
        }
        dispatchAsyncActions();
      }, [setLoading, setError]);

      if (loading && !error) {
        return mapAsyncDispatch.loading();
      }

      if (error) {
        return mapAsyncDispatch.error(error);
      }

      return <Component loading={loading} error={error} {...props} />;
    };

    WrappedComponent.displayName = `asyncConnected(${Component.displayName || Component.name})`;

    return WrappedComponent;
  };
}

export default asyncDispatcher;
