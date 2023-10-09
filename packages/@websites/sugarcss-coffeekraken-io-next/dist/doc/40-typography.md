<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- body -->

<!--
/**
* @name            09. Typography
* @namespace       doc
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation           /doc/typography
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# Typography

We call typography all the "inline" elements like `h1`, `h2`, `p`, `a`, `bold`, etc...

These elements are defined in your theme in the `themeTypo.config.ts` file.
Here's the default available:

```js
export default {
  h1: {
    label: 'H1',
    group: 'style',
    style: {
      display: 'block',
      fontFamily: 'title',
      fontSize: 80,
      lineHeight: 1.3,
      maxWidth: '55ch',
      mobile: { fontSize: 70 },
    },
    rhythmVertical: { marginBottom: 50 },
  },
  h2: {
    label: 'H2',
    group: 'style',
    style: {
      display: 'block',
      fontFamily: 'title',
      fontSize: 70,
      lineHeight: 1.3,
      maxWidth: '55ch',
      mobile: { fontSize: 60 },
    },
    rhythmVertical: { marginBottom: 50 },
  },
  h3: {
    label: 'H3',
    group: 'style',
    style: {
      display: 'block',
      fontFamily: 'title',
      fontSize: 60,
      lineHeight: 1.3,
      maxWidth: '55ch',
      mobile: { fontSize: 50 },
    },
    rhythmVertical: { marginBottom: 50 },
  },
  h4: {
    label: 'H4',
    group: 'style',
    style: {
      display: 'block',
      fontFamily: 'title',
      fontSize: 50,
      lineHeight: 1.3,
      maxWidth: '55ch',
      mobile: { fontSize: 40 },
    },
    rhythmVertical: { marginBottom: 50 },
  },
  h5: {
    label: 'H5',
    group: 'style',
    style: {
      display: 'block',
      fontFamily: 'title',
      fontSize: 40,
      lineHeight: 1.3,
      maxWidth: '55ch',
      mobile: { fontSize: 30 },
    },
    rhythmVertical: { marginBottom: 40 },
  },
  h6: {
    label: 'H6',
    group: 'style',
    style: {
      display: 'block',
      fontFamily: 'title',
      fontSize: 30,
      lineHeight: 1.3,
      maxWidth: '55ch',
      mobile: { fontSize: 30 },
    },
    hythmVertical: { marginBottom: 40 },
  },
  p: {
    label: 'Paragraph',
    group: 'style',
    default: true,
    style: {
      display: 'block',
      fontFamily: 'default',
      fontSize: 30,
      lineHeight: 1.8,
      maxWidth: '55ch',
      color: ['main', 'text', '--alpha 0.7'],
    },
    rhythmVertical: { marginBottom: 40 },
  },
  lead: {
    label: 'Lead paragraph',
    group: 'style',
    style: {
      display: 'block',
      fontFamily: 'default',
      fontSize: 40,
      lineHeight: 1.6,
      maxWidth: '55ch',
      mobile: { fontSize: 40 },
    },
    rhythmVertical: { marginBottom: 40 },
  },
  hr: {
    label: '--',
    group: 'block',
    button: { label: '--' },
    style: { display: 'block', color: '#808080', opacity: 0.2 },
    rhythmVertical: { marginBottom: 50 },
  },
  'pre:not([class])': {
    label: 'Pre',
    group: 'text',
    style: {
      display: 'block',
      fontFamily: 'code',
      color: ['main', 'text'],
      backgroundColor: ['main', 'surface'],
      lineHeight: 1.5,
      paddingInline: 1.25,
      paddingBlock: 0.75,
      borderRadius: 1,
      depth: '0',
    },
    rhythmVertical: { marginBottom: 50 },
  },
  'code:not(pre > code)': {
    label: 'Code',
    group: 'text',
    button: { label: '</>' },
    style: {
      display: 'inline-block',
      fontFamily: 'code',
      color: ['main', 'text'],
      lineHeight: 1.1,
      backgroundColor: ['accent', 'surface'],
      borderRadius: 10,
      paddingInline: 10,
      paddingBlock: 0,
    },
  },
  blockquote: {
    label: 'Blockquote',
    group: 'block',
    button: {
      label:
        '<svg viewBox="0 0 20 20"><path d="M3 10.423a6.5 6.5 0 0 1 6.056-6.408l.038.67C6.448 5.423 5.354 7.663 5.22 10H9c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574zm8 0a6.5 6.5 0 0 1 6.056-6.408l.038.67c-2.646.739-3.74 2.979-3.873 5.315H17c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574z"></path></svg>',
    },
    style: { display: 'block', fontFamily: 'quote' },
    editor: {
      style: { paddingInlineStart: 1.25, borderLeft: '1px solid #000' },
    },
    rhythmVertical: { marginBottom: 50 },
  },
  a: {
    label: 'Link',
    group: 'text',
    button: {
      label:
        '<svg viewBox="0 0 20 20"><path d="m11.077 15 .991-1.416a.75.75 0 1 1 1.229.86l-1.148 1.64a.748.748 0 0 1-.217.206 5.251 5.251 0 0 1-8.503-5.955.741.741 0 0 1 .12-.274l1.147-1.639a.75.75 0 1 1 1.228.86L4.933 10.7l.006.003a3.75 3.75 0 0 0 6.132 4.294l.006.004zm5.494-5.335a.748.748 0 0 1-.12.274l-1.147 1.639a.75.75 0 1 1-1.228-.86l.86-1.23a3.75 3.75 0 0 0-6.144-4.301l-.86 1.229a.75.75 0 0 1-1.229-.86l1.148-1.64a.748.748 0 0 1 .217-.206 5.251 5.251 0 0 1 8.503 5.955zm-4.563-2.532a.75.75 0 0 1 .184 1.045l-3.155 4.505a.75.75 0 1 1-1.229-.86l3.155-4.506a.75.75 0 0 1 1.045-.184z"></path></svg>',
    },
    style: { color: 'accent', textDecoration: 'underline' },
  },
  quote: {
    label: 'Quote',
    group: 'text',
    button: {
      label:
        '<svg viewBox="0 0 20 20"><path d="M3 10.423a6.5 6.5 0 0 1 6.056-6.408l.038.67C6.448 5.423 5.354 7.663 5.22 10H9c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574zm8 0a6.5 6.5 0 0 1 6.056-6.408l.038.67c-2.646.739-3.74 2.979-3.873 5.315H17c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574z"></path></svg>',
    },
    style: { fontFamily: 'quote' },
    rhythmVertical: { marginBottom: 50 },
  },
  bold: {
    label: 'Bold',
    group: 'text',
    style: { fontWeight: 'bold' },
    button: { label: 'B', style: { fontWeight: 'bolder' } },
  },
  italic: {
    label: 'Italic',
    group: 'text',
    style: { fontStyle: 'italic' },
    button: { label: 'I', style: { fontStyle: 'italic' } },
  },
  large: {
    label: 'Large',
    group: 'text',
    style: { fontSize: '1.1em' },
    button: { label: 'A', style: { fontSize: '1.01em' } },
  },
  larger: {
    label: 'Larger',
    group: 'text',
    style: { fontSize: '1.2em' },
    button: { label: 'A', style: { fontSize: '1.02em' } },
  },
  largest: {
    label: 'Largest',
    group: 'text',
    style: { fontSize: '1.3em' },
    button: { label: 'A', style: { fontSize: '1.03em' } },
  },
  small: {
    label: 'Small',
    group: 'text',
    style: { fontSize: '0.9em' },
    button: { label: 'A', style: { fontSize: '0.99em' } },
  },
  smaller: {
    label: 'Smaller',
    group: 'text',
    style: { fontSize: '0.8em' },
    button: { label: 'A', style: { fontSize: '0.98em' } },
  },
  smallest: {
    label: 'Smallest',
    group: 'text',
    style: { fontSize: '0.7em' },
    button: { label: 'A', style: { fontSize: '0.97em' } },
  },
  mark: {
    label: 'Mark',
    group: 'text',
    button: { label: 'M' },
    style: { backgroundColor: '#ffbb00' },
  },
  del: {
    label: 'Deleted',
    group: 'text',
    style: { textDecoration: 'line-through' },
    button: { label: 'D', style: { textDecoration: 'line-through' } },
  },
  ins: {
    label: 'Inserted',
    group: 'text',
    style: { textDecoration: 'underline' },
    button: { label: 'U', style: { textDecoration: 'underline' } },
  },
  sub: {
    label: 'Subscript',
    group: 'text',
    style: { verticalAlign: 'sub', fontSize: '0.6em' },
    button: {
      label: 'Sub',
      style: { verticalAlign: 'sub', fontSize: '0.6em' },
    },
  },
  sup: {
    label: 'Superscript',
    group: 'text',
    style: { verticalAlign: 'sup', fontSize: '0.6em' },
    button: {
      label: 'Sup',
      style: { verticalAlign: 'sup', fontSize: '0.6em' },
    },
  },
  main: {
    label: 'Main',
    group: 'color',
    type: 'color',
    style: { color: '#808080' },
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
      backgroundImage: 'linear-gradient(90deg, #808080 0%, #8c8c8c 100%)',
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
      backgroundImage: 'linear-gradient(90deg, #ffbb00 0%, #ffc21a 100%)',
    },
  },
  complementary: {
    label: 'Complementary',
    group: 'color',
    type: 'color',
    style: { color: '#8054F9' },
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
      backgroundImage: 'linear-gradient(90deg, #8054F9 0%, #916bfa 100%)',
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
      backgroundImage: 'linear-gradient(90deg, #91ff00 0%, #9cff1a 100%)',
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
      backgroundImage: 'linear-gradient(90deg, #ffd500 0%, #ffd91a 100%)',
    },
  },
  error: {
    label: 'Error',
    group: 'color',
    type: 'color',
    style: { color: '#ff003b' },
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
      backgroundImage: 'linear-gradient(90deg, #ff003b 0%, #ff1a4f 100%)',
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
      backgroundImage: 'linear-gradient(90deg, #00ffff 0%, #1affff 100%)',
    },
  },
};

```

Note that each typo have multiple properties. Here's their signification:

- `label`: The label that can be used in a WYSIWYG editor for example.
- `group`: A group info that can be used in a WYSIWYG editor for example.
- `style`: The actual typo style that will be used in your generated `CSS` through the `@sugar.typo.classes` mixin.
- `rhythmVertical`: The style to apply when element is scoped in a `s-rhythm:vertical` class.
- `button.label`: The label that can be used in a WYSIWYG editor for example.
- `button.style`: The style to apply on the button in a WYSIWYG editor.
- `editor.style`: The style to apply in a WYSIWYG editor.

> These configurations are exported by default in the `frontspec.json` file. This is usefull to expose your typo configuration to a backend (wordpress, laravel, etc...).

## Special properties treatment

Some properties in these objects will be proxied by the toolkit to allows internal theme value usage like `font-size` in the example above that has the value `40`. This value will be taken from the `font.size` theme configuration.

This behavior will happen to all properties supported by the [STheme.jsObjectToCssProperties](/api/@coffeekraken/s-theme) static method.

## Classes

Some classes will be generated from your theme configuration like these:



## Text format

Sometimes, you don't have full control on your generated HTML exactly like in these documentations that are generated by converting some markdown to HTML.

Unless this, you actually want to apply your typo styles on this output.

To do so, you can simply wrap your generated HTML into a div with the special `s-rhythm:vertical` class like so:

```html
<div class="s-rhythm s-rhythm-vertical">
  <!-- your generated html here... -->
</div>

```

