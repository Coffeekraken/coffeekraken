import __SI18n from '../node/SI18n';

export default function extract(stringArgs = ''): Promise<void> {
    return new Promise(async (resolve) => {
        const i18n = new __SI18n();
        await i18n.extract(stringArgs);
        resolve();
    });
}
