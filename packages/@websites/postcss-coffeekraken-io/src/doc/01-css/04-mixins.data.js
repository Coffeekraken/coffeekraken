import { getMixinsList } from "@coffeekraken/s-postcss-sugar-plugin";

export default async function () {
  const mixins = getMixinsList();
  return {
    mixins,
  };
}
