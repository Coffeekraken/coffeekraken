export default {
  menus: {
    secondary: {},
    primary: {
      items: [
        {
          label: 'Get started',
          link: {
            url: 'https://google.com',
            target: '_self',
            title: 'Get started',
          },
        },
        {
          label: 'Documentation',
          link: {
            url: '/doc',
            target: '_self',
            title: 'Documentation',
          },
          children: [
            {
              label: 'Get started',
              link: {
                url: '/doc/get-started',
                target: '_self',
                title: 'Get started',
              },
            },
            {
              label: 'Configuration',
              link: {
                url: '/doc/configuration',
                target: '_self',
                title: 'Configuration',
              },
            },
            {
              label: 'Contribute',
              link: {
                url: '/doc/contribute',
                target: '_self',
                title: 'Contribute',
              },
            },
          ],
        },
        {
          label: 'Contact',
          link: {
            url: '/contact',
            target: '_self',
            title: 'Contact',
          },
        },
      ],
    },
    footer: {
      items: [
        {
          label: '<i class="s-icon:facebook"></i> Facebook',
          link: {
            url: 'https://google.com',
            target: '_blank',
            title: 'Facebook',
          },
        },
        {
          label: '<i class="s-icon:twitter"></i> Twitter',
          link: {
            url: '/',
            target: '_blank',
            title: 'Twitter',
          },
        },
        {
          label: '<i class="s-icon:instagram"></i> Instagram',
          link: {
            url: '/',
            target: '_blank',
            title: 'Instagram',
          },
        },
      ],
    },
  },
};
