<!--
/**
 * @name            Pleasant syntax
 * @namespace       doc.css
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / CSS           /doc/css/pleasant-syntax
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
-->

{{#> layout-doc }}

# Pleasant syntax

Pleasant syntax is a way to write your classes into your HTML that let you apply complex behaviors with minimal classes names like so:

```html
<!-- this statement -->
<div class="s-font:20:bold:italic s-p:40 s-typo:h2 @tablet s-typo:h5">
    Hello world
</div>
<!-- will be transformed into -->
<div
    class="s-font s-font--20 s-font--bold s-font--italic s-p s-p--40 s-typo s-typo--h2 s-typo--h5___tablet"
>
    Hello world
</div>
```

## Preprocessors

In order for this transformation to happen, you'll need to use one of these transformers:

#### Node / Js

**expandPleasantCssClassnames**: This will take your classes string and expand theme:

{{#> s-code-example lang='js'}}
import expandPleasantCssClassnames from '@coffeekraken/sugar/shared/html/expandPleasantCssClassnames';
expandPleasantCssClassnames('...');
{{/s-code-example}}

#### Js

**expandPleasantCssClassnamesLive**: This will monitor your app and transform classes live when they appears into the HTML.

{{#> s-code-example lang='js'}}
import expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';
expandPleasantCssClassnamesLive();
{{/s-code-example}}

> Note that this can be very useful but may occurs some "layout shift" at page display time

#### PHP

**\Sugar\html\expandPleasantCssClassnames**: This will transform all the classes from the HTML string passed.

{{#> s-code-example lang='php'}}
$processed = \Sugar\html\expandPleasantCssClassnames('...');
{{/s-code-example}}

#### Specifications

Here's the specification that a transformer MUST integrate in order to be considered as a valid one:

1. Transform `:` with `--`
2. Repeat base class like so:
    - From: `s-font:bold:italic`
    - To: `s-font s-font--bold s-font--italic`
3. Support the `@mediaName` syntax like so:
    - From: `s-font:bold @mobile s-font:italic`
    - To: `s-font s-font--bold s-font--italic___mobile`

{{/layout-doc }}
