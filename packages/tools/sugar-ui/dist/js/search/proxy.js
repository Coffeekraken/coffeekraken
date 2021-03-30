/* Compiled using Coffeekraken Sugar SJsCompiler class which stand over the AMAZING esbuild module */
import __request from "@coffeekraken/sugar/js/http/request";
import __SWebComponent from "@coffeekraken/sugar/js/webcomponent/SWebComponent";
__SWebComponent.on("s-filtrable-input.ready", ({target, value}) => {
  target.on("input", (value2) => {
    __request({
      url: `/search/${value2}`,
      method: "get"
    }).then((response) => {
      const items = response.data.map((item) => {
        return {
          title: item.title,
          description: item.description
        };
      });
      target.prop("items", items);
      console.log(items);
    });
  });
});
//# sourceMappingURL=proxy.js.map
