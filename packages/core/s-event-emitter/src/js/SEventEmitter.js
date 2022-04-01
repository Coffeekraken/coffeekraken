import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __SEventEmitterBase from "../shared/SEventEmitter";
export * from "../shared/SEventEmitter";
class SEventEmitter extends __SEventEmitterBase {
}
export {
  SEventEmitter as default
};
