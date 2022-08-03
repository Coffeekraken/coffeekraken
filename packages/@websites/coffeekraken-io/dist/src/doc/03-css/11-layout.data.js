import __STheme from "@coffeekraken/s-theme";

export default async function () {
  const layouts = __STheme.get("layout.layout");

  return {
    layouts,
  };
}
