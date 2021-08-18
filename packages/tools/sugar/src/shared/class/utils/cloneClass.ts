import { cloneClass } from 'clone-class';

export default function (cls: any): any {
    return cloneClass(cls);
}
