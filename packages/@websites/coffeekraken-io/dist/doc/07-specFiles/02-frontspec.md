<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- body -->

<!--
/**
* @name            Frontspec
* @namespace       doc.specFiles
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / Spec files           /doc/specfiles/frontspec
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# `frontspec.json`

> Spec version **1.0.0-alpha.0**

The `frontspec.json` has to live in your project root. It has as goal to describe what your project has to offers (css, js, typos, etc...), and where to find them.

This file is separated by purpose in an global object like so:


-   **Metas**: Specify some metas data like the title, description, opengraph, etc...
    
-   **Assets**: Specify the assets to load like the css, js, etc...
    
-   **Media**: Specify the responsive specifications like the queries (breakpoints), default action, etc...
    
-   **Views**: Specify the views specifications like where to find them, etc...
    
-   **Specs**: Specify some specs related specifications like where to find them, etc...
    
-   **Google**: Specify some google specifications like the GTM/GA to use, etc...
    
-   **Margin**: Specify the margins available in the project.
    
-   **Padding**: Specify the paddings available in the project.
    
-   **Lod**: Specify the lod (level of details) settings
    
-   **Classmap**: Specify the classmap settings
    
-   **Font**: Specify the fonts specifications like the font-faces available, sizes, etc...
    
-   **Typo**: Specify some typo specifications like which are the available typo classes/tags, etc...
    
-   **Layout**: Specify some layout specifications like the available containers, layouts and grids.
    
```js
export default {
  metas: {},
  assets: {},
  media: {},
  views: {},
  specs: {},
  google: {},
  margin: {},
  padding: {},
  lod: {},
  classmap: {},
  font: {},
  typo: {},
  layout: {},
};

```


## Metas

Specify some metas data like the title, description, opengraph, etc...

```js
export default {
  lang: 'en',
  title: 'Coffeekraken',
  homepage: 'https://coffeekraken.io',
  description:
    'The frontend toolkit that works for everyone. Experts, professionals and new-comers',
  themeColor: '#ffbb00',
  author: {
    name: 'Olivier Bossel',
    email: 'olivier.bossel@gmail.com',
    url: 'https://coffeekraken.io',
  },
  og: {
    title: 'Coffeekraken',
    description:
      'The frontend toolkit that works for everyone. Experts, professionals and new-comers',
    type: 'website',
    url: 'https://coffeekraken.io',
    image: 'https://cdnv2.coffeekraken.io/coffeekraken-og.png',
  },
};

```


## Assets

Specify the assets to load like the css, js, etc...

```js
export default {
  viteClient: {
    src: '\n            <script>\n            document.addEventListener("DOMContentLoaded", function() {\n                var $script = document.createElement("script");\n                var ip = "192.168.1.104";\n                $script.setAttribute("type", "module");\n                $script.setAttribute("src", "http://0.0.0.0:3000/@vite/client");\n                document.body.appendChild($script);\n            });\n            </script>\n        ',
  },
  dev: {
    type: 'module',
    defer: true,
    src: '/src/js/index.ts',
    env: 'development',
  },
  style: { id: 'global', defer: true, src: '/dist/css/index.css' },
};

```


## Media

Specify the responsive specifications like the queries (breakpoints), default action, etc...

```js
export default {
  defaultAction: '<=',
  defaultMedia: 'desktop',
  defaultQuery: 'screen',
  queries: {
    dwarf: { minHeight: 0, maxHeight: 950 },
    wide: { minWidth: 2048, maxWidth: null },
    desktop: { minWidth: 1280, maxWidth: 2047 },
    tablet: { minWidth: 640, maxWidth: 1279 },
    mobile: { minWidth: 0, maxWidth: 639 },
  },
};

```


## Views

Specify the views specifications like where to find them, etc...

```js
export default {
  layouts: {
    main: {
      name: 'Default (main)',
      viewPath: { twig: 'layouts/main.twig', blade: null },
    },
  },
  rootDirs: {
    twig: ['./src/views', './node_modules/@coffeekraken/sugar/src/views/twig'],
    blade: [
      './src/views',
      './node_modules/@coffeekraken/sugar/src/views/blade',
    ],
  },
};

```


## Specs

Specify some specs related specifications like where to find them, etc...

```js
export default {
  namespaces: {
    views: ['./src/views'],
    'views.bare': ['./src/views/bare'],
    'views.sections': ['./src/views/sections'],
    'views.components': ['./src/views/components'],
    'sugar.views': ['./node_modules/@coffeekraken/sugar/src/views/_specs'],
    'sugar.views.bare': [
      './node_modules/@coffeekraken/sugar/src/views/_specs/bare',
    ],
    'sugar.views.sections': [
      './node_modules/@coffeekraken/sugar/src/views/_specs/sections',
    ],
    'sugar.views.components': [
      './node_modules/@coffeekraken/sugar/src/views/_specs/components',
    ],
  },
  cwd: '/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@websites/coffeekraken-io',
};

```


## Google

Specify some google specifications like the GTM/GA to use, etc...

```js
export default {
  gtm: null,
  ga: 'UA-91271113-1',
  map: { apiKey: 'AIzaSyDzFfEzhmYXRTlONUCtMWQ88uHJhsbtXY4' },
};

```


## Margin

Specify the margins available in the project.

```js
export default {
  0: 0,
  10: 0.375,
  20: 0.75,
  30: 1.5,
  40: 2.25,
  50: 3.25,
  60: 4.25,
  70: 5.5,
  80: 7,
  90: 9,
  100: 11,
  default: '1rem',
};

```


## Padding

Specify the paddings available in the project.

```js
export default {
  0: 0,
  10: 0.375,
  20: 0.75,
  30: 1.5,
  40: 2.25,
  50: 3.25,
  60: 4.25,
  70: 5.5,
  80: 7,
  90: 9,
  100: 11,
  default: '1rem',
};

```


## Lod

Specify the lod (level of details) settings

```js
export default {
  enabled: true,
  defaultLevel: 3,
  botLevel: 1,
  levels: [
    { name: 'bare', speedIndex: 0 },
    { name: 'low', speedIndex: 30 },
    { name: 'medium', speedIndex: 40 },
    { name: 'high', speedIndex: 50 },
    { name: 'extrem', speedIndex: 60 },
  ],
  method: 'file',
  defaultAction: '>=',
};

```


## Classmap

Specify the classmap settings

```js
export default {
  enabled: true,
  url: '/classmap.json',
  path: './classmap.json',
};

```


## Font

Specify the fonts specifications like the font-faces available, sizes, etc...

```js
export default {
  family: {
    default: {
      fontFamily: '"Titillium Web"',
      fontWeight: 400,
      import:
        'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400&display=swap',
    },
    title: {
      fontFamily: '"Titillium Web"',
      fontWeight: 600,
      import:
        'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@600&display=swap',
    },
    quote: {
      fontFamily: '"Palatino, Times, Georgia, serif"',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontDisplay: 'auto',
      capHeight: 0.65,
    },
    code: {
      fontFamily: 'Menlo, Monaco, Consolas, Courier New, monospace',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontDisplay: 'auto',
      capHeight: 0.65,
    },
  },
  size: {
    0: 0,
    5: '0.5',
    10: 0.65,
    20: 0.75,
    30: 1.1,
    40: 1.25,
    50: 1.5,
    60: 2,
    70: 2.5,
    80: 3,
    90: 4,
    100: 5,
    default: '16px',
  },
};

```


## Typo

Specify some typo specifications like which are the available typo classes/tags, etc...

```js
export default {
  h1: {
    label: 'H1',
    group: 'style',
    style: {
      display: 'block',
      fontFamily: '"Titillium Web"',
      fontSize: '64px',
      lineHeight: 1.3,
      maxWidth: '55ch',
      marginBottom: '3.25rem',
    },
  },
  h2: {
    label: 'H2',
    group: 'style',
    style: {
      display: 'block',
      fontFamily: '"Titillium Web"',
      fontSize: '48px',
      lineHeight: 1.3,
      maxWidth: '55ch',
      marginBottom: '3.25rem',
    },
  },
  h3: {
    label: 'H3',
    group: 'style',
    style: {
      display: 'block',
      fontFamily: '"Titillium Web"',
      fontSize: '40px',
      lineHeight: 1.3,
      maxWidth: '55ch',
      marginBottom: '3.25rem',
    },
  },
  h4: {
    label: 'H4',
    group: 'style',
    style: {
      display: 'block',
      fontFamily: '"Titillium Web"',
      fontSize: '32px',
      lineHeight: 1.3,
      maxWidth: '55ch',
      marginBottom: '3.25rem',
    },
  },
  h5: {
    label: 'H5',
    group: 'style',
    style: {
      display: 'block',
      fontFamily: '"Titillium Web"',
      fontSize: '24px',
      lineHeight: 1.3,
      maxWidth: '55ch',
      marginBottom: '2.25rem',
    },
  },
  h6: {
    label: 'H6',
    group: 'style',
    style: {
      display: 'block',
      fontFamily: '"Titillium Web"',
      fontSize: '20px',
      lineHeight: 1.3,
      maxWidth: '55ch',
    },
  },
  p: {
    label: 'Paragraph',
    group: 'style',
    style: {
      display: 'block',
      fontFamily: '"Titillium Web"',
      fontSize: '17.6px',
      lineHeight: 1.8,
      maxWidth: '55ch',
      marginBottom: '3.25rem',
    },
    default: true,
  },
  lead: {
    label: 'Lead paragraph',
    group: 'style',
    style: {
      display: 'block',
      fontFamily: '"Titillium Web"',
      fontSize: '24px',
      lineHeight: 1.6,
      maxWidth: '55ch',
      marginBottom: '3.25rem',
    },
  },
  hr: {
    label: '------',
    group: 'block',
    style: {
      display: 'block',
      color: 'hsla(212,14,50,1)',
      opacity: 0.2,
      marginBottom: '3.25rem',
    },
  },
  pre: {
    label: 'Pre',
    group: 'text',
    style: {
      display: 'block',
      fontFamily: 'Menlo, Monaco, Consolas, Courier New, monospace',
      color: '#596573',
      backgroundColor: '#fcfcfd',
      lineHeight: 1.5,
      paddingInline: '1.5rem',
      paddingBlock: '0.75rem',
      borderRadius: '5px',
      depth: '0',
      marginBottom: '3.25rem',
    },
  },
  code: {
    label: '</>',
    group: 'text',
    style: {
      display: 'inline-block',
      fontFamily: 'Menlo, Monaco, Consolas, Courier New, monospace',
      color: '#596573',
      lineHeight: 1.1,
      backgroundColor: '#fffefa',
      borderRadius: '4px',
      paddingInline: '0.375rem',
      paddingBlock: '0rem',
    },
  },
  blockquote: {
    label: 'Blockquote',
    group: 'block',
    style: {
      display: 'block',
      fontFamily: '"Palatino, Times, Georgia, serif"',
      marginBottom: '3.25rem',
    },
    editorStyle: { paddingInlineStart: '1.5rem', borderLeft: '1px solid #000' },
  },
  a: {
    label: 'Link',
    group: 'text',
    style: { color: '#ffbb00', textDecoration: 'underline' },
  },
  quote: {
    label: 'Quote',
    group: 'text',
    style: {
      fontFamily: '"Palatino, Times, Georgia, serif"',
      marginBottom: '3.25rem',
    },
  },
  bold: {
    label: 'B',
    group: 'text',
    style: { fontWeight: 'bold' },
    buttonStyle: { fontWeight: 'bolder' },
  },
  italic: {
    label: 'I',
    group: 'text',
    style: { fontStyle: 'italic' },
    buttonStyle: { fontStyle: 'italic' },
  },
  large: {
    label: 'Large',
    group: 'text',
    style: { fontSize: '1.1em' },
    buttonStyle: { fontSize: '1.01em' },
  },
  larger: {
    label: 'Larger',
    group: 'text',
    style: { fontSize: '1.2em' },
    buttonStyle: { fontSize: '1.02em' },
  },
  largest: {
    label: 'Largest',
    group: 'text',
    style: { fontSize: '1.3em' },
    buttonStyle: { fontSize: '1.03em' },
  },
  small: {
    label: 'Small',
    group: 'text',
    style: { fontSize: '0.9em' },
    buttonStyle: { fontSize: '0.99em' },
  },
  smaller: {
    label: 'Smaller',
    group: 'text',
    style: { fontSize: '0.8em' },
    buttonStyle: { fontSize: '0.98em' },
  },
  smallest: {
    label: 'Smallest',
    group: 'text',
    style: { fontSize: '0.7em' },
    buttonStyle: { fontSize: '0.97em' },
  },
  mark: { label: 'Mark', group: 'text', style: { backgroundColor: '#ffbb00' } },
  del: {
    label: 'Del',
    group: 'text',
    style: { textDecoration: 'line-through' },
    buttonStyle: { textDecoration: 'line-through' },
  },
  ins: {
    label: 'U',
    group: 'text',
    style: { textDecoration: 'underline' },
    buttonStyle: { textDecoration: 'underline' },
  },
  sub: {
    label: 'Sub',
    group: 'text',
    style: { verticalAlign: 'sub', fontSize: '0.6em' },
    buttonStyle: { verticalAlign: 'sub', fontSize: '0.6em' },
  },
  sup: {
    label: 'Sup',
    group: 'text',
    style: { verticalAlign: 'sup', fontSize: '0.6em' },
    buttonStyle: { verticalAlign: 'sup', fontSize: '0.6em' },
  },
  base: {
    label: 'Base',
    group: 'color',
    type: 'color',
    style: { color: 'hsla(212,14,50,1)' },
  },
  baseGradient: {
    label: 'Base gradient',
    group: 'color',
    type: 'color',
    style: {
      backgroundSize: '100%',
      '-webkitBackgroundClip': 'text',
      '-mozBackgroundClip': 'text',
      '-webkitTextFillColor': 'transparent',
      '-mozTextFillColor': 'transparent',
      backgroundImage:
        'linear-gradient(90deg, hsla(212,14,50,1) 0%, #a9b2bc 100%)',
    },
  },
  main: {
    label: 'Main',
    group: 'color',
    type: 'color',
    style: { color: 'hsla(212,14,50,1)' },
  },
  mainGradient: {
    label: 'Main gradient',
    group: 'color',
    type: 'color',
    style: {
      backgroundSize: '100%',
      '-webkitBackgroundClip': 'text',
      '-mozBackgroundClip': 'text',
      '-webkitTextFillColor': 'transparent',
      '-mozTextFillColor': 'transparent',
      backgroundImage:
        'linear-gradient(90deg, hsla(212,14,50,1) 0%, #a9b2bc 100%)',
    },
  },
  accent: {
    label: 'Accent',
    group: 'color',
    type: 'color',
    style: { color: '#ffbb00' },
  },
  accentGradient: {
    label: 'Accent gradient',
    group: 'color',
    type: 'color',
    style: {
      backgroundSize: '100%',
      '-webkitBackgroundClip': 'text',
      '-mozBackgroundClip': 'text',
      '-webkitTextFillColor': 'transparent',
      '-mozTextFillColor': 'transparent',
      backgroundImage: 'linear-gradient(90deg, #ffbb00 0%, #ffd666 100%)',
    },
  },
  complementary: {
    label: 'Complementary',
    group: 'color',
    type: 'color',
    style: { color: '#5100ff' },
  },
  complementaryGradient: {
    label: 'Complementary gradient',
    group: 'color',
    type: 'color',
    style: {
      backgroundSize: '100%',
      '-webkitBackgroundClip': 'text',
      '-mozBackgroundClip': 'text',
      '-webkitTextFillColor': 'transparent',
      '-mozTextFillColor': 'transparent',
      backgroundImage: 'linear-gradient(90deg, #5100ff 0%, #9666ff 100%)',
    },
  },
  success: {
    label: 'Success',
    group: 'color',
    type: 'color',
    style: { color: '#91ff00' },
  },
  successGradient: {
    label: 'Success gradient',
    group: 'color',
    type: 'color',
    style: {
      backgroundSize: '100%',
      '-webkitBackgroundClip': 'text',
      '-mozBackgroundClip': 'text',
      '-webkitTextFillColor': 'transparent',
      '-mozTextFillColor': 'transparent',
      backgroundImage: 'linear-gradient(90deg, #91ff00 0%, #bdff66 100%)',
    },
  },
  warning: {
    label: 'Warning',
    group: 'color',
    type: 'color',
    style: { color: '#ffd500' },
  },
  warningGradient: {
    label: 'Warning gradient',
    group: 'color',
    type: 'color',
    style: {
      backgroundSize: '100%',
      '-webkitBackgroundClip': 'text',
      '-mozBackgroundClip': 'text',
      '-webkitTextFillColor': 'transparent',
      '-mozTextFillColor': 'transparent',
      backgroundImage: 'linear-gradient(90deg, #ffd500 0%, #ffe666 100%)',
    },
  },
  error: {
    label: 'Error',
    group: 'color',
    type: 'color',
    style: { color: '#ff003c' },
  },
  errorGradient: {
    label: 'Error gradient',
    group: 'color',
    type: 'color',
    style: {
      backgroundSize: '100%',
      '-webkitBackgroundClip': 'text',
      '-mozBackgroundClip': 'text',
      '-webkitTextFillColor': 'transparent',
      '-mozTextFillColor': 'transparent',
      backgroundImage: 'linear-gradient(90deg, #ff003b 0%, #ff668a 100%)',
    },
  },
  info: {
    label: 'Info',
    group: 'color',
    type: 'color',
    style: { color: '#00ffff' },
  },
  infoGradient: {
    label: 'Info gradient',
    group: 'color',
    type: 'color',
    style: {
      backgroundSize: '100%',
      '-webkitBackgroundClip': 'text',
      '-mozBackgroundClip': 'text',
      '-webkitTextFillColor': 'transparent',
      '-mozTextFillColor': 'transparent',
      backgroundImage: 'linear-gradient(90deg, #00ffff 0%, #66ffff 100%)',
    },
  },
};

```


## Layout

Specify some layout specifications like the available containers, layouts and grids.

```js
export default {
  offset: { top: 100, right: 0, bottom: 0, left: 0 },
  container: { default: '1280px', wide: '1440px', full: 'none' },
  grid: {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    11: 11,
    12: 12,
  },
  layout: {
    1: '1',
    12: '1 2',
    21: '2 1',
    112: '1 1 2',
    122: '1 2 2',
    123: '1 2 3',
    211: '2 1 1',
    221: '2 2 1',
    321: '3 2 1',
    1112: '1 1 1 2',
    1222: '1 2 2 2',
    1234: '1 2 3 4',
    2221: '2 2 2 1',
    11112: '1 1 1 1 2',
    12222: '1 2 2 2 2',
    12345: '1 2 3 4 5',
    22221: '2 2 2 2 1',
    111112: '1 1 1 1 1 2',
    122222: '1 2 2 2 2 2',
    123456: '1 2 3 4 5 6',
    '1_2': '1 _ 2',
    '2_1': '2 _ 1',
    '12_33': '1 2 _ 3 3',
    '1_23': '1 _ 2 3',
    '1_2_3': '1 _ 2 _ 3',
    '32_1': '3 2 _ 1',
    '3_21': '3 _ 2 1',
    '12_34': '1 2 _ 3 4',
    '123_4': '1 2 3 _ 4',
    '1_234': '1 _ 2 3 4',
    '1_2_3_4': '1 _ 2 _ 3 _ 4',
    '123_45': '1 2 3 _ 4 5',
    '12_345': '1 2 _ 3 4 5',
    '1_2345': '1 _ 2 3 4 5',
    '1234_5': '1 2 3 4 _ 5',
    '1_2_3_4_5': '1 _ 2 _ 3 _ 4 _ 5',
  },
};

```


