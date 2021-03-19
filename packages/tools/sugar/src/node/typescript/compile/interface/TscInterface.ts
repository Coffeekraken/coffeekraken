// @ts-nocheck

import __typescript from 'typescript';
import __upperFirst from '../../../../shared/string/upperFirst';
import __SInterface from '../../../interface/SInterface';

const _definition = {};
__typescript.optionDeclarations.forEach((argObj) => {
  const argDefinition = {};
  if (argObj.type !== undefined && typeof argObj.type === 'string')
    argDefinition.type = __upperFirst(argObj.type);
  if (argObj.shortName !== undefined) argDefinition.alias = argObj.shortName;
  _definition[argObj.name] = argDefinition;
});

export default class TscInterface extends __SInterface {
  static definition = _definition;
}
