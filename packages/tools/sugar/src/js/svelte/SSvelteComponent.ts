import __SClass from '../class/SClass';
import __deepMerge from '../object/deepMerge';

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
    console.log('Hello');
  }
}

export default SSVelteComponent;
