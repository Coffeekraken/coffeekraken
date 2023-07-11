import SDescriptor from '../shared/SDescriptor.js';
import SDescriptorResult from '../shared/SDescriptorResult.js';

import pathRule from './rules/pathRule.js';
SDescriptor.registerRule(pathRule);

export * from '../shared/SDescriptor.js';
export * from '../shared/SDescriptorResult.js';

export { SDescriptorResult };
export default SDescriptor;
