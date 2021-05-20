// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginColorSchemaInterface extends __SInterface {
  static definition = {
    primary: {
      type: 'String',
      required: true,
      alias: 'p'
    },
    secondary: {
      type: 'String',
      alias: 's'
    }
  };
}
export { postcssSugarPluginColorSchemaInterface as interface };

export interface IPostcssSugarPluginColorSchemaParams {
  primary: string;
  secondary: string;
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
    primary: '',
    secondary: '',
    ...params
  };

  const vars: string[] = [
    `--s-theme-color-schema-primary: var(--s-theme-color-${finalParams.primary}-default);`,
    `--s-theme-color-schema-primary-h: var(--s-theme-color-${finalParams.primary}-default-h);`,
    `--s-theme-color-schema-primary-s: var(--s-theme-color-${finalParams.primary}-default-s);`,
    `--s-theme-color-schema-primary-l: var(--s-theme-color-${finalParams.primary}-default-l);`
    // `--s-theme-color-schema-primary-r: var(--s-theme-color-${finalParams.primary}-default-r);`,
    // `--s-theme-color-schema-primary-g: var(--s-theme-color-${finalParams.primary}-default-g);`,
    // `--s-theme-color-schema-primary-b: var(--s-theme-color-${finalParams.primary}-default-b);`,
    // `--s-theme-color-schema-primary-a: var(--s-theme-color-${finalParams.primary}-default-a);`
  ];

  // if (finalParams.secondary) {
  //   const vars: string[] = [
  //     `--s-theme-color-schema-secondary: var(--s-theme-color-${finalParams.secondary}-default);`,
  //     `--s-theme-color-schema-secondary-h: var(--s-theme-color-${finalParams.secondary}-default-h);`,
  //     `--s-theme-color-schema-secondary-s: var(--s-theme-color-${finalParams.secondary}-default-s);`,
  //     `--s-theme-color-schema-secondary-l: var(--s-theme-color-${finalParams.secondary}-default-l);`,
  //     `--s-theme-color-schema-secondary-r: var(--s-theme-color-${finalParams.secondary}-default-r);`,
  //     `--s-theme-color-schema-secondary-g: var(--s-theme-color-${finalParams.secondary}-default-g);`,
  //     `--s-theme-color-schema-secondary-b: var(--s-theme-color-${finalParams.secondary}-default-b);`,
  //     `--s-theme-color-schema-secondary-a: var(--s-theme-color-${finalParams.secondary}-default-a);`
  //   ];
  // }

  if (atRule.parent.type === 'root') {
    vars.unshift(':root {');
    vars.push('}');
  }

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
