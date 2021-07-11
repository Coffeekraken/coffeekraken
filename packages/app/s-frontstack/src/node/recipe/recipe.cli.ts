import __SProcess from '@coffeekraken/s-process';
import __SFrontstack from '../SFrontstack';
import __SFrontstackRecipeParamsInterface from './interface/SFrontstackRecipeParamsInterface';

export default async function action(stringArgs = '') {
  const frontstack = new __SFrontstack();
  const pro = await __SProcess.from(frontstack.recipe.bind(frontstack), {
    process: {
      interface: __SFrontstackRecipeParamsInterface
    }
  });
  pro.run(stringArgs);
}
