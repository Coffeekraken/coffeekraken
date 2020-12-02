// @shared

import __SType from './_SType';
import __stringTypeDescriptor from './descriptors/stringTypeDescriptor';
import __mapTypeDescriptor from './descriptors/mapTypeDescriptor';
import __objectTypeDescriptor from './descriptors/objectTypeDescriptor';
import __arrayTypeDescriptor from './descriptors/arrayTypeDescriptor';
import __integerTypeDescriptor from './descriptors/integerTypeDescriptor';
import __numberTypeDescriptor from './descriptors/numberTypeDescriptor';
import __booleanTypeDescriptor from './descriptors/booleanTypeDescriptor';
import __undefinedTypeDescriptor from './descriptors/undefinedTypeDescriptor';
import __nullTypeDescriptor from './descriptors/nullTypeDescriptor';
import __symbolTypeDescriptor from './descriptors/symbolTypeDescriptor';
import __bigintTypeDescriptor from './descriptors/bigintTypeDescriptor';
import __dateTypeDescriptor from './descriptors/dateTypeDescriptor';
import __functionTypeDescriptor from './descriptors/functionTypeDescriptor';
import __weakmapTypeDescriptor from './descriptors/weakmapTypeDescriptor';
import __weaksetTypeDescriptor from './descriptors/weaksetTypeDescriptor';
import __setTypeDescriptor from './descriptors/setTypeDescriptor';
import __classTypeDescriptor from './descriptors/classTypeDescriptor';

__SType.registerType(__stringTypeDescriptor);
__SType.registerType(__mapTypeDescriptor);
__SType.registerType(__objectTypeDescriptor);
__SType.registerType(__arrayTypeDescriptor);
__SType.registerType(__integerTypeDescriptor);
__SType.registerType(__numberTypeDescriptor);
__SType.registerType(__booleanTypeDescriptor);
__SType.registerType(__undefinedTypeDescriptor);
__SType.registerType(__nullTypeDescriptor);
__SType.registerType(__symbolTypeDescriptor);
__SType.registerType(__bigintTypeDescriptor);
__SType.registerType(__dateTypeDescriptor);
__SType.registerType(__functionTypeDescriptor);
__SType.registerType(__weakmapTypeDescriptor);
__SType.registerType(__weaksetTypeDescriptor);
__SType.registerType(__setTypeDescriptor);
__SType.registerType(__classTypeDescriptor);

export = __SType;
