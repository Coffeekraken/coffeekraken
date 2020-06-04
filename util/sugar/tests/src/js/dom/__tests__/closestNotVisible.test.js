import __closestNotVisible from '../closestNotVisible';

describe('sugar.js.dom.closestNotVisible', () => {

  document.body.innerHTML = `
  <style>
    #testing {
      display: none;
    }
  </style>
      <div id="testing">
        <div class="coco testing">
          <div id="source"></div>
        </div>
      </div>
  `;
  const $elm = document.querySelector('#source');

  it('Should find the "testing" element that is up in the dom tree', () => {
    const $testing = __closestNotVisible($elm, '.testing');
    expect($testing.id).toBe('testing');
  });

});