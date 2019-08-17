import React from 'react';
import { render, waitForElement, findByTestId, act } from '@testing-library/react';
import asyncDispatch from '@/async-dispatch';

const setup = () => {
  const componentTestId = 'my-component';
  const MyComponent = props => <div data-testid={componentTestId}>My super component</div>;
  const timeout = 2500;
  const loaderTestId = 'loading';
  const errorTestId = 'error';
  const Loader = () => <div data-testid={loaderTestId}>Loading</div>;
  const Error = () => <div data-testid={errorTestId}>Error</div>;
  const loaderAndError = {
    loading: Loader,
    error: Error
  };
  const asyncFunction = () =>
    new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  const asyncError = () => {
    throw new Error('error');
  };
  const mapAsyncDispatchWithErrorFunction = {
    ...loaderAndError,
    actions: { asyncError }
  };
  const mapAsyncDispatchWithSuccessfulFunction = {
    ...loaderAndError,
    actions: { asyncFunction }
  };

  return {
    MyComponent,
    componentTestId,
    loaderTestId,
    errorTestId,
    timeout,
    loaderAndError,
    mapAsyncDispatchWithErrorFunction,
    mapAsyncDispatchWithSuccessfulFunction
  };
};

describe('asyncDispatch', () => {
  it('should return a function', () => {
    const mapAsyncDispatch = {
      loading: null,
      error: null,
      actions: {}
    };
    const result = asyncDispatch(mapAsyncDispatch);

    expect(typeof result).toBe('function');
  });

  describe('asyncDispatch integration', () => {
    it('should return loading component while promises resolve', async () => {
      const { MyComponent, mapAsyncDispatchWithSuccessfulFunction, loaderTestId } = setup();
      const AsyncComponent = asyncDispatch(mapAsyncDispatchWithSuccessfulFunction)(MyComponent);
      const { container } = render(<AsyncComponent />);

      await waitForElement(
        async () => {
          const wrapper = await findByTestId(container, loaderTestId);

          expect(wrapper).toBeTruthy();
        },
        { container }
      );
    });

    it('should return the component after promises are resolved', async () => {
      const { mapAsyncDispatchWithSuccessfulFunction, MyComponent, componentTestId } = setup();
      const AsyncComponent = asyncDispatch(mapAsyncDispatchWithSuccessfulFunction)(MyComponent);
      const { container } = render(<AsyncComponent />);

      await waitForElement(
        async () => {
          const wrapper = await findByTestId(container, componentTestId);

          expect(wrapper).toBeTruthy();
        },
        { container }
      );
    });

    it('should throw an error if any of the promises throws an error', async () => {
      const { MyComponent, mapAsyncDispatchWithErrorFunction, errorTestId } = setup();
      const AsyncComponent = asyncDispatch(mapAsyncDispatchWithErrorFunction)(MyComponent);
      const { container } = render(<AsyncComponent />);

      await waitForElement(
        async () => {
          const wrapper = await findByTestId(container, errorTestId);

          expect(wrapper).toBeTruthy();
        },
        { container }
      );
    });

    it('should call all passed actions', async () => {
      const { MyComponent } = setup();
      const action1 = jest.fn();
      const action2 = jest.fn();
      const mapAsyncDispatch = {
        loading: () => '',
        error: () => '',
        actions: {
          action1,
          action2
        }
      };
      const AsyncComponent = asyncDispatch(mapAsyncDispatch)(MyComponent);

      await act(async () => render(<AsyncComponent />));

      expect(action1).toHaveBeenCalledTimes(1);
      expect(action2).toHaveBeenCalledTimes(1);
    });

    it('should not call an action that has already been called', async () => {
      const { MyComponent, loaderAndError } = setup();
      const action1 = jest.fn();
      const action2 = jest.fn();
      const mapAsyncDispatch1 = {
        ...loaderAndError,
        actions: { action1 }
      };
      const mapAsyncDispatch2 = {
        ...loaderAndError,
        actions: { action1: action2 }
      };
      const AsyncComponent = asyncDispatch(mapAsyncDispatch1)(MyComponent);
      const AsyncComponent2 = asyncDispatch(mapAsyncDispatch2)(MyComponent);

      await act(async () => render(<AsyncComponent />));
      await act(async () => render(<AsyncComponent2 />));

      expect(action1).toHaveBeenCalledTimes(1);
      expect(action2).not.toHaveBeenCalled();
    });
  });
});
