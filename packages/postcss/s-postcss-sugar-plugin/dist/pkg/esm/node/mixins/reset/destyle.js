import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           destyle
 * @namespace      node.mixin.reset
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin print the destyle css reset
 *
 * @ƒeature       Reset from https://github.com/nicolas-cusan/destyle.css
 *
 * @return        {Css}         The generated css
 *
 * @snippet     @sugar.reset.destyle
 *
 * @example        css
 * \@sugar.reset.destyle;
 *
 * @see       https://github.com/nicolas-cusan/destyle.css
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginResetDestyleInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginResetDestyleInterface as interface };
export default function ({ params, CssVars, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `
       /**
        * @name          Destyle reset
        * @namespace          sugar.style.resets
        * @type               Styleguide
        * @menu           Styleguide / Resets        /styleguide/resets/destyle
        * @platform       css
        * @status       beta
        * 
        * These mixins allows you to apply the \`destyle\` reset easily.
        * 
        * @feature      Ensures consistency across browsers as much as possible
        * @feature      Prevents the necessity of reseting user agent styles
        * @feature      Prevents style inspector bloat by only targeting what is necessary
        * @feature      Removes margins & paddings
        * @feature      Removes default font styles and ensures proper inheritance
        * @feature      Contributes to the separation of presentation and semantics
        * @feature      Sets sensible default styles
        * @feature      Well suited for utility class libraries and large codebases
        * @feature      Made for modern browsers only, therefor small in size (~0.95kb)
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @example        css
        * \@sugar.reset.destyle;
        * 
        * @see          https://github.com/nicolas-cusan/destyle.css
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `).code(`
    
@sugar.lod.prevent() {
      
  /* purgecss start ignore */

  /*! destyle.css v2.0.2 | MIT License | https://github.com/nicolas-cusan/destyle.css */

  /* Reset box-model and set borders */
  /* ============================================ */

  *,
  ::before,
  ::after {
    box-sizing: border-box;
    border-style: solid;
    border-width: 0;
  }

  /* Document */
  /* ============================================ */

  /**
   * 1. Correct the line height in all browsers.
   * 2. Prevent adjustments of font size after orientation changes in iOS.
   * 3. Remove gray overlay on links for iOS.
   */

  html {
    line-height: 1.15; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
    -webkit-tap-highlight-color: transparent; /* 3*/
  }

  /* Sections */
  /* ============================================ */

  /**
   * Remove the margin in all browsers.
   */

  body {
    margin: 0;
  }

  /**
   * Render the main element consistently in IE.
   */

  main {
    display: block;
  }

  /* Vertical rhythm */
  /* ============================================ */

  p,
  table,
  blockquote,
  address,
  pre,
  iframe,
  form,
  figure,
  dl {
    margin: 0;
  }

  /* Headings */
  /* ============================================ */

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
    line-height: inherit;
    font-weight: inherit;
    margin: 0;
  }

  /* Lists (enumeration) */
  /* ============================================ */

  ul,
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  /* Lists (definition) */
  /* ============================================ */

  dt {
    font-weight: bold;
  }

  dd {
    margin-left: 0;
  }

  /* Grouping content */
  /* ============================================ */

  /**
   * 1. Add the correct box sizing in Firefox.
   * 2. Show the overflow in Edge and IE.
   */

  hr {
    box-sizing: content-box; /* 1 */
    height: 0; /* 1 */
    overflow: visible; /* 2 */
    border-top-width: 1px;
    margin: 0;
    clear: both;
    color: inherit;
  }

  /**
   * 1. Correct the inheritance and scaling of font size in all browsers.
   * 2. Correct the odd em font sizing in all browsers.
   */

  pre {
    font-family: monospace, monospace; /* 1 */
    font-size: inherit; /* 2 */
  }

  address {
    font-style: inherit;
  }

  /* Text-level semantics */
  /* ============================================ */

  /**
   * Remove the gray background on active links in IE 10.
   */

  a {
    background-color: transparent;
    text-decoration: none;
    color: inherit;
  }

  /**
   * 1. Remove the bottom border in Chrome 57-
   * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
   */

  abbr[title] {
    text-decoration: underline; /* 2 */
    text-decoration: underline dotted; /* 2 */
  }

  /**
   * Add the correct font weight in Chrome, Edge, and Safari.
   */

  b,
  strong {
    font-weight: bolder;
  }

  /**
   * 1. Correct the inheritance and scaling of font size in all browsers.
   * 2. Correct the odd em font sizing in all browsers.
   */

  code,
  kbd,
  samp {
    font-family: monospace, monospace; /* 1 */
    font-size: inherit; /* 2 */
  }

  /**
   * Add the correct font size in all browsers.
   */

  small {
    font-size: 80%;
  }

  /**
   * Prevent sub and sup elements from affecting the line height in
   * all browsers.
   */

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  /* Embedded content */
  /* ============================================ */

  /**
   * Prevent vertical alignment issues.
   */

  img,
  embed,
  object,
  iframe {
    vertical-align: bottom;
  }

  /* Forms */
  /* ============================================ */

  /**
   * Reset form fields to make them styleable
   */

  button,
  input,
  optgroup,
  select,
  textarea {
    -webkit-appearance: none;
    appearance: none;
    vertical-align: middle;
    color: inherit;
    font: inherit;
    background: transparent;
    padding: 0;
    margin: 0;
    outline: 0;
    border-radius: 0;
    text-align: inherit;
  }

  /**
   * Reset radio and checkbox appearance to preserve their look in iOS.
   */

  [type="checkbox"] {
    -webkit-appearance: checkbox;
    appearance: checkbox;
  }

  [type="radio"] {
    -webkit-appearance: radio;
    appearance: radio;
  }

  /**
   * Show the overflow in IE.
   * 1. Show the overflow in Edge.
   */

  button,
  input {
    /* 1 */
    overflow: visible;
  }

  /**
   * Remove the inheritance of text transform in Edge, Firefox, and IE.
   * 1. Remove the inheritance of text transform in Firefox.
   */

  button,
  select {
    /* 1 */
    text-transform: none;
  }

  /**
   * Correct the inability to style clickable types in iOS and Safari.
   */

  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
  }

  button[disabled],
  [type="button"][disabled],
  [type="reset"][disabled],
  [type="submit"][disabled] {
    cursor: default;
  }

  /**
   * Remove the inner border and padding in Firefox.
   */

  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  /**
   * Restore the focus styles unset by the previous rule.
   */

  button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  /**
   * Remove arrow in IE10 & IE11
   */

  select::-ms-expand {
    display: none;
  }

  /**
   * Remove padding
   */

  option {
    padding: 0;
  }

  /**
   * Reset to invisible
   */

  fieldset {
    margin: 0;
    padding: 0;
    min-width: 0;
  }

  /**
   * 1. Correct the text wrapping in Edge and IE.
   * 2. Correct the color inheritance from fieldset elements in IE.
   * 3. Remove the padding so developers are not caught out when they zero out
   *    fieldset elements in all browsers.
   */

  legend {
    color: inherit; /* 2 */
    display: table; /* 1 */
    max-width: 100%; /* 1 */
    padding: 0; /* 3 */
    white-space: normal; /* 1 */
  }

  /**
   * Add the correct vertical alignment in Chrome, Firefox, and Opera.
   */

  progress {
    vertical-align: baseline;
  }

  /**
   * Remove the default vertical scrollbar in IE 10+.
   */

  textarea {
    overflow: auto;
  }

  /**
   * Correct the cursor style of increment and decrement buttons in Chrome.
   */

  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  /**
   * 1. Correct the outline style in Safari.
   */

  [type="search"] {
    outline-offset: -2px; /* 1 */
  }

  /**
   * Remove the inner padding in Chrome and Safari on macOS.
   */

  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  /**
   * 1. Correct the inability to style clickable types in iOS and Safari.
   * 2. Change font properties to inherit in Safari.
   */

  ::-webkit-file-upload-button {
    -webkit-appearance: button; /* 1 */
    font: inherit; /* 2 */
  }

  /**
   * Clickable labels
   */

  label[for] {
    cursor: pointer;
  }

  /* Interactive */
  /* ============================================ */

  /*
  * Add the correct display in Edge, IE 10+, and Firefox.
  */

  details {
    display: block;
  }

  /*
  * Add the correct display in all browsers.
  */

  summary {
    display: list-item;
  }

  /* Table */
  /* ============================================ */

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  caption {
    text-align: left;
  }

  td,
  th {
    vertical-align: top;
    padding: 0;
  }

  th {
    text-align: left;
    font-weight: bold;
  }

  /* purgecss end ignore */

}
`);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLHVDQUF3QyxTQUFRLFlBQVk7SUFDOUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sT0FBTyxFQUNQLE1BQU0sRUFDTixXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQWlDVCxDQUNBLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBd2RWLENBQUMsQ0FBQztJQUVDLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==