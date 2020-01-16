import SAjax from '@coffeekraken/sugar/js/class/SAjax';

export default function squidViewToken(tokenObject) {

  // preparing the ajax request
  const ajx = new SAjax({
    url : `view/${tokenObject.view}/${tokenObject.id}`,
    method : 'GET',
    data: {}
  });

  // send the request
  ajx.send().then(data => {
    console.log(data);
  });

}
