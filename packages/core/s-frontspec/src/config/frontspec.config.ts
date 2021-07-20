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
