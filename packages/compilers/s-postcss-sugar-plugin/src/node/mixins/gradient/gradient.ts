import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';

class postcssSugarPluginGradientInterface extends __SInterface {
  static definition = {
    start: {
      type: 'String',
      required: true,
      alias: 's'
    },
    end: {
      type: 'String',
      required: true,
      alias: 'e'
    },
    type: {
      type: 'String',
      values: ['linear', 'radial'],
      default: 'linear'
    },
    x: {
      type: 'String'
    },
    y: {
      type: 'String'
    },
    angle: {
      type: 'Number | String',
      default: 0
    },
    size: {
      type: 'String',
      default: 'farthest-side'
    }
  };
}

export interface IPostcssSugarPluginGradientParams {
  start: string;
  end: string;
  x: string;
  y: string;
  type: string | 'linear' | 'radial';
  angle: string | number;
  size: string;
}

export { postcssSugarPluginGradientInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginGradientParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginGradientParams = {
    start: '',
    end: '',
    x: '50%',
    y: '50%',
    type: 'linear',
    angle: 0,
    size: 'farthest-side',
    ...params
  };

  let startColorVar = finalParams.start,
    endColorVar = finalParams.end;

  const themeColorsObj = __theme().config('color');

  if (
    startColorVar.match(/^[a-zA-Z0-9:_-]+$/) &&
    themeColorsObj[startColorVar]
  ) {
    startColorVar = `sugar.color(${startColorVar})`;
  }
  if (endColorVar.match(/^[a-zA-Z0-9:_-]+$/) && themeColorsObj[endColorVar]) {
    endColorVar = `sugar.color(${endColorVar})`;
  }

  const angleVar = typeof finalParams.angle === 'number' ? `${finalParams.angle}deg` : finalParams.angle;

  let gradientCss = `background: linear-gradient(${angleVar}, ${startColorVar} 0%, ${endColorVar} 100%);`;

  if (finalParams.type === 'radial') {
    gradientCss = `background: radial-gradient(${finalParams.size} at ${finalParams.x} ${finalParams.y}, ${startColorVar} 0%, ${endColorVar} 100%);`;
  }
  const vars: string[] = [gradientCss];

  replaceWith(vars);
}
