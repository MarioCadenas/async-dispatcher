import Cache from '@/cache';

describe('Cache', () => {
  it('should be an object', () => {
    expect(typeof Cache).toBe('object');
  });

  it('should have a property "contains" and it must be a function', () => {
    expect(typeof Cache.contains).toBe('function');
  });

  it('should have a property "cacheActions" and it must be a function', () => {
    expect(typeof Cache.cacheActions).toBe('function');
  });

  it('should have a property "removeAction" and it must be a function', () => {
    expect(typeof Cache.removeAction).toBe('function');
  });

  it('should not add repeated actions', () => {
    Cache.cacheActions(['myAction', 'myAction']);

    expect(Cache.storage.size).toBe(1);

    Cache.cacheActions(['myAction', 'myAction2']);

    expect(Cache.storage.size).toBe(2);
  });

  it('should remove an existing action', () => {
    const actionName = 'myAction';

    Cache.cacheActions([actionName]);
    Cache.removeAction(actionName);

    expect(Cache.storage.size).toBe(0);
  });

  it('should return false when trying to remove a non existing action', () => {
    expect(Cache.removeAction('foo')).toBe(false);
  });

  it('should return true when action removed', () => {
    const actionName = 'myAction';

    Cache.cacheActions([actionName]);

    expect(Cache.removeAction(actionName)).toBe(true);
  });

  it('should return true when action exists', () => {
    const actionName = 'myAction';
    Cache.cacheActions([actionName]);

    expect(Cache.contains(actionName)).toBe(true);
  });

  it('should return false when action does not exist', () => {
    expect(Cache.contains('myAction')).toBe(false);
  });

  it('should add every action passed', () => {
    const actions = ['action1', 'action2', 'action3'];

    Cache.cacheActions(actions);

    expect(Cache.storage.size).toBe(3);
  });
});
