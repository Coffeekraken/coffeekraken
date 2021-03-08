import __SCache from './_SCache';
import __SCacheFsAdapter from './adapters/SCacheFsAdapter';

// @ts-ignore
__SCache.registerAdapter(__SCacheFsAdapter);

export * from './_SCache';
export default __SCache;
