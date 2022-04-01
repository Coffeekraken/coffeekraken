import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import querySelectorLive from "../dom/query/querySelectorLive";
import urlParse from "url-parse";
import scrollTo from "../dom/scroll/scrollTo";
import __deepMerge from "../../shared/object/deepMerge";
function smoothScrollOnAnchorLinks(settings = {}) {
  settings = __deepMerge({
    scroll: {},
    checkPathNames: true
  }, settings);
  querySelectorLive('a:not([is])[href*="#"]', ($link) => {
    $link.addEventListener("click", (e) => {
      const linkUrl = urlParse($link.getAttribute("href"));
      const currentUrl = urlParse();
      if (!linkUrl.hash || linkUrl.hash === "#")
        return;
      if (settings.checkPathNames && currentUrl.pathname !== linkUrl.pathname)
        return;
      const $target = document.querySelector(linkUrl.hash);
      if (!$target)
        return;
      e.preventDefault();
      history.pushState({}, null, linkUrl.hash);
      scrollTo($target, settings.scroll);
    });
  });
}
var smoothScrollOnAnchorLinks_default = smoothScrollOnAnchorLinks;
export {
  smoothScrollOnAnchorLinks_default as default
};
