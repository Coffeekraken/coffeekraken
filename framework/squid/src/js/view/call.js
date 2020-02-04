import SAjax from '@coffeekraken/sugar/js/class/SAjax';
import __when from '@coffeekraken/sugar/js/dom/when';
import __toDomNodes from '@coffeekraken/sugar/js/dom/toDomNodes';

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function squidViewToken(tokenObject) {

  // grab the node HTMLElement using the specified id
  const $node = document.querySelector(`#${tokenObject.id}`);
  const $loader = $node.querySelector('.view__loader');
  const $content = $node.querySelector('.view__content');

  // load the view only when wanted
  if (tokenObject.when) await __when($node, tokenObject.when);

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

    // insert the view inside the document
    const $newContent = __toDomNodes(data);
    $content.appendChild($newContent);

    // tell the view is loaded
    setTimeout(() => {
      // removing the class view--loading
      $node.classList.remove('view--loading');
      $node.classList.add('view--loaded');
    }, 100);

  });

}
