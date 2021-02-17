import __SCache from './_SCache';
import __SCacheLsAdapter from './adapters/SCacheLsAdapter';

__SCache.registerAdapter(__SCacheLsAdapter);

export * from './_SCache';
export default __SCache;
