import ISBlessedOutputComponent, {
  ISBlessedOutputComponentCtor,
  ISBlessedOutputComponentSettings
} from './ISBlessedOutputComponent';

export interface ISBlessedOutputSettings {
  stacks?: string[];
  mapTypesToStacks?: any;
}

export interface ISBlessedOutputMetas {
  width: number;
  spaceRight: number;
  time?: boolean;
  content?: string;
}
export interface ISBlessedOutputCtor {
  new (settings?: ISBlessedOutputSettings);
  registeredComponents: Object;
  registerComponent(
    component: ISBlessedOutputComponentCtor,
    settings?: ISBlessedOutputComponentSettings,
    as?: string
  ): void;
}

export default interface ISBlessedOutput {}
