import SInterface from '../shared/SInterface.js';
import SInterfaceTerminalRenderer from './renderers/SInterfaceTerminalRenderer.js';

// register renderers
SInterface.registerRenderer(SInterfaceTerminalRenderer);

export * from '../shared/SInterface.js';
export default SInterface;
