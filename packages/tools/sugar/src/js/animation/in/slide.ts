// @ts-nocheck

import __uniqid from '../../string/uniqid';
import __parseArgs from '../../string/parseArgs';
import __querySelectorLive from '../../dom/querySelectorLive';

/**
 * @todo        documentation
 */

export = (() => {
  __querySelectorLive('[slide-in]', ($item) => {
    // generate a unique id for this node
    const uniqClass = `slide-in-${__uniqid()}`;
    $item.classList.add(uniqClass);

    // parse the slide-in value
    const slideInValue = $item.getAttribute('slide-in');
    const args = __parseArgs(slideInValue, {
      x: 'Number -x --x "0"',
      y: 'Number -y --y "0"',
      duration: 'Number -d --duration "500"',
      delay: 'Number --delay "0"',
      when: 'String -w --when "inViewport"'
    });

    // generate the animation css
    const css = `
      [slide-in].${uniqClass} {
        opacity: 0;
        transform: translate(${args.x.value || 0}px, ${args.y.value || 0}px);

      }
    `;
    const cssIn = `
      [slide-in].${uniqClass}.in {
        transition: all ${args.duration.value / 1000 || '0.5'}s;
        opacity: 1;
        transform: translate(0, 0);
      }
    `;

    // append the css into the section
    document.head.innerHTML += `
      <style id="${uniqClass}">
        ${css}
      </style>
    `;
    setTimeout(() => {
      document.head.innerHTML += `
        <style id="${uniqClass}-in">
          ${cssIn}
        </style>
      `;
    }, 100);

    // add the "in" class
    setTimeout(() => {
      $item.classList.add('in');
    }, args.delay.value);

    setTimeout(() => {
      const $style = document.querySelector(`style#${uniqClass}`);
      if ($style) $style.parentNode.removeChild($style);
      const $styleIn = document.querySelector(`style#${uniqClass}-in`);
      if ($styleIn) $styleIn.parentNode.removeChild($styleIn);
    }, args.delay.value + args.duration.value);
  });
})();
