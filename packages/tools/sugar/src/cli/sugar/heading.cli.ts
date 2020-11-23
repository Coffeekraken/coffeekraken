import _sugarHeading from '../../node/ascii/sugarHeading';
import _packageJson from '../../node/package/json';

export default function (stringArgs = '') {
  console.log(
    _sugarHeading({
      version: _packageJson(__dirname).version
    })
  );
}
