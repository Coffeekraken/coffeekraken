import type { ISViewRendererRenderResult } from '../SViewRenderer';

export interface I404Data {
    title: string;
    body: string;
}
export default function page404(renderer: any, data: I404Data): Promise<ISViewRendererRenderResult>;
