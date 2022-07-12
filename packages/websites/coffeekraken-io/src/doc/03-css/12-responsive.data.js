import __STheme from "@coffeekraken/s-theme";

export default async function () {
  const media = __STheme.get("media");

  return {
    media,
    mediaJson: JSON.stringify(media, null, 2),
  };
}
