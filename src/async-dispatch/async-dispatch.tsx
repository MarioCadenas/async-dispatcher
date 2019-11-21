import React, { Component, useEffect, useState } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import Cache from '@/cache';

const isTestingEnvironment = process.env.NODE_ENV === 'test';

type Nullable<T> = T | null;

interface IMapAsyncDispatch {
  error: Function;
  loading: Function;
  actions: Array<Function>;
}

interface IFunctionsObject {
  [key: string]: Function;
}

interface AsyncDispatcher {
  dispatch: Function;
}

interface IStore {
  dispatch: Function;
}

interface WithLoadingProps {
  loading: boolean;
  error: Nullable<Error>;
}

const dispatcher: AsyncDispatcher = {
  dispatch() {}
};

const asyncDispatcher = (mapAsyncDispatch: IMapAsyncDispatch) => {
  const { actions } = mapAsyncDispatch;

  return <P extends object>(Component: React.ComponentType<P & WithLoadingProps>) => {
    const WrappedComponent = (props: Object) => {
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const actionsToCall = actions.filter(action => !Cache.contains(action));

      Cache.cacheActions(actions);

      useEffect(() => {
        async function dispatchAsyncActions() {
          try {
            const mapActions = async (action: Function) => dispatcher.dispatch(action());
            const dispatchedActions: Array<Promise<any>> = actionsToCall.map(mapActions);

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

      const dispatchToProps = mapDispatchToProps(actions, dispatcher.dispatch);

      return <Component loading={loading} error={error} {...dispatchToProps} {...(props as P)} />;
    };

    WrappedComponent.displayName = `asyncConnected(${Component.displayName || Component.name})`;
    hoistNonReactStatics(WrappedComponent, Component);

    return WrappedComponent;
  };
};

export const mapDispatchToProps = (
  actions: Array<Function>,
  dispatch: Function
): IFunctionsObject =>
  actions.reduce(
    (acc: Object, current: Function) => ({ ...acc, [current.name]: () => dispatch(current()) }),
    {}
  );

export const configureDispatcher = (store: IStore) =>
  Object.defineProperty(dispatcher, 'dispatch', {
    value: store.dispatch,
    writable: isTestingEnvironment,
    configurable: isTestingEnvironment
  });

export default asyncDispatcher;
