const cache = new Set();

export const cacheAction = action => {
  if (!cache.has(action)) {
    cache.add(action);
  }
};

export default cache;
