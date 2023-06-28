import __SFrontendChecker from '../node/SFrontendChecker';

export default function check(stringArgs = '') {
    return new Promise(async (resolve) => {
        const checker = new __SFrontendChecker();
        const result = await checker.check(stringArgs);
        resolve(result);
    });
}
