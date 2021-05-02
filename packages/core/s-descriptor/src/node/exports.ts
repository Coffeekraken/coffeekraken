import SDescriptor from '../shared/SDescriptor';
import SDescriptorResult from '../shared/SDescriptorResult';

import pathRule from './rules/pathRule';
SDescriptor.registerRule(pathRule);

export * from '../shared/SDescriptorResult';
export * from '../shared/SDescriptor';

export { SDescriptorResult };
export default SDescriptor;
