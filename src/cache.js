const isTestingEnvironment = process.env.NODE_ENV === 'test';
const removeAll = () => Cache.storage.clear();

const Cache = {
  storage: new Set(),
  contains(action) {
    return this.storage.has(action);
  },
  cacheAction(action) {
    return this.storage.add(action);
  },
  removeAction(action) {
    return this.storage.delete(action);
  },
  ...(isTestingEnvironment && { removeAll })
};

export default Cache;
