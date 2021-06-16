import __SProcess from '@coffeekraken/s-process';
import __SFrontstack from '../SFrontstack';
import __SFrontstackRecipeParamsInterface from './interface/SFrontstackRecipeParamsInterface';

export default function action(stringArgs = '') {
  const frontstack = new __SFrontstack();
  const pro = __SProcess.from(frontstack.recipe.bind(frontstack), {
    process: {
      interface: __SFrontstackRecipeParamsInterface
    }
  });
  pro.run(stringArgs);
}
