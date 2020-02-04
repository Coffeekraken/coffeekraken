import __uniqid from '../../string/uniqid';
import __parseArgs from '../../string/parseArgs';
import __querySelectorLive from '../../dom/querySelectorLive';

export default (() => {

  __querySelectorLive('[slide-in]', ($item) => {

    // generate a unique id for this node
    const uniqClass = `slide-in-${__uniqid()}`;
    $item.classList.add(uniqClass);

    // parse the slide-in value
    const slideInValue = $item.getAttribute('slide-in');
    const args =__parseArgs(slideInValue, {
      x: 'Number -x --x "0"',
      y: 'Number -y --y "0"',
      duration: 'Number -d --duration "500"',
      delay: 'Number --delay "0"',
      when: 'String -w --when "inViewport"'
    });

    console.log(args);

    // generate the animation css
    const css = `

      [slide-in].${uniqClass} {
        opacity: 0;
        transform: translate(${(args.x || 0)}px, ${(args.y || 0)}px);

      }
      [slide-in].${uniqClass}.in {
        transition: all ${(args.duration / 1000) || '0.5'}s;
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

    // add the "in" class
    setTimeout(() => {
      $item.classList.add('in');
    }, args.delay);

    setTimeout(() => {
      const $style = document.querySelector(`style#${uniqClass}`);
      if ($style) $style.parentNode.removeChild($style);
    }, args.delay + args.duration);

  });

})();
