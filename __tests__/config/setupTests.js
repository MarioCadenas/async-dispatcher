import Cache from '@/cache';
import { configureDispatcher } from '@/async-dispatch';

Object.defineProperty(Cache, 'removeAll', { value: () => Cache.storage.clear() });
configureDispatcher({ dispatch() {} });

global.beforeEach(() => {
  Cache.removeAll();
});
