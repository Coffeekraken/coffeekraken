import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';

class postcssSugarPluginGradientLinearInterface extends __SInterface {
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
    x: {
      type: 'String'
    },
    y: {
      type: 'String'
    },
    angle: {
      type: 'Number | String',
      default: 0
    }
  };
}

export interface IPostcssSugarPluginGradientParams {
  start: string;
  end: string;
  x: string;
  y: string;
  angle: string | number;
}

export { postcssSugarPluginGradientLinearInterface as interface };

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
    angle: 0,
    ...params
  };

  const vars: string[] = [`
    @sugar.gradient($type: linear, $start: ${finalParams.start}, $end: ${finalParams.end}, $x: ${finalParams.x}, $y: ${finalParams.y}, $angle: ${finalParams.angle});
  `];

  replaceWith(vars);
}
