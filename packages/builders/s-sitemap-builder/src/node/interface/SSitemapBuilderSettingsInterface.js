import __SInterface from "@coffeekraken/s-interface";
class SSitemapBuilderSettingsInterface extends __SInterface {
  static get _definition() {
    return {
      sources: {
        description: 'Specify the sources to use to build the sitemap. A source is a objet with the properties "active", "settings" and "path"',
        type: "Object",
        default: {}
      }
    };
  }
}
export {
  SSitemapBuilderSettingsInterface as default
};
