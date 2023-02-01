import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginScopePreventMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginScopePreventMixinInterface as interface };
/**
 * @name           prevent
 * @namespace      node.mixin.scope
 * @type           PostcssMixin
 * @platform        css
 * @status        beta
 *
 * This mixin allows you to mark some css as not using the "scopes" feature.
 * This mean that your inside rules selectors will not be affected and will not
 * have any ".s-scope..." classes added
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example        css
 * @sugar.lod.prevent() {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const _noScopesStack = [];
export default function ({ params, sharedData, atRule, settings, postcssApi, }) {
    var _a;
    const finalParams = Object.assign({ scopes: [] }, (params !== null && params !== void 0 ? params : {}));
    // check if the lod feature is enabled or not
    if (!((_a = settings.lod) === null || _a === void 0 ? void 0 : _a.enabled)) {
        atRule.replaceWith(atRule.nodes);
        return;
    }
    atRule.nodes.forEach((node) => {
        if (!node.selector) {
            if (!atRule._parentRule) {
                atRule._parentRule = postcssApi.rule({
                    selector: '&',
                });
                atRule.append(atRule._parentRule);
            }
            // node._parentRule.nodes.push(node);
            atRule._parentRule.append(node);
            // atRule.nodes.splice(atRule.nodes.indexOf(node), 1);
        }
    });
    // check if the lod feature is enabled or not
    atRule.walkRules((rule) => {
        rule.selectors = rule.selectors.map((sel) => {
            if (sel.match(/\.s-lod--prevent/))
                return sel;
            return `.s-lod--prevent ${sel}`;
        });
    });
    atRule.replaceWith(atRule.nodes);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBR3JELE1BQU0sNENBQTZDLFNBQVEsWUFBWTtJQUNuRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSw0Q0FBNEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUlyRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxNQUFNLGNBQWMsR0FBYSxFQUFFLENBQUM7QUFDcEMsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sVUFBVSxFQUNWLE1BQU0sRUFDTixRQUFRLEVBQ1IsVUFBVSxHQU9iOztJQUNHLE1BQU0sV0FBVyxHQUFHLGdCQUNoQixNQUFNLEVBQUUsRUFBRSxJQUNQLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFFRiw2Q0FBNkM7SUFDN0MsSUFBSSxDQUFDLENBQUEsTUFBQSxRQUFRLENBQUMsR0FBRywwQ0FBRSxPQUFPLENBQUEsRUFBRTtRQUN4QixNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxPQUFPO0tBQ1Y7SUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFO2dCQUNyQixNQUFNLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7b0JBQ2pDLFFBQVEsRUFBRSxHQUFHO2lCQUNoQixDQUFDLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDckM7WUFDRCxxQ0FBcUM7WUFDckMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEMsc0RBQXNEO1NBQ3pEO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCw2Q0FBNkM7SUFDN0MsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN4QyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUM7Z0JBQUUsT0FBTyxHQUFHLENBQUM7WUFDOUMsT0FBTyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3JDLENBQUMifQ==