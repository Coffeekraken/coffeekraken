
export interface ITodo {
    priority: 'low' | 'normal' | 'high';
    description: string;
}
declare function todo(data: any, blockSettings: any): ITodo[];
export default todo;
