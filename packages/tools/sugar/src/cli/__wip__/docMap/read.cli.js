"use strict";
import __SDocMap from '../../node/doc/SDocMap';

export default async function docMapRead(stringArgs = '') {
    const docMapJson = await __SDocMap.read();
    console.log(docMapJson);
    process.exit();
};
