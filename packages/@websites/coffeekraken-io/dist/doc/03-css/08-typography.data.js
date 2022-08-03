import __STheme from "@coffeekraken/s-theme";

export default async function () {
  const typos = __STheme.get("typo");

  return {
    typos,
  };
}
