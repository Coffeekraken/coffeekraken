/* Compiled using Coffeekraken Sugar SJsCompiler class which stand over the AMAZING esbuild module */
let process = {};import __request from "@coffeekraken/sugar/js/http/request";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2pzL3NlYXJjaC9wcm94eS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IF9fcmVxdWVzdCBmcm9tICdAY29mZmVla3Jha2VuL3N1Z2FyL2pzL2h0dHAvcmVxdWVzdCc7XG5pbXBvcnQgX19TV2ViQ29tcG9uZW50IGZyb20gJ0Bjb2ZmZWVrcmFrZW4vc3VnYXIvanMvd2ViY29tcG9uZW50L1NXZWJDb21wb25lbnQnO1xuXG5fX1NXZWJDb21wb25lbnQub24oJ3MtZmlsdHJhYmxlLWlucHV0LnJlYWR5JywgKHsgdGFyZ2V0LCB2YWx1ZSB9KSA9PiB7XG4gIHRhcmdldC5vbignaW5wdXQnLCAodmFsdWUpID0+IHtcbiAgICBfX3JlcXVlc3Qoe1xuICAgICAgdXJsOiBgL3NlYXJjaC8ke3ZhbHVlfWAsXG4gICAgICBtZXRob2Q6ICdnZXQnXG4gICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgIC8vIHNldCB0aGUgaXRlbXMgaW4gdGhlIHNlYXJjaCBkcm9wZG93blxuICAgICAgY29uc3QgaXRlbXMgPSByZXNwb25zZS5kYXRhLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRpdGxlOiBpdGVtLnRpdGxlLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBpdGVtLmRlc2NyaXB0aW9uXG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgdGFyZ2V0LnByb3AoJ2l0ZW1zJywgaXRlbXMpO1xuXG4gICAgICBjb25zb2xlLmxvZyhpdGVtcyk7XG5cbiAgICAgIC8vIGRvIHNvbWV0aGluZy4uLlxuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFDQTtBQUVBLGdCQUFnQixHQUFHLDJCQUEyQixDQUFDLENBQUUsUUFBUTtBQUN2RCxTQUFPLEdBQUcsU0FBUyxDQUFDO0FBQ2xCLGNBQVU7QUFBQSxNQUNSLEtBQUssV0FBVztBQUFBLE1BQ2hCLFFBQVE7QUFBQSxPQUNQLEtBQUssQ0FBQztBQUVQLFlBQU0sUUFBUSxTQUFTLEtBQUssSUFBSSxDQUFDO0FBQy9CLGVBQU87QUFBQSxVQUNMLE9BQU8sS0FBSztBQUFBLFVBQ1osYUFBYSxLQUFLO0FBQUE7QUFBQTtBQUl0QixhQUFPLEtBQUssU0FBUztBQUVyQixjQUFRLElBQUk7QUFBQTtBQUFBO0FBQUE7IiwKICAibmFtZXMiOiBbXQp9Cg==
