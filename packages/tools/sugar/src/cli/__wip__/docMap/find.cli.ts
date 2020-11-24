// @ts-nocheck

import __SDocMap from '../../node/doc/SDocMap';

export default async function docMapPath(stringArgs = '') {
  const pathes = await __SDocMap.find();
  console.log(pathes);
  process.exit();
};
