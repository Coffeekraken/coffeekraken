import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../utils/themeVar';
class postcssSugarPluginPrismThemeInterface extends __SInterface {
}
postcssSugarPluginPrismThemeInterface.definition = {};
export { postcssSugarPluginPrismThemeInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const vars = [
        `
    /**
* xonokai theme for JavaScript, CSS and HTML
* based on: https://github.com/MoOx/sass-prism-theme-base by Maxime Thirouin ~ MoOx --> http://moox.fr/ , which is Loosely based on Monokai textmate theme by http://www.monokai.nl/
* license: MIT; http://moox.mit-license.org/
*/
code[class*="language-"],
pre[class*="language-"] {
	-moz-tab-size: 2;
	-o-tab-size: 2;
	tab-size: 2;
	-webkit-hyphens: none;
	-moz-hyphens: none;
	-ms-hyphens: none;
	hyphens: none;
	white-space: pre;
	white-space: pre-wrap;
	word-wrap: normal;
	color: sugar.color(info, text);
	text-shadow: none;
    line-height: 1.5;
	padding: sugar.space(20);

    @sugar.font.family(code);
}

pre > code[class*="language-"] {
	font-size: 1em;
}

pre[class*="language-"],
:not(pre) > code[class*="language-"] {
	background: sugar.color(ui, surface);
}

pre[class*="language-"] {
    padding: sugar.theme(ui.code.padding);
    border-radius: sugar.theme(ui.code.borderRadius);
    border: sugar.color(ui, border) solid 1px;
	overflow: auto;
	position: relative;
}

pre[class*="language-"] code {
	white-space: pre;
	display: block;
}

:not(pre) > code[class*="language-"] {
    padding: ${__themeVar(`ui.code.padding`)};
	border-radius: ${__themeVar(`ui.code.borderRadius`)};
	/* border: 0.13em solid #7a6652; */
	box-shadow: 1px 1px 0.3em -0.1em #000 inset;
}

.token.namespace {
	opacity: .7;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
	color: sugar.color(ui, foreground);
    opacity: .6;
}

.token.operator,
.token.boolean,
.token.number {
	color: sugar.color(complementary);
}

.token.attr-name,
.token.string {
	color: sugar.color(accent, --spin 340);
}

.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
	color: sugar.color(warning);
}

.token.selector,
.token.inserted {
	color: sugar.color(accent);
}

.token.atrule,
.token.attr-value,
.token.keyword,
.token.important,
.token.deleted {
	color: sugar.color(accent);
}

.token.regex,
.token.statement {
	color: sugar.color(error);
}

.token.placeholder,
.token.variable {
	color: #fff;
}

.token.important,
.token.statement,
.token.bold {
	font-weight: bold;
}

.token.punctuation {
	color: sugar.color(info, text);
    opacity: .6;
}

.token.entity {
	cursor: help;
}

.token.italic {
	font-style: italic;
}

code.language-markup {
	color: #f9f9f9;
}

code.language-markup .token.tag {
	color: #ef3b7d;
}

code.language-markup .token.attr-name {
	color: #a6e22d;
}

code.language-markup .token.attr-value {
	color: #e6d06c;
}

code.language-markup .token.style,
code.language-markup .token.script {
	color: #76d9e6;
}

code.language-markup .token.script .token.keyword {
	color: #76d9e6;
}

/* Line highlight plugin */
pre[class*="language-"][data-line] {
	position: relative;
	padding: 1em 0 1em 3em;
}

pre[data-line] .line-highlight {
	position: absolute;
	left: 0;
	right: 0;
	padding: 0;
	margin-top: 1em;
	background: rgba(255, 255, 255, 0.08);
	pointer-events: none;
	line-height: 1.5em;
	white-space: pre;
}

pre[data-line] .line-highlight:before,
pre[data-line] .line-highlight[data-end]:after {
	content: attr(data-start);
	position: absolute;
	top: .4em;
	left: .6em;
	min-width: 1em;
	padding: 0.2em 0.5em;
	background-color: rgba(255, 255, 255, 0.4);
	color: black;
	font: bold 65%/1 sans-serif;
	height: 1.5em;
	line-height: 1.5em;
	text-align: center;
	border-radius: 999px;
	text-shadow: none;
	box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);
}

pre[data-line] .line-highlight[data-end]:after {
	content: attr(data-end);
	top: auto;
	bottom: .4em;
}
  `
    ];
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFVBQVUsTUFBTSxzQkFBc0IsQ0FBQztBQUU5QyxNQUFNLHFDQUFzQyxTQUFRLFlBQVk7O0FBQ3ZELGdEQUFVLEdBQUcsRUFBRSxDQUFDO0FBS3pCLE9BQU8sRUFBRSxxQ0FBcUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUU5RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUtaO0lBQ0MsTUFBTSxXQUFXLHFCQUNaLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWE7UUFDckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFpRFcsVUFBVSxDQUFDLGlCQUFpQixDQUFDO2tCQUMxQixVQUFVLENBQUMsc0JBQXNCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdKakQ7S0FDQSxDQUFDO0lBRUYsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BCLENBQUMifQ==