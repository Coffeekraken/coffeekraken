"use strict";
import __sugarHeading from '../../node/ascii/sugarHeading';
import __packageJson from '../../node/package/json';

export default function (stringArgs = '') {
    console.log(__sugarHeading({
        version: __packageJson(__dirname).version
    }));
};
