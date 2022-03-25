import __deepMerge from "../../../shared/object/deepMerge";
import __parseHtml from "../../../shared/console/parseHtml";
import __SBlessedComponent from "../SBlessedComponent";
const _SBlessedNotification = class extends __SBlessedComponent {
  static update() {
    let top = 1, bottom = 1;
    const left = 2;
    const right = 2;
    _SBlessedNotification.displayStacks.tl.forEach(($notif) => {
      $notif.top = top;
      $notif.left = left;
      top += $notif.height + 1;
    });
    top = 1;
    _SBlessedNotification.displayStacks.tr.forEach(($notif) => {
      $notif.top = top;
      $notif.right = right;
      top += $notif.height + 1;
    });
    _SBlessedNotification.displayStacks.bl.forEach(($notif) => {
      $notif.bottom = bottom;
      $notif.left = left;
      bottom += $notif.height + 1;
    });
    bottom = 1;
    _SBlessedNotification.displayStacks.br.forEach(($notif) => {
      $notif.bottom = bottom;
      $notif.right = right;
      bottom += $notif.height + 1;
    });
  }
  constructor(title, body, settings = {}) {
    settings = __deepMerge({
      onClick: null,
      onTimeout: null,
      position: "tr",
      timeout: 5e3,
      type: "default",
      blessed: {
        style: {
          bg: "cyan",
          fg: "white"
        }
      }
    }, settings);
    switch (settings.type) {
      case "success":
        settings.blessed.style.bg = "green";
        settings.blessed.style.fg = "white";
        break;
      case "warning":
        settings.blessed.style.bg = "yellow";
        settings.blessed.style.fg = "black";
        break;
      case "error":
      case "kill":
      case "killed":
        settings.blessed.style.bg = "red";
        settings.blessed.style.fg = "white";
        break;
    }
    const position = settings.position;
    delete settings.position;
    super(__deepMerge({
      blessed: {
        width: 30,
        height: 4,
        style: {
          bg: settings.blessed.style.bg,
          fg: settings.blessed.style.fg
        },
        padding: {
          top: 1,
          left: 2,
          right: 2,
          bottom: 0
        },
        clickable: settings.onClick !== null,
        content: __parseHtml([`<bold>${title}</bold>`, `${body}`, ""].join("\n"))
      }
    }, settings.blessed));
    this.on("attach", () => {
      const stack = _SBlessedNotification.displayStacks[position];
      if (stack.indexOf(this) === -1) {
        stack.push(this);
      }
    });
    this.on("detach", () => {
      const stack = _SBlessedNotification.displayStacks[position];
      const idx = stack.indexOf(this);
      if (idx === -1)
        return;
      stack.splice(idx, 1);
      _SBlessedNotification.update();
    });
    if (settings.onClick) {
      this.on("click", () => {
        settings.onClick();
        this.destroy();
      });
    }
    if (settings.timeout !== -1) {
      setTimeout(() => {
        if (this.isDestroyed())
          return;
        settings.onTimeout && settings.onTimeout();
        this.destroy();
      }, settings.timeout);
    }
  }
  update() {
    _SBlessedNotification.update();
    super.update();
  }
};
let SBlessedNotification = _SBlessedNotification;
SBlessedNotification.displayStacks = {
  tl: [],
  tr: [],
  bl: [],
  br: []
};
export {
  SBlessedNotification as default
};
