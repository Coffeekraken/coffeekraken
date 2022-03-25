import __isVisible from "../is/visible";
import __closestNotVisible from "../query/closestNotVisible";
function whenVisible(elm, cb = null) {
  return new Promise((resolve, reject) => {
    let isSelfVisible = false, areParentsVisible = false, closestNotVisible = null, selfObserver = null, parentObserver = null;
    const _cb = () => {
      if (isSelfVisible && areParentsVisible) {
        if (cb)
          cb(elm);
        resolve(elm);
        elm.removeEventListener("transitionend", _eventCb);
        elm.removeEventListener("animationstart", _eventCb);
        elm.removeEventListener("animationend", _eventCb);
        if (closestNotVisible) {
          closestNotVisible.removeEventListener("transitionend", _eventCb);
          closestNotVisible.removeEventListener("animationstart", _eventCb);
          closestNotVisible.removeEventListener("animationend", _eventCb);
        }
      }
    };
    const _eventCb = (e) => {
      setTimeout(() => {
        if (e.target === elm) {
          if (__isVisible(elm)) {
            isSelfVisible = true;
            if (selfObserver && selfObserver.disconnect) {
              selfObserver.disconnect();
            }
            elm.removeEventListener("transitionend", _eventCb);
            elm.removeEventListener("animationstart", _eventCb);
            elm.removeEventListener("animationend", _eventCb);
          }
        } else if (e.target === closestNotVisible) {
          if (__isVisible(closestNotVisible)) {
            areParentsVisible = true;
            if (parentObserver && parentObserver.disconnect) {
              parentObserver.disconnect();
            }
            closestNotVisible.removeEventListener("transitionend", _eventCb);
            closestNotVisible.removeEventListener("animationstart", _eventCb);
            closestNotVisible.removeEventListener("animationend", _eventCb);
          }
        }
        _cb();
      });
    };
    if (!__isVisible(elm)) {
      selfObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "style" || mutation.attributeName === "class") {
            if (__isVisible(mutation.target)) {
              isSelfVisible = true;
              _cb();
              selfObserver.disconnect();
            }
          }
        });
      });
      selfObserver.observe(elm, { attributes: true });
      elm.addEventListener("animationstart", _eventCb);
      elm.addEventListener("animationend", _eventCb);
      elm.addEventListener("transitionend", _eventCb);
    } else {
      isSelfVisible = true;
    }
    closestNotVisible = __closestNotVisible(elm);
    if (closestNotVisible) {
      parentObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "style" || mutation.attributeName === "class") {
            if (__isVisible(mutation.target)) {
              areParentsVisible = true;
              _cb();
              parentObserver.disconnect();
            }
          }
        });
      });
      parentObserver.observe(closestNotVisible, { attributes: true });
      closestNotVisible.addEventListener("animationstart", _eventCb);
      closestNotVisible.addEventListener("animationend", _eventCb);
      closestNotVisible.addEventListener("transitionend", _eventCb);
    } else {
      areParentsVisible = true;
    }
    _cb();
  });
}
var whenVisible_default = whenVisible;
export {
  whenVisible_default as default
};
