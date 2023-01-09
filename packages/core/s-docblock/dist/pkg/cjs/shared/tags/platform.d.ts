
export interface IPlatform {
    name: string;
    description: string;
}
declare function param(data: any, blockSettings: any): IPlatform[];
export default param;
