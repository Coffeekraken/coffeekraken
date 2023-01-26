export default {
    slider: {
        attributes: {
            class: 'section-slider',
        },
        slides: [
            '<img src="/dist/img/slider/slide-01.jpg" />',
            '<img src="/dist/img/slider/slide-02.jpg" />',
            '<img src="/dist/img/slider/slide-03.jpg" />',
        ],
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
    },
};
