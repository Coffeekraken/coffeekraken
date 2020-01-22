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
  ajx.send().then(data => {

    // // check if an "out" animation is defined
    if (tokenObject.animationOut && Squid.animationExist('out', tokenObject.animationOut)) {
      console.log('yoppppp');
    }


    console.log(data);
  });

}
