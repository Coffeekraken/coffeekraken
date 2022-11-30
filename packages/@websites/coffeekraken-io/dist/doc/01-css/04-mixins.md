
<!-- header -->
# @website/coffeekraken-io

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@website/coffeekraken-io?style=for-the-badge)](https://www.npmjs.com/package/@website/coffeekraken-io)
[![downloads](https://shields.io/npm/dm/@website/coffeekraken-io?style=for-the-badge)](https://www.npmjs.com/package/@website/coffeekraken-io)
[![license](https://shields.io/npm/l/@website/coffeekraken-io?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
The frontend toolkit that works for everyone. Experts, professionals and new-comers

<!-- install -->
### Install

```shell
npm i @website/coffeekraken-io
```

<!-- body -->

<!--
/**
* @name            Mixins
* @namespace       doc.css
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / CSS           /doc/css/mixins
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# Mixins

The `postcssSugarPlugin` gives you access to a tone of useful mixins that can help you stay more coherent and clean in your css files. Here's a list of available mixins:

### Available Mixins

> Note that each mixin has his own documentation accessible by clicking or it...


-   [`@sugar.align.abs(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.align.abs)

-   [`@sugar.border.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.border.classes)

-   [`@sugar.border.radius(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.border.radius)

-   [`@sugar.border.width(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.border.width)

-   [`@sugar.cache(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.cache.cache)

-   [`@sugar.(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.classes)

-   [`@sugar.clearfix.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.clearfix.classes)

-   [`@sugar.clearfix(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.clearfix.clearfix)

-   [`@sugar.color.accent(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.color.accent)

-   [`@sugar.color.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.color.classes)

-   [`@sugar.color(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.color.color)

-   [`@sugar.color.complementary(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.color.complementary)

-   [`@sugar.color.current(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.color.current)

-   [`@sugar.color.docblocks(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.color.docblocks)

-   [`@sugar.color.remap(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.color.remap)

-   [`@sugar.components.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.components.classes)

-   [`@sugar.container.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.container.classes)

-   [`@sugar.container(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.container.container)

-   [`@sugar.cursor.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.cursor.classes)

-   [`@sugar.depth.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.depth.classes)

-   [`@sugar.depth(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.depth.depth)

-   [`@sugar.direction.rtl(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.direction.rtl)

-   [`@sugar.disabled.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.disabled.classes)

-   [`@sugar.disabled(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.disabled.disabled)

-   [`@sugar.display.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.display.classes)

-   [`@sugar.filter.noise(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.filter.noise)

-   [`@sugar.fit.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.fit.classes)

-   [`@sugar.fit(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.fit.fit)

-   [`@sugar.flex.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.flex.classes)

-   [`@sugar.float.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.float.classes)

-   [`@sugar.font.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.font.classes)

-   [`@sugar.font.faces(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.font.faces)

-   [`@sugar.font.family(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.font.family)

-   [`@sugar.font.size(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.font.size)

-   [`@sugar.format.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.format.classes)

-   [`@sugar.format.text(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.format.text)

-   [`@sugar.gap.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.gap.classes)

-   [`@sugar.gradient.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.gradient.classes)

-   [`@sugar.gradient(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.gradient.gradient)

-   [`@sugar.grid.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.grid.classes)

-   [`@sugar.group.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.group.classes)

-   [`@sugar.height.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.height.classes)

-   [`@sugar.hide.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.hide.classes)

-   [`@sugar.highlightjs.theme(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.highlightjs.theme)

-   [`@sugar.icon.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.icon.classes)

-   [`@sugar.icon.fa(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.icon.fa)

-   [`@sugar.icon.fa.brands(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.icon.fa.brands)

-   [`@sugar.icon.fa.solid(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.icon.fa.solid)

-   [`@sugar.icon.fs(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.icon.fs)

-   [`@sugar.icon.sugar(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.icon.sugar)

-   [`@sugar.import(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.import.import)

-   [`@sugar.init(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.init.init)

-   [`@sugar.layout.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.layout.classes)

-   [`@sugar.layout(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.layout.layout)

-   [`@sugar.link.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.link.classes)

-   [`@sugar.link.stretch(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.link.stretch)

-   [`@sugar.lnf.base(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.lnf.base)

-   [`@sugar.lnf.selection(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.lnf.selection)

-   [`@sugar.margin.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.margin.classes)

-   [`@sugar.media.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.media.classes)

-   [`@sugar.media(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.media.media)

-   [`@sugar.offsize.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.offsize.classes)

-   [`@sugar.opacity.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.opacity.classes)

-   [`@sugar.order.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.order.classes)

-   [`@sugar.outline(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.outline.outline)

-   [`@sugar.outline.outlineWhen(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.outline.outlineWhen)

-   [`@sugar.overflow.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.overflow.classes)

-   [`@sugar.padding.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.padding.classes)

-   [`@sugar.partial(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.partial.partial)

-   [`@sugar.platform.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.platform.classes)

-   [`@sugar.platform(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.platform.platform)

-   [`@sugar.pointer.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.pointer.classes)

-   [`@sugar.position.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.position.classes)

-   [`@sugar.ratio.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ratio.classes)

-   [`@sugar.ratio(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ratio.ratio)

-   [`@sugar.reset.destyle(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.reset.destyle)

-   [`@sugar.reset(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.reset.reset)

-   [`@sugar.reset.sugar(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.reset.sugar)

-   [`@sugar.rhythm.vertical(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.rhythm.vertical)

-   [`@sugar.scale.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.scale.classes)

-   [`@sugar.scale.global(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.scale.global)

-   [`@sugar.scale(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.scale.scale)

-   [`@sugar.scope.no(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.scope.no)

-   [`@sugar.scrollbar.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.scrollbar.classes)

-   [`@sugar.scrollbar.hide(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.scrollbar.hide)

-   [`@sugar.scrollbar(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.scrollbar.scrollbar)

-   [`@sugar.shadow.gradient(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.shadow.gradient)

-   [`@sugar.shape.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.shape.classes)

-   [`@sugar.shape(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.shape.shape)

-   [`@sugar.spacing.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.spacing.classes)

-   [`@sugar.state.active(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.state.active)

-   [`@sugar.state.disabled(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.state.disabled)

-   [`@sugar.state.focus(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.state.focus)

-   [`@sugar.state.hover(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.state.hover)

-   [`@sugar.text.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.text.classes)

-   [`@sugar.theme(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.theme.theme)

-   [`@sugar.theme.when(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.theme.when)

-   [`@sugar.transition.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.transition.classes)

-   [`@sugar.transition(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.transition.transition)

-   [`@sugar.truncate.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.truncate.classes)

-   [`@sugar.truncate(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.truncate.truncate)

-   [`@sugar.typo.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.typo.classes)

-   [`@sugar.ui.avatar(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.avatar.avatar)

-   [`@sugar.ui.avatar.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.avatar.classes)

-   [`@sugar.ui.backdrop(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.backdrop.backdrop)

-   [`@sugar.ui.backdrop.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.backdrop.classes)

-   [`@sugar.ui.badge(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.badge.badge)

-   [`@sugar.ui.badge.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.badge.classes)

-   [`@sugar.ui.base(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.base)

-   [`@sugar.ui.blockquote(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.blockquote.blockquote)

-   [`@sugar.ui.blockquote.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.blockquote.classes)

-   [`@sugar.ui.button(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.button.button)

-   [`@sugar.ui.button.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.button.classes)

-   [`@sugar.ui.checkbox(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.checkbox.checkbox)

-   [`@sugar.ui.checkbox.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.checkbox.classes)

-   [`@sugar.ui.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.classes)

-   [`@sugar.ui.dropdown.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.dropdown.classes)

-   [`@sugar.ui.dropdown(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.dropdown.dropdown)

-   [`@sugar.ui.fsTree.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.fsTree.classes)

-   [`@sugar.ui.fsTree(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.fsTree.fsTree)

-   [`@sugar.ui.input.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.input.classes)

-   [`@sugar.ui.input(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.input.input)

-   [`@sugar.ui.inputContainer.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.inputContainer.classes)

-   [`@sugar.ui.inputContainer(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.inputContainer.inputContainer)

-   [`@sugar.ui.label.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.label.classes)

-   [`@sugar.ui.label(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.label.label)

-   [`@sugar.ui.list.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.list.classes)

-   [`@sugar.ui.list(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.list.list)

-   [`@sugar.ui.loader.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.loader.classes)

-   [`@sugar.ui.loader.drop(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.loader.drop)

-   [`@sugar.ui.loader.round(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.loader.round)

-   [`@sugar.ui.loader.spinner(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.loader.spinner)

-   [`@sugar.ui.loader.squareDots(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.loader.squareDots)

-   [`@sugar.ui.radio.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.radio.classes)

-   [`@sugar.ui.radio(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.radio.radio)

-   [`@sugar.ui.range.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.range.classes)

-   [`@sugar.ui.range(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.range.range)

-   [`@sugar.ui.select.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.select.classes)

-   [`@sugar.ui.select(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.select.select)

-   [`@sugar.ui.switch.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.switch.classes)

-   [`@sugar.ui.switch(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.switch.switch)

-   [`@sugar.ui.table.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.table.classes)

-   [`@sugar.ui.table(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.table.table)

-   [`@sugar.ui.tabs.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.tabs.classes)

-   [`@sugar.ui.tabs(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.tabs.tabs)

-   [`@sugar.ui.toggle.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.toggle.classes)

-   [`@sugar.ui.toggle(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.toggle.toggle)

-   [`@sugar.ui.tooltip.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.tooltip.classes)

-   [`@sugar.ui.tooltip(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.ui.tooltip.tooltip)

-   [`@sugar.until.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.until.classes)

-   [`@sugar.until.mounted(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.until.mounted)

-   [`@sugar.userSelect.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.userSelect.classes)

-   [`@sugar.utils.configToCss(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.utils.configToCss)

-   [`@sugar.visibility.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.visibility.classes)

-   [`@sugar.visibility.hidden(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.visibility.hidden)

-   [`@sugar.visually.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.visually.classes)

-   [`@sugar.visually.hidden(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.visually.hidden)

-   [`@sugar.when.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.when.classes)

-   [`@sugar.when(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.when.when)

-   [`@sugar.whiteSpace.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.whiteSpace.classes)

-   [`@sugar.width.classes(...);`](/api/@coffeekraken.s-postcss-sugar-plugin.node.mixin.width.classes)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
