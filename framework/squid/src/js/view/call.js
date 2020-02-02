import SAjax from '@coffeekraken/sugar/js/class/SAjax';
import __whenInViewport from '@coffeekraken/sugar/js/dom/whenInViewport';

export default async function squidViewToken(tokenObject, htmlId) {

  // grab the node HTMLElement using the specified id
  const $node = document.querySelector(`#${htmlId}`);

  console.log('LLL', $node);

  // load the view only when wanted
  switch (tokenObject.when) {
    case 'inViewport':
      await __whenInViewport($node);
    break;
  }

  // appending the class "view--loading"
  $node.classList.add('view--loading');

  // preparing the ajax request
  const ajx = new SAjax({
    url : `view/${tokenObject.view}/${tokenObject.id}`,
    method : 'GET',
    data: {}
  });

  // send the request
  ajx.send().then(async data => {

    // removing the class view--loading
    $node.classList.remove('view--loading');

    // // check if an "out" animation is defined
    // if (tokenObject.out && Squid.animation.exist('out', tokenObject.out)) {
    //
    //   // add the class view--in
    //   $node.classList.add('view--out');
    //
    //   // execute the in animation
    //   await Squid.animation.call('out', tokenObject.out, $node);
    //
    //   // removing the class view--in
    //   $node.classList.remove('view--out');
    //
    // }

    // insert the view inside the document
    $node.innerHTML = data;

    // // check if an "out" animation is defined
    // if (tokenObject.in && Squid.animation.exist('in', tokenObject.in)) {
    //
    //   // add the class view--in
    //   $node.classList.add('view--in');
    //
    //   // execute the in animation
    //   await Squid.animation.call('in', tokenObject.in, $node);
    //
    //   // removing the class view--in
    //   $node.classList.remove('view--in');
    //
    // }

  });

}
