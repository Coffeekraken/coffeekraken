import __SType from './_SType';
import './sTypeRegisterDefaultDescriptors';

// node specific types
import __fileTypeDescriptor from './descriptors/fileTypeDescriptor';

__SType.registerType(__fileTypeDescriptor);

export * from './_SType';
export default __SType;
