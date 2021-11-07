import __SInterface from '@coffeekraken/s-interface';

export default class SActivateComponentInterface extends __SInterface {
    static get definition() {
        return (
            this.cached() ??
            this.cache({
                method: {
                    type: 'String',
                    values: ['get', 'post'],
                    default: 'get',
                },
                url: {
                    type: 'String',
                    required: true,
                },
                trigger: {
                    type: 'String',
                    values: ['event'],
                    default: 'event',
                },
                on: {
                    type: 'String',
                },
                cache: {
                    type: 'String|Boolean',
                    default: false,
                },
            })
        );
    }
}
