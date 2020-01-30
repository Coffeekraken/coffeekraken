import __uniqid from '../../string/uniqid';
import __parseArgs from '../../string/parseArgs';

export default ($node) => {
    return new Promise((resolve, reject) => {


      // get all the items to animate
      const $items = $node.querySelectorAll(`[slide-in]`);

      let biggerDelay = 0, biggerDuration = 500;

      $items.forEach($item => {

        // generate a unique id for this node
        const uniqClass = `slide-in-${__uniqid()}`;
        $item.classList.add(uniqClass);

        // parse the slide-in value
        const slideInValue = $item.getAttribute('slide-in');
        const args =__parseArgs(slideInValue, {
          x: 'Number -x --x',
          y: 'Number -y --y',
          duration: 'Number -d --duration',
          delay: 'Number --delay'
        });

        if (args.delay > biggerDelay) biggerDelay = args.delay;
        if (args.duration > biggerDuration) biggerDuration = args.duration;

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
        $item.innerHTML += `
          <style>
            ${css}
          </style>
        `;

        // add the "in" class
        setTimeout(() => {
          $item.classList.add('in');
        }, args.delay || 0);


      });

      // wait the end of the animation
      setTimeout(() => {
        resolve();
      }, parseInt(biggerDelay) + parseInt(biggerDuration));

    });
}
