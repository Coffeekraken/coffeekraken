import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
class SConfigAdapter {
  constructor(settings) {
    this._updatesTimeoutsStack = {};
    this._settings = __deepMerge(settings || {});
    if (settings.name && !/^[a-zA-Z0-9_\-:]+$/.test(settings.name)) {
      throw new Error(`The name of an SConfigAdapter instance can contain only letters like [a-zA-Z0-9_-:]...`);
    }
  }
  get configAdapterSettings() {
    return this._settings.configAdapter;
  }
  update(identifier) {
    clearTimeout(this._updatesTimeoutsStack[identifier]);
    this._updatesTimeoutsStack[identifier] = setTimeout(() => {
      if (!this._settings.onUpdate)
        return;
      this._settings.onUpdate();
    }, 50);
  }
  get name() {
    return this._settings.name;
  }
  set name(value) {
    if (!/^[a-zA-Z0-9_\-:]+$/.test(value)) {
      throw new Error(`The name of an SConfigAdapter instance can contain only letters like [a-zA-Z0-9_-:]...`);
    }
    this._settings.name = value;
  }
}
export {
  SConfigAdapter as default
};
