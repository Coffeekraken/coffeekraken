export default {
  id: 'classname',
  args: {
    classes: ''
  },
  helper: function classname({ classes, settings }) {
    if (
      !settings.scope ||
      typeof settings.scope !== 'string' ||
      settings.scope === ''
    )
      return classes;

    const processedClasses = classes
      .split(/\s+/)
      .map((cls) => {
        return `${settings.scope}${cls}`;
      })
      .join(' ');

    return processedClasses;
  }
};
