import SAjax from '@coffeekraken/sugar/js/class/SAjax';
import __ensureExist from '@coffeekraken/sugar/js/object/ensureExist';

export default function squidViewToken(tokenObject, htmlId) {

  // preparing the ajax request
  const ajx = new SAjax({
    url : `view/${tokenObject.view}/${tokenObject.id}`,
    method : 'GET',
    data: {}
  });

  // send the request
  ajx.send().then(async data => {

    // // check if an "out" animation is defined
    if (tokenObject.animationOut && Squid.animation.exist('out', tokenObject.animationOut)) {

    }

    // insert the view inside the document
    document.querySelector(`#${htmlId}`).innerHTML = data;

    // // check if an "out" animation is defined
    if (tokenObject.animationIn && Squid.animation.exist('in', tokenObject.animationIn)) {
      console.log('yoppppp');
      Squid.animation.call('in', tokenObject.animationIn, document.querySelector('#' + tokenObject.id)).then(() => {
        console.log('animation finished!!!');
      });
    }

  });

}
