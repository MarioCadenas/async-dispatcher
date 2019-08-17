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
  }
};

export default Cache;
