import __SClass from '@coffeekraken/s-class';
import __deepMerge from '../../shared/object/deepMerge';

export interface ISSvelteComponentCtorSettings {
  svelteComponent?: Partial<ISSvelteComponentSettings>;
}
export interface ISSvelteComponentSettings {}

export interface ISSvelteComponent {}

class SSVelteComponent extends __SClass implements ISSvelteComponent {
  constructor(settings?: Partial<ISSvelteComponentCtorSettings>) {
    super(
      __deepMerge(
        {
          svelteComponent: {}
        },
        settings || {}
      )
    );
  }
}

export default SSVelteComponent;
