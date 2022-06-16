import maxRule from './rules/maxRule';
import minRule from './rules/minRule';
import requiredRule from './rules/requiredRule';
import typeRule from './rules/typeRule';
import SDescriptor from './_SDescriptor';

SDescriptor.registerRule(requiredRule);
SDescriptor.registerRule(typeRule);
SDescriptor.registerRule(minRule);
SDescriptor.registerRule(maxRule);

export * from './_SDescriptor';
export default SDescriptor;
