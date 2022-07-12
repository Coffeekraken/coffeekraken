import { getFunctionsList } from "@coffeekraken/s-postcss-sugar-plugin";

export default async function () {
  const functions = getFunctionsList();
  return {
    functions,
  };
}
