import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginUiNavbarInterface extends __SInterface {
    static get definition() {
        return {};
    }
}

export interface IPostcssSugarPluginUiNavbarParams {}

export { postcssSugarPluginUiNavbarInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiNavbarParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiNavbarParams = {
        ...params,
    };

    const vars: string[] = [];

    // bare
    vars.push(`
      display: flex;
      align-items: center;

      & > * {
          flex-grow: 0;
      }
    `);

    return vars;
}
