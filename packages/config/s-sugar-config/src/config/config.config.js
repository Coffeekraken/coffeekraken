export default function (env, config) {
    return {
        browser: {
            /**
             * @name            include
             * @namespace       config.config.browser.include
             * @type            Array<String>
             * @default         ['contact', 'datetime', 'log', 'serve', 'env', 'theme']
             *
             * Specify which configuration you want to include for the "browser". If the array is empty, will include all the configs
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            include: ['contact', 'datetime', 'log', 'serve', 'env', 'theme'],
        },
        node: {
            /**
             * @name            include
             * @namespace       config.config.node.include
             * @type            Array<String>
             * @default         []
             *
             * Specify which configuration you want to include for the "browser". If the array is empty, will include all the configs
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            include: [],
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbmZpZy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHLEVBQUUsTUFBTTtJQUNoQyxPQUFPO1FBQ0gsT0FBTyxFQUFFO1lBQ0w7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDO1NBQ25FO1FBQ0QsSUFBSSxFQUFFO1lBQ0Y7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxFQUFFO1NBQ2Q7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9