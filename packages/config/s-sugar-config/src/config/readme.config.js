export default function (env, config) {
    if (env.platform !== 'node')
        return;
    return {
        layout: {
            /**
             * @name            headerImageUrl
             * @namespace       config.readme.layout
             * @type            String
             * @default         [config.serve.img.url]/img/doc/readmeHeader.jpg
             *
             * Specify the header image to use for displaying readme. This has to be relative to your project root directory
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            headerImageUrl: '[config.serve.img.url]/doc/readmeHeader.jpg',
        },
        /**
         * @name            shields
         * @namespace       config.readme
         * @type            Object
         * @default         [config.shieldsio.shields]
         *
         * Specify the readme shields to display in your readme.
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        shields: '[config.shieldsio.shields]',
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZG1lLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlYWRtZS5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHLEVBQUUsTUFBTTtJQUNoQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFcEMsT0FBTztRQUNILE1BQU0sRUFBRTtZQUNKOzs7Ozs7Ozs7O2VBVUc7WUFDSCxjQUFjLEVBQUUsNkNBQTZDO1NBQ2hFO1FBQ0Q7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRSw0QkFBNEI7S0FDeEMsQ0FBQztBQUNOLENBQUMifQ==