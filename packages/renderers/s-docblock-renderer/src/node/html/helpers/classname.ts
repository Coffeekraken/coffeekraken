import __SSugarConfig from '@coffeekraken/s-sugar-config';

export default {
  id: 'classname',
  args: {
    classes: ''
  },
  process: function classname({ classes, settings }) {

    settings = {
      classPrefix: __SSugarConfig.get('docblockRenderer.html.classPrefix'),
      ...(settings ?? {})
    };

    if (
      !settings.classPrefix ||
      typeof settings.classPrefix !== 'string' ||
      settings.classPrefix === ''
    )
      return classes;

    const processedClasses = classes
      .split(/\s+/)
      .map((cls) => {
        return `${settings.classPrefix}${cls}`;
      })
      .join(' ');

    return processedClasses;
  }
};
