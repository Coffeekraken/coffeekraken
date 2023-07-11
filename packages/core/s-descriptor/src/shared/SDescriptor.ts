import SDescriptor from './_SDescriptor.js';
import maxRule from './rules/maxRule.js';
import minRule from './rules/minRule.js';
import requiredRule from './rules/requiredRule.js';
import typeRule from './rules/typeRule.js';

SDescriptor.registerRule(requiredRule);
SDescriptor.registerRule(typeRule);
SDescriptor.registerRule(minRule);
SDescriptor.registerRule(maxRule);

export * from './_SDescriptor.js';
export default SDescriptor;
