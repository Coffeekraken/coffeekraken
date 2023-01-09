export interface ISActivateFeatureProps {
}

export interface ISugarElementTranslates {
    x: number;
    y: number;
    z: number;
}
export interface ISugarElementRotates {
    x: number;
    y: number;
    z: number;
}
export interface ISugarElementTransforms {
    translateX: number;
    translateY: number;
    translateZ: number;
    rotateX: number;
    rotateY: number;
    rotateZ: number;
    matrix?: string;
}
export default class SSugarElement {
    
    $elm: HTMLElement;
    
    _tmpMatrix: any;
    get matrix(): Array<number>;
    
    get matrixStr(): string;
    
    constructor($elm: HTMLElement);
    
    simulateTransform(transform: Partial<ISugarElementTransforms>): ISugarElementTransforms;
    
    applyMatrix(...matrix: Array<number>[]): SSugarElement;
    
    overrideMatrix(matrix: Array<number>): SSugarElement;
    
    getTranslates(fromMatrix?: number[]): ISugarElementTranslates;
    
    getRotates(fromMatrix?: number[]): ISugarElementRotates;
    
    setTranslate(x?: number, y?: number, z?: number): SSugarElement;
    
    translate(x?: number, y?: number, z?: number): SSugarElement;
    
    rotate(x?: number, y?: number, z?: number): SSugarElement;
    
    setRotate(x?: number, y?: number, z?: number): SSugarElement;
}
