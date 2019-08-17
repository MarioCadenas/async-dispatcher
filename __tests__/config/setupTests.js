import Cache from '@/cache';
import asyncConnect from '@/connect-async';

Object.defineProperty(asyncConnect, 'dispatch', { value: () => {} });
Object.defineProperty(Cache, 'removeAll', { value: () => Cache.storage.clear() });

global.beforeEach(() => {
  Cache.removeAll();
});
