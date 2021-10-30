import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';

export default function configValue(path: string): string {
    if (typeof path !== 'string') return path;
    return path.replace(`${__packageRoot()}/`, '');
}
