// @ts-nocheck

import _sugarHeading from '../../node/ascii/sugarHeading';
import _packageJson from '../../node/package/json';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';

function heading(stringArgs = '') {
  console.log(
    _sugarHeading({
      version: _packageJson(__dirname()).version
    })
  );
}

export default heading;
