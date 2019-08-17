import Cache from '@/cache';
import asyncConnect from '@/async-dispatch';

Object.defineProperty(asyncConnect, 'dispatch', { value: () => {} });
Object.defineProperty(Cache, 'removeAll', { value: () => Cache.storage.clear() });

global.beforeEach(() => {
  Cache.removeAll();
});
