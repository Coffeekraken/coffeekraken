// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __themeColorObjToVars from '../../utils/themeColorObjToVars';

class postcssSugarPluginColorSchemaInterface extends __SInterface {
  static definition = {
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
}
export { postcssSugarPluginColorSchemaInterface as interface };

export interface IPostcssSugarPluginColorSchemaParams {
  base: string;
  accent: string;
  complementary: string;
}

export default function ({
  params,
  atRule,
  processNested
}: {
  params: Partial<IPostcssSugarPluginColorSchemaParams>;
  atRule: any;
  processNested: Function;
}) {
  const finalParams: IPostcssSugarPluginColorSchemaParams = {
    base: '',
    accent: '',
    complementary: '',
    ...params
  };

  let vars: string[] = [];

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
    complementaryVars = __themeColorObjToVars(finalParams.complementary).map(
      (v) => {
        return v.replace(
          `-color-${finalParams.complementary}-`,
          '-colorSchema-complementary-'
        );
      }
    );
  }

  vars = [...vars, ...baseVars, ...accentVars, ...complementaryVars];

  if (atRule.parent.type === 'root') {
    vars.unshift(':root {');
    vars.push('}');
  }

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
