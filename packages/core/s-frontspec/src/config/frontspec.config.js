import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
export default {
    /**
     * @name        default
     * @namespace       config.frontspec
     * @type          Object
     *
     * Specify the default frontspec file values that will be overrided by the user frontspec file ones
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    default: {
        /**
         * @name      head
         * @namespace     config.frontspec.default
         * @type      Object
         *
         * Specify some items you want to integrate to the head tag. It can be everything you want
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        head: {
            'viteClient@dev': `
        <script>
          document.addEventListener("DOMContentLoaded", function() {
            var $script = document.createElement("script");
            var ip = "${__ipAddress()}";
            $script.setAttribute("type", "module");
            $script.setAttribute("src", "[config.vite.server.hostname]/@vite/client");
            document.body.appendChild($script);
          });
        </script>
      `
        },
        /**
         * @name      assets
         * @namespace     config.frontspec.default
         * @type      Object
         * @default       [config.assets]
         *
         * Specify the default assets available in the current working directory like js, css, etc...
         *
         * @todo      Types
         *
         * @since     2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        assets: '[config.assets]'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzcGVjLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZyb250c3BlYy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxXQUFXLE1BQU0sa0RBQWtELENBQUM7QUFFM0UsZUFBZTtJQUNiOzs7Ozs7Ozs7T0FTRztJQUNILE9BQU8sRUFBRTtRQUVQOzs7Ozs7Ozs7V0FTRztRQUNILElBQUksRUFBRTtZQUNKLGdCQUFnQixFQUFFOzs7O3dCQUlBLFdBQVcsRUFBRTs7Ozs7O09BTTlCO1NBQ0Y7UUFFRDs7Ozs7Ozs7Ozs7O1dBWUc7UUFDSCxNQUFNLEVBQUUsaUJBQWlCO0tBQzFCO0NBQ0YsQ0FBQyJ9