// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __themeColorObjToVars from '../../utils/themeColorObjToVars';
class postcssSugarPluginColorSchemaInterface extends __SInterface {
}
postcssSugarPluginColorSchemaInterface.definition = {
    base: {
        type: 'String',
        required: true,
        alias: 'b'
    },
    accent: {
        type: 'String',
        alias: 'a'
    },
    complementary: {
        type: 'String',
        alias: 'c'
    }
};
export { postcssSugarPluginColorSchemaInterface as interface };
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({ base: '', accent: '', complementary: '' }, params);
    let vars = [];
    let baseVars = [];
    if (finalParams.base) {
        baseVars = __themeColorObjToVars(finalParams.base).map((v) => {
            return v.replace(`-color-${finalParams.base}-`, '-colorSchema-base-');
        });
    }
    let accentVars = [];
    if (finalParams.accent) {
        accentVars = __themeColorObjToVars(finalParams.accent).map((v) => {
            return v.replace(`-color-${finalParams.accent}-`, '-colorSchema-accent-');
        });
    }
    let complementaryVars = [];
    if (finalParams.complementary) {
        complementaryVars = __themeColorObjToVars(finalParams.complementary).map((v) => {
            return v.replace(`-color-${finalParams.complementary}-`, '-colorSchema-complementary-');
        });
    }
    vars = [...vars, ...baseVars, ...accentVars, ...complementaryVars];
    if (atRule.parent.type === 'root') {
        vars.unshift(':root {');
        vars.push('}');
    }
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxPQUFPLHFCQUFxQixNQUFNLGlDQUFpQyxDQUFDO0FBRXBFLE1BQU0sc0NBQXVDLFNBQVEsWUFBWTs7QUFDeEQsaURBQVUsR0FBRztJQUNsQixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELGFBQWEsRUFBRTtRQUNiLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtDQUNGLENBQUM7QUFFSixPQUFPLEVBQUUsc0NBQXNDLElBQUksU0FBUyxFQUFFLENBQUM7QUFRL0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFLZDtJQUNDLE1BQU0sV0FBVyxtQkFDZixJQUFJLEVBQUUsRUFBRSxFQUNSLE1BQU0sRUFBRSxFQUFFLEVBQ1YsYUFBYSxFQUFFLEVBQUUsSUFDZCxNQUFNLENBQ1YsQ0FBQztJQUVGLElBQUksSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUV4QixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDbEIsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFO1FBQ3BCLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDM0QsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsV0FBVyxDQUFDLElBQUksR0FBRyxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDeEUsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUVELElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUNwQixJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUU7UUFDdEIsVUFBVSxHQUFHLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUMvRCxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxXQUFXLENBQUMsTUFBTSxHQUFHLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUM1RSxDQUFDLENBQUMsQ0FBQztLQUNKO0lBRUQsSUFBSSxpQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxXQUFXLENBQUMsYUFBYSxFQUFFO1FBQzdCLGlCQUFpQixHQUFHLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQ3RFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDSixPQUFPLENBQUMsQ0FBQyxPQUFPLENBQ2QsVUFBVSxXQUFXLENBQUMsYUFBYSxHQUFHLEVBQ3RDLDZCQUE2QixDQUM5QixDQUFDO1FBQ0osQ0FBQyxDQUNGLENBQUM7S0FDSDtJQUVELElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLEdBQUcsUUFBUSxFQUFFLEdBQUcsVUFBVSxFQUFFLEdBQUcsaUJBQWlCLENBQUMsQ0FBQztJQUVuRSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDaEI7SUFFRCxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQyJ9