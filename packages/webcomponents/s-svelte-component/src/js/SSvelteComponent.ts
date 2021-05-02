import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

export interface ISSvelteComponentCtorSettings {
  svelteComponent?: Partial<ISSvelteComponentSettings>;
}
export interface ISSvelteComponentSettings {}

export interface ISSvelteComponent {}

class SSVelteComponent extends __SClass implements ISSvelteComponent {
  constructor(params: any, settings?: Partial<ISSvelteComponentCtorSettings>) {
    super(
      __deepMerge(
        {
          svelteComponent: {}
        },
        settings || {}
      )
    );
    // @ts-ignore
    if (this.constructor.interface) {
      // @ts-ignore
      const paramsInterfaceResult = this.constructor.interface.apply(
        params ?? {}
      );
      if (paramsInterfaceResult.hasIssues()) {
        throw new Error(paramsInterfaceResult.toString());
      } else {
        // this.props = paramsInterfaceResult.value;
      }
    }
  }
}

export default SSVelteComponent;
