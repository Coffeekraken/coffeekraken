import __SPromise from '@coffeekraken/s-promise';
import __SCodeFormatter from '../node/SCodeFormatter';

export default function format(stringArgs = '') {
    return new __SPromise(async ({ resolve, pipe }) => {
        const formatter = new __SCodeFormatter();
        const formatPromise = formatter.format(stringArgs);
        pipe(formatPromise);
        resolve(await formatPromise);
        process.exit();
    });
}
