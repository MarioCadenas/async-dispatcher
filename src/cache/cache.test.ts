import Cache from '@/cache';

const setup = () => {
  function a() {}
  function b() {}
  function c() {}

  return {
    a,
    b,
    actions: [a, b]
  };
};

describe('Cache', () => {
  beforeEach(() => {
    Cache.storage.clear();
  });

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
    const { a, b } = setup();

    Cache.cacheActions([a, a]);

    expect(Cache.storage.size).toBe(1);

    Cache.cacheActions([a, b]);

    expect(Cache.storage.size).toBe(2);
  });

  it('should remove an existing action', () => {
    const { a } = setup();

    Cache.cacheActions([a]);
    Cache.removeAction(a);

    expect(Cache.storage.size).toBe(0);
  });

  it('should return false when trying to remove a non existing action', () => {
    expect(Cache.removeAction(() => {})).toBe(false);
  });

  it('should return true when action removed', () => {
    const { a } = setup();
    Cache.cacheActions([a]);

    expect(Cache.removeAction(a)).toBe(true);
  });

  it('should return true when action exists', () => {
    const { b } = setup();
    Cache.cacheActions([b]);

    expect(Cache.contains(b)).toBe(true);
  });

  it('should return false when action does not exist', () => {
    const { a } = setup();

    expect(Cache.contains(a)).toBe(false);
  });

  it('should add every action passed', () => {
    const { actions } = setup();

    Cache.cacheActions(actions);

    expect(Cache.storage.size).toBe(setup().actions.length);
  });
});
