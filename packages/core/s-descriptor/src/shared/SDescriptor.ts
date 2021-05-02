import SDescriptor from './_SDescriptor';
import requiredRule from './rules/requiredRule';
import typeRule from './rules/typeRule';
import minRule from './rules/minRule';
import maxRule from './rules/maxRule';

SDescriptor.registerRule(requiredRule);
SDescriptor.registerRule(typeRule);
SDescriptor.registerRule(minRule);
SDescriptor.registerRule(maxRule);

export * from './_SDescriptor';
export default SDescriptor;
