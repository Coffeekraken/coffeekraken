import __SInterface from '@coffeekraken/s-interface';
/**
 * @name          scalable
 * @namespace     node.function.scalable
 * @type          PostcssFunction
 * @platform      postcss
 * @status        beta
 *
 * This function allows you to get value that will be scaled using the "--s-scale" variable.
 * This allows you to make your components aware of classes like "s-scale-10", etc...
 *
 * @param       {Number}        value      The value you want to be scalable
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *    padding: sugar.scalable(20px);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginScalableFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            value: {
                type: 'String|Number',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginScalableFunctionInterface as interface };
export default function ({ params, }) {
    const finalParams = Object.assign({ value: '' }, params);
    return `calc(${finalParams.value} * var(--s-scale, 1))`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY2FsYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxNQUFNLDJDQUE0QyxTQUFRLFlBQVk7SUFDbEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsZUFBZTtnQkFDckIsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLDJDQUEyQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBTXBFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxHQUdUO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxFQUFFLElBQ04sTUFBTSxDQUNaLENBQUM7SUFFRixPQUFPLFFBQVEsV0FBVyxDQUFDLEtBQUssdUJBQXVCLENBQUM7QUFDNUQsQ0FBQyJ9