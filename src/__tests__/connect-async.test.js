import asyncConnect from '../connect-async';

describe('asyncConnect', () => {
  it('should return a function', () => {
    const mapAsyncDispatch = dispatch => ({
      loading: null,
      error: null,
      actions: {}
    });
    const result = asyncConnect(mapAsyncDispatch);

    expect(typeof result).toBe('function');
  });
});
