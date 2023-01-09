
export interface IPlatform {
    name: string;
    description: string;
}
declare function support(data: any, blockSettings: any): IPlatform[];
export default support;
