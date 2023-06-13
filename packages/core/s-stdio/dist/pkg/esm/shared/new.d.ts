import type { ISStdioSettings } from './SStdio';
import type { ISStdioAdapter } from './SStdioAdapter';
import type { ISStdioSource } from './SStdioSource';

export default function _new(id: string, sources: ISStdioSource[], adapters: ISStdioAdapter[], settings?: ISStdioSettings): Promise<any>;
