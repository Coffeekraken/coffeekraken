export default function (api) {
    return {
        filters: {
            /**
             * @name            min
             * @namespace       config.bench.filters
             * @type            Number
             * @default         40
             *
             * Specify the benches to filters out when under a certain duration in ms
             *
             * @since           2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            min: 50,

            /**
             * @name            max
             * @namespace       config.bench.filters
             * @type            Number
             * @default         99999999999
             *
             * Specify the benches to filters out when above a certain duration in ms
             *
             * @since           2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            max: 99999999999,
        },
    };
}
