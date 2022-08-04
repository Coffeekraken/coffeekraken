"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (api) => {
    if (api.env.platform !== 'node')
        return;
    return {
        layout: {
            /**
             * @name            headerImageUrl
             * @namespace       config.license.layout
             * @type            String
             * @default         [config.serve.img.url]/doc/licenseHeader.jpg
             *
             * Specify the header image to use for displaying license. This has to be relative to your project root directory
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get headerImageUrl() {
                return `${api.config.serve.img.url}/doc/licenseHeader.jpg`;
            },
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNuQixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSCxNQUFNLEVBQUU7WUFDSjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxjQUFjO2dCQUNkLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyx3QkFBd0IsQ0FBQztZQUMvRCxDQUFDO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQyxDQUFDIn0=