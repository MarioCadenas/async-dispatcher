const Cache = {
  storage: new Set(),
  contains(action: Function) {
    return this.storage.has(action);
  },
  cacheActions(actions: Array<Function>) {
    actions.forEach((action: Function) => this.storage.add(action));
    return this.storage;
  },
  removeAction(action: Function) {
    return this.storage.delete(action);
  }
};

export default Cache;
