const imgPath = '/dist/img/card-01.jpg';

export default {
  card: {
    image: {
      url: imgPath,
      alt: '',
      title: '',
    },
    attributes: {
      class: 'card card--large',
    },
    title: 'Supercharged!',
    intro: 'Up to 18 hours of battery life.',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec vestibulum mi. Etiam nec arcu ante.',
    cta: {
      label: 'Discover more...',
      color: 'accent',
      link: {
        url: 'https://apple.com',
        target: '_blank',
        title: 'Discover more on apple.com',
      },
    },
  },
  card1: {
    image: null,
    attributes: {
      class: 'card',
    },
    title: 'Supercharged!',
    intro: 'Up to 18 hours of battery life.',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    cta: {
      label: 'Discover more...',
      color: 'accent',
      link: {
        url: 'https://apple.com',
        target: '_blank',
        title: 'Discover more on apple.com',
      },
    },
  },
};
