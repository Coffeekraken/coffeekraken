import __packageJson from '@coffeekraken/sugar/node/package/json';

export async function prepare() {  
    return await __packageJson();
}

export default {}