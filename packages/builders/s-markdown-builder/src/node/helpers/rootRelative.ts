import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';

export default function rootRelative(path: string): string {
    return path.replace(`${__packageRoot()}/`, '');
}
