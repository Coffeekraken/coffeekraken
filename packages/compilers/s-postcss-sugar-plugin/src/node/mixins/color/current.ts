// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginColorCurrentInterface extends __SInterface {
  static definition = {
    name: {
      type: 'String',
      required: true,
      alias: 'n'
    },
    modifier: {
      type: 'String',
      alias: 'm'
    },
    return: {
      type: 'String',
      values: ['var', 'value'],
      default: 'var'
    }
  };
}
export { postcssSugarPluginColorCurrentInterface as interface };

export interface IPostcssSugarPluginColorCurrentParams {
  name: string;
  modifier: string;
  return: 'var' | 'value';
}

export default function ({
  params,
  atRule,
  processNested
}: {
  params: Partial<IPostcssSugarPluginColorCurrentParams>;
  atRule: any;
  processNested: Function;
}) {
  const finalParams: IPostcssSugarPluginColorCurrentParams = {
    name: '',
    modifier: '',
    return: 'var',
    ...params
  };

  let colorName = finalParams.name;
  let modifierName = 'default';

  const nameParts = finalParams.name.split('.');
  if (nameParts.length === 2) {
    colorName = nameParts[0];
    modifierName = nameParts[1];
  }

  const vars: string[] = [
    `--s-theme-current-color: var(--s-theme-color-${colorName}-${modifierName});`,
    `--s-theme-current-color-h: var(--s-theme-color-${colorName}-${modifierName}-h);`,
    `--s-theme-current-color-s: var(--s-theme-color-${colorName}-${modifierName}-s);`,
    `--s-theme-current-color-l: var(--s-theme-color-${colorName}-${modifierName}-l);`,
    `--s-theme-current-color-r: var(--s-theme-color-${colorName}-${modifierName}-r);`,
    `--s-theme-current-color-g: var(--s-theme-color-${colorName}-${modifierName}-g);`,
    `--s-theme-current-color-b: var(--s-theme-color-${colorName}-${modifierName}-b);`,
    `--s-theme-current-color-a: var(--s-theme-color-${colorName}-${modifierName}-a);`
  ];

  if (atRule.parent.type === 'root') {
    vars.unshift(':root {');
    vars.push('}');
  }

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);

  // return vars.join('\n');
}
