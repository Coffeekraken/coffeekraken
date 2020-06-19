import __SWebcomponent from '../../../src/js/webcomponent/SWebComponent';
import SWebComponent from '../../../src/js/webcomponent/SWebComponent';
import './_component.scss';

class MyComponent extends __SWebcomponent {
  static get name() {
    return 'myComponent';
  }

  static get observedAttributes() {
    return ['param1', 'something'];
  }

  static get physicalProps() {
    return ['something'];
  }

  static get requiredProps() {
    return ['param1'];
  }

  static get defaultProps() {
    return {
      param1: 'Something setteg',
      something: 'Cool'
    };
  }

  constructor() {
    super({});
    console.log('Cool component', this);

    this.on('prop', (e) => {
      console.log(e);
    });

    setTimeout(() => {
      console.log('Setin');
      this.prop('something', 'Coco youhou');
    }, 2000);
  }
}

SWebComponent.define(MyComponent, {
  something: 'hello'
});

console.log(SWebComponent._componentsStack);
