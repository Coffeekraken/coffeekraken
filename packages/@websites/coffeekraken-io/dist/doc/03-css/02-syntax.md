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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

<!-- image -->

<!-- header -->
##### @coffeekraken/coffeekraken-io



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

```js
import __expandPleasantCssClassnames from "@coffeekraken/sugar/shared/html/__expandPleasantCssClassnames";
__expandPleasantCssClassnames("...");

```


#### Js

**expandPleasantCssClassnamesLive**: This will monitor your app and transform classes live when they appears into the HTML.

```js
import __expandPleasantCssClassnamesLive from "@coffeekraken/sugar/js/html/__expandPleasantCssClassnamesLive";
__expandPleasantCssClassnamesLive();

```


> Note that this can be very useful but may occurs some "layout shift" at page display time

#### PHP

**\Sugar\html\expandPleasantCssClassnames**: This will transform all the classes from the HTML string passed.

```js
$processed = \Sugar\html\expandPleasantCssClassnames('...');

```


#### Specifications

Here's the specification that a transformer MUST integrate in order to be considered as a valid one:

1. Transform `:` with `--`
2. Repeat base class like so:
   - From: `s-font:bold:italic`
   - To: `s-font s-font--bold s-font--italic`
3. Support the `@mediaName` syntax like so:
   - From: `s-font:bold @mobile s-font:italic`
   - To: `s-font s-font--bold s-font--italic___mobile`

