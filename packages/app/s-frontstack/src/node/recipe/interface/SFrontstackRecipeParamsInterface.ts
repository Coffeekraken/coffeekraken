import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SFrontstackRecipeParamsInterface
 * @namespace           s-frontstack
 * @type                Class
 * @extends             SInterface
 * @status              wip
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
    static definition = {
        stack: {
            type: 'String',
            alias: 's',
        },
        recipe: {
            type: 'String',
            alias: 'r',
        },
        env: {
            type: 'String',
        },
    };
}

export default SFrontstackRecipeParamsInterface;
