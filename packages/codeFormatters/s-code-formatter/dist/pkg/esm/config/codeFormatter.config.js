export default (api) => {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name            glob
         * @namespace       config.codeFormatter
         * @type            String
         * @default         ** /*
         *
         * Specify the default glob for the SCodeFormatter.format process
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com>
         */
        glob: '**/*',
        /**
         * @name            inDir
         * @namespace       config.codeFormatter
         * @type            String
         * @default         [config.storage.src.rootDir]
         *
         * Specify the default inDir for the SCodeFormatter.format process
         *
         * @since           2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com>
         */
        get inDir() {
            return api.config.storage.src.rootDir;
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGVBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNuQixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFLE1BQU07UUFFWjs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxLQUFLO1lBQ0wsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQzFDLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyxDQUFDIn0=