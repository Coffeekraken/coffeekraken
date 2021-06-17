import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginRatioInterface extends __SInterface {
}
postcssSugarPluginRatioInterface.definition = {
    ratio: {
        type: 'Number',
        required: true,
        alias: 'd'
    }
};
export { postcssSugarPluginRatioInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ ratio: 1 }, params);
    const vars = [
        `
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        display: block;
        box-sizing: content-box;
        width: 100%;
        height: 0;
        padding: 0 0 calc(100% / ${finalParams.ratio});
    }
    & > *:not([class*="s-align--"]) {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
    }
    & > img:not([class*="s-align--"]),
    & > video:not([class*="s-align--"]) {
      object-fit: cover;
    }
  `
    ];
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyYXRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRCxNQUFNLGdDQUFpQyxTQUFRLFlBQVk7O0FBQ2xELDJDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7Q0FDRixDQUFDO0FBT0osT0FBTyxFQUFFLGdDQUFnQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXpELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBS1o7SUFDQyxNQUFNLFdBQVcsbUJBQ2YsS0FBSyxFQUFFLENBQUMsSUFDTCxNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhO1FBQ3JCOzs7Ozs7Ozs7O21DQVUrQixXQUFXLENBQUMsS0FBSzs7Ozs7Ozs7Ozs7R0FXakQ7S0FDQSxDQUFDO0lBRUYsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BCLENBQUMifQ==