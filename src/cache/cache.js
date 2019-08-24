const Cache = {
  storage: new Set(),
  contains(action) {
    return this.storage.has(action);
  },
  cacheActions(actions) {
    actions.forEach(action => this.storage.add(action));
    return this.storage;
  },
  removeAction(action) {
    return this.storage.delete(action);
  }
};

export default Cache;
