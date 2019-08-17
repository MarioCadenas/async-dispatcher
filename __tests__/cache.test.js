import Cache from '@/cache';

describe('Cache', () => {
  it('should be an object', () => {
    expect(typeof Cache).toBe('object');
  });

  it('should have a property "contains" and it must be a function', () => {
    expect(typeof Cache.contains).toBe('function');
  });

  it('should have a property "cacheAction" and it must be a function', () => {
    expect(typeof Cache.cacheAction).toBe('function');
  });

  it('should have a property "removeAction" and it must be a function', () => {
    expect(typeof Cache.removeAction).toBe('function');
  });

  it('should not add repeated actions', () => {
    Cache.cacheAction('myAction');
    Cache.cacheAction('myAction');

    expect(Cache.storage.size).toBe(1);
  });

  it('should remove an existing action', () => {
    const actionName = 'myAction';
    Cache.cacheAction(actionName);
    Cache.removeAction(actionName);

    expect(Cache.storage.size).toBe(0);
  });

  it('should return false when trying to remove a non existing action', () => {
    expect(Cache.removeAction('foo')).toBe(false);
  });

  it('should return true when action removed', () => {
    const actionName = 'myAction';
    Cache.cacheAction(actionName);

    expect(Cache.removeAction(actionName)).toBe(true);
  });

  it('should return true when action exists', () => {
    const actionName = 'myAction';
    Cache.cacheAction(actionName);

    expect(Cache.contains(actionName)).toBe(true);
  });

  it('should return false when action does not exist', () => {
    expect(Cache.contains('myAction')).toBe(false);
  });
});
