import __SInterface from '../../../interface/SInterface';
import __compileTsInterface from './compileTsInterface';

class SCompileTsProcessInterface extends __SInterface {
  static definition = {
    ...__compileTsInterface.definition
  };
}
export = SCompileTsProcessInterface;
