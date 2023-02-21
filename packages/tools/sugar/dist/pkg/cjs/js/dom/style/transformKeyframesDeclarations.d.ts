
export interface ITransformedKeyframeDeclaration {
    percentage: number;
    offset: number;
    rules: Record<string, any>;
}
export default function transformKeyframeDeclaration(keyFrameRule: any): ITransformedKeyframeDeclaration[];
