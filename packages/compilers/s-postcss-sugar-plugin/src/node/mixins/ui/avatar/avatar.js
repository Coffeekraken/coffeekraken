import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiAvatarInterface extends __SInterface {
}
postcssSugarPluginUiAvatarInterface.definition = {
    shape: {
        type: 'String',
        values: ['default', 'square']
    }
};
export { postcssSugarPluginUiAvatarInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    // @todo          find a way to use sugar.space for paddings
    vars.push(`
    @sugar.scope.bare {
        position: relative;
        display: inline-block;
        overflow: hidden;
        width: 1em;
        height: 1em;

        img {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            min-width: 100%;
            min-height: 100%;
            max-width: 100%;
        }
    }
    @sugar.scope.lnf {
        ${finalParams.shape ?
        finalParams.shape === 'default' ? `
                border-radius: 99999999px;
            ` : finalParams.shape === 'square' ? `
                border-radius: 0;
            ` : ''
        : ''}
    }
  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXZhdGFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBS3JELE1BQU0sbUNBQW9DLFNBQVEsWUFBWTs7QUFDckQsOENBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUM7S0FDOUI7Q0FDRixDQUFDO0FBT0osT0FBTyxFQUFFLG1DQUFtQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBQzVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBS1o7SUFDQyxNQUFNLFdBQVcscUJBQ1osTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsNERBQTREO0lBQzVELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQWtCRixXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakIsV0FBVyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDOzthQUVqQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7O2FBRXBDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDVixDQUFDLENBQUMsRUFBRTs7R0FFVCxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9