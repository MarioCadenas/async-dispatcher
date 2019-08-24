import React, { useEffect, useState } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import Cache from '@/cache';

const isTestingEnvironment = process.env.NODE_ENV === 'test';

function asyncDispatcher(mapAsyncDispatch) {
  const { actions } = mapAsyncDispatch;

  return Component => {
    const WrappedComponent = props => {
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const actionsToCall = actions.filter(action => !Cache.contains(action));

      Cache.cacheActions(actions);

      useEffect(() => {
        async function dispatchAsyncActions() {
          try {
            const dispatchedActions = actionsToCall.map(async action =>
              asyncDispatcher.dispatch(action())
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

      const dispatchToProps = mapDispatchToProps(actions, asyncDispatcher.dispatch);

      return <Component loading={loading} error={error} {...dispatchToProps} {...props} />;
    };

    WrappedComponent.displayName = `asyncConnected(${Component.displayName || Component.name})`;
    hoistNonReactStatics(WrappedComponent, Component);

    return WrappedComponent;
  };
}

export const mapDispatchToProps = (actions, dispatch) =>
  actions.reduce((acc, current) => ({ ...acc, [current.name]: () => dispatch(current()) }), {});

export const validator = () => {
  throw new Error('You should pass a valid store object.');
};

export const configureDispatcher = ({ dispatch = validator() } = {}) =>
  Object.defineProperty(asyncDispatcher, 'dispatch', {
    value: dispatch,
    writable: isTestingEnvironment,
    configurable: isTestingEnvironment
  });

export default asyncDispatcher;
