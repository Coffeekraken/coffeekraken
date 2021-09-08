import __component from './index';
import React from 'react';
// import ReactDOM from 'react-dom';

export default class MyComponent extends React.Component {
  render() {
    return <s-filtrable-input {...this.props}>
      {this.props.children}
    </s-filtrable-input>;
  }
  componentDidMount() {
    __component.mount();
  }
}

// ReactDOM.render(<MyComponent no-item-text="coco">
//   <input type="text" />
// </MyComponent>, document.querySelector('#react'));