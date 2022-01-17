// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import __SFrontspec from '../node/SFrontspec';

export default (stringArgs = '') => {
  return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
    const frontspec = new __SFrontspec();
    const buildPromise = frontspec.read(stringArgs);
    pipe(buildPromise);
    resolve(await buildPromise);
    console.log(await buildPromise);
  });
};
