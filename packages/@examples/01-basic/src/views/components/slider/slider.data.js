export default {
    attributes: {
        class: 'section-slider',
    },
    content: `
    <div s-slider-slide>
      <img src="/dist/img/slider/slide-01.jpg" />
    </div>
    <div s-slider-slide>
      <img src="/dist/img/slider/slide-02.jpg" />
    </div>
    <div s-slider-slide>
      <img src="/dist/img/slider/slide-03.jpg" />
    </div>
  `,
    lnf: 'default',
    // ratio: '1',
    controls: true,
    pad: true,
    nav: true,
    // progress: true,
    swipe: true,
    mousewheel: true,
    clickOnSlide: false,
    loop: true,
    direction: 'horizontal',
    container: true,
    uiContainer: false,
    behavior: 'scroll',
};
