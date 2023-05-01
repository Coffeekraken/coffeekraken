import type { ISRenderableNode } from '@specimen/types';

export default interface ISCarpenterNode extends ISRenderableNode {
    scope: 'user' | 'package';
}
