import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SFrontstackRecipeParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SFrontstack.action method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFrontstackRecipeParamsInterface extends __SInterface {
    static get _definition() {
        return {
            stack: {
                description: 'Specify the stack you want to execute like "dev", "build", etc...',
                type: 'String',
                alias: 's',
            },
            recipe: {
                description: 'Specify the recipe you want to execute the stack from',
                type: 'String',
                alias: 'r',
            },
            runInParallel: {
                description: 'Specify if you want the recipe actions to run in parallel of not',
                type: 'Boolean',
                alias: 'p'
            },
            env: {
                description: 'Specify the environment in which to execute your recipe',
                type: 'String',
            },
        };
    }
}
export default SFrontstackRecipeParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3RhY2tSZWNpcGVQYXJhbXNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRnJvbnRzdGFja1JlY2lwZVBhcmFtc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFNLGdDQUFpQyxTQUFRLFlBQVk7SUFDdkQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1AsbUVBQW1FO2dCQUN2RSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCx1REFBdUQ7Z0JBQzNELElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsV0FBVyxFQUFFLGtFQUFrRTtnQkFDL0UsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQ1AseURBQXlEO2dCQUM3RCxJQUFJLEVBQUUsUUFBUTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFFRCxlQUFlLGdDQUFnQyxDQUFDIn0=