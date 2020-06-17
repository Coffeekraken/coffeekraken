import __SWebcomponent from '../../../src/js/webcomponent/SWebComponent';
import SWebComponent from '../../../src/js/webcomponent/SWebComponent';

class MyComponent extends __SWebcomponent {
  static get observedAttributes() {
    return ['param1', 'something'];
  }

  constructor() {
    super({
      defaultProps: {
        param1: 'Something setteg',
        something: 'Cool'
      },
      requiredProps: ['param1'],
      physicalProps: ['something']
    });
    console.log('Cool component', this);

    setTimeout(() => {
      console.log('Setin');
      this.prop('something', 'Coco youhou');
    }, 2000);
  }
}

SWebComponent.define('my-component', MyComponent, {
  something: 'hello'
});

console.log(SWebComponent._componentsStack);
