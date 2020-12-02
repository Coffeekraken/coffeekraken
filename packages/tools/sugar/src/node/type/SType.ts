import __SType from './_SType';
import './sTypeRegisterDefaultDescriptors';

// node specific types
import __fileTypeDescriptor from './descriptors/fileTypeDescriptor';

__SType.registerType(__fileTypeDescriptor);

export = __SType;
