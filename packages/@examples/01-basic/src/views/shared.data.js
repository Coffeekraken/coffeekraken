export default {
  menus: {
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
          label: 'About us',
          children: [
            {
              label: null,
              get raw() {
                return `
                  <div class="menu-about">
                      <h2 class="s-typo:h4 s-mbe:30">Buzz Brothers</h2>
                      <p class="s-typo:p">
                          We believe in the power of interaction. We know that creating<br />
                          one outstanding brand experience takes many perfect interactions.<br />
                          We manage them all. We connect the dots. And make every consumer<br />
                          interaction stand out.
                      </p>
                      <a class="s-btn s-color:accent s-mbs:30" href="https://buzzbrothers.ch" target="_blank">More about us</a>
                  </div>
            `;
              },
              link: null,
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
          label: 'Quick links',
          link: {
            url: 'https://google.com',
            target: '_self',
            title: 'Get started',
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
              label: 'Something nice',
              link: {
                url: '/doc/get-started',
                target: '_self',
                title: 'Get started',
              },
            },
          ],
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
      ],
    },
  },
};
