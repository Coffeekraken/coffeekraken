import ISBlessedOutputComponent, {
  ISBlessedOutputComponentSettings
} from './ISBlessedOutputComponent';

export interface ISBlessedOutputSettings {}

export interface ISBlessedOutputCtor {
  new (settings?: ISBlessedOutputSettings);
  registeredComponents: Object;
  registerComponent(
    component: ISBlessedOutputComponent,
    settings?: ISBlessedOutputComponentSettings,
    as?: string
  ): void;
}

export default interface ISBlessedOutput {}
