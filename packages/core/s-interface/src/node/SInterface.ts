import SInterfaceGenerator from '../shared/SInterfaceGenerator';
import SInterfaceTerminalRenderer from './renderers/SInterfaceTerminalRenderer';
import __SDescriptor from '@coffeekraken/s-descriptor';

const SInterface = SInterfaceGenerator({
  __SDescriptor
});

// register renderers
SInterface.registerRenderer(SInterfaceTerminalRenderer);

export * from '../shared/SInterfaceGenerator';
export default SInterface;
