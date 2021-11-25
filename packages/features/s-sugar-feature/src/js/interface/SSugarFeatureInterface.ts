import __SInterface from '@coffeekraken/s-interface';

export default class SSugarFeatureInterface extends __SInterface {
    static get _definition() {
        return {
            scrolled: {
                description:
                    'Specify if you want the "scrolled" class to be applied on the "body" element when the page has been scrolled',
                type: 'Boolean',
                default: true,
            },
            scrolledDelta: {
                description:
                    'Specify after how many scroll the scrolled class will be applied',
                type: 'Number',
                default: 10,
            },
            vhvar: {
                description:
                    'Specify if you want the "--vh" css variable to be computed and available',
                type: 'Boolean',
                default: true,
            },
        };
    }
}
