import "../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __objectHash from "@coffeekraken/sugar/shared/object/objectHash";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginClassesMixinInterface extends __SInterface {
  static get _definition() {
    return {};
  }
}
async function classes_default({
  params,
  atRule,
  cache,
  sharedData,
  toCache,
  replaceWith
}) {
  const cssArray = [
    "@sugar.reset;",
    "@sugar.ui.classes;",
    "@sugar.typo.classes;",
    "@sugar.layout.classes;",
    "@sugar.clearfix.classes;",
    "@sugar.cursor.classes;",
    "@sugar.color.classes;",
    "@sugar.fit.classes;",
    "@sugar.format.classes;",
    "@sugar.link.classes;",
    "@sugar.gap.classes;",
    "@sugar.height.classes;",
    "@sugar.text.classes;",
    "@sugar.font.classes;",
    "@sugar.depth.classes;",
    "@sugar.disabled.classes;",
    "@sugar.flex.classes;",
    "@sugar.float.classes;",
    "@sugar.ratio.classes;",
    "@sugar.border.classes;",
    "@sugar.display.classes;",
    "@sugar.overflow.classes;",
    "@sugar.position.classes;",
    "@sugar.pointer.classes;",
    "@sugar.transition.classes;",
    "@sugar.margin.classes;",
    "@sugar.offsize.classes;",
    "@sugar.order.classes;",
    "@sugar.opacity.classes;",
    "@sugar.scale.classes;",
    "@sugar.padding.classes;",
    "@sugar.userSelect.classes;",
    "@sugar.visibility.classes;",
    "@sugar.visually.classes;",
    "@sugar.truncate.classes;",
    "@sugar.until.classes;",
    "@sugar.when.classes;",
    "@sugar.scrollbar.classes;",
    "@sugar.width.classes;",
    "@sugar.components.classes;",
    "@sugar.whiteSpace.classes;"
  ];
  const hash = `@sugar.classes.${__objectHash({
    css: cssArray,
    theme: __STheme.hash()
  })}`;
  const c = cache("@sugar.classes", hash, cssArray);
  return c;
}
export {
  classes_default as default,
  postcssSugarPluginClassesMixinInterface as interface
};
