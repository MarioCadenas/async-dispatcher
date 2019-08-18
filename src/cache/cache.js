const Cache = {
  storage: new Set(),
  contains(action) {
    return this.storage.has(action);
  },
  cacheActions(actions) {
    return this.storage.add(...actions);
  },
  removeAction(action) {
    return this.storage.delete(action);
  }
};

export default Cache;
