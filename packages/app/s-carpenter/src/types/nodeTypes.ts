import type { ISRenderableNode } from '@specim3n/types';

export default interface ISCarpenterNode extends ISRenderableNode {
    scope: 'user' | 'repo';
}
