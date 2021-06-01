import __postcss from 'postcss';
/**
 * @name            sVitePluginPostcss
 * @namespace       node
 * @type            Function
 *
 * This plugin allows you to use the awesome RiotJs library
 * to build your webcomponent using vite frontend development stack.
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function sVitePluginPostcss(postcssPlugins = []) {
    const fileRegex = /\.css(\?.*)?$/;
    return {
        name: 's-vite-plugin-postcss',
        transform(src, id) {
            if (fileRegex.test(id)) {
                const css = __postcss(postcssPlugins).process(src, {
                    from: id.split('?')[0]
                }).css;
                return {
                    code: css,
                    map: null
                };
            }
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic1ZpdGVQbHVnaW5Qb3N0Y3NzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic1ZpdGVQbHVnaW5Qb3N0Y3NzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUVoQzs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxrQkFBa0IsQ0FBQyxpQkFBd0IsRUFBRTtJQUNuRSxNQUFNLFNBQVMsR0FBRyxlQUFlLENBQUM7SUFFbEMsT0FBTztRQUNMLElBQUksRUFBRSx1QkFBdUI7UUFDN0IsU0FBUyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUN0QixNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtvQkFDakQsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN2QixDQUFDLENBQUMsR0FBRyxDQUFDO2dCQUNQLE9BQU87b0JBQ0wsSUFBSSxFQUFFLEdBQUc7b0JBQ1QsR0FBRyxFQUFFLElBQUk7aUJBQ1YsQ0FBQzthQUNIO1FBQ0gsQ0FBQztLQUNGLENBQUM7QUFDSixDQUFDIn0=