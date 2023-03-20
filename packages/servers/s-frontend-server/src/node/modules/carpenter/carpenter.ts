import __SCarpenter from '@coffeekraken/s-carpenter';

export default function carpenter({ express, settings, config }) {
    return new Promise(async (resolve) => {
        const carpenter = new __SCarpenter();
        await carpenter.initOnExpressServer(express);
        resolve(true);
    });
}
