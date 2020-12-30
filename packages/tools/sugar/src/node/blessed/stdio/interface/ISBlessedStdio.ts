import ISBlessedStdioComponent, {
  ISBlessedStdioComponentCtor,
  ISBlessedStdioComponentSettings
} from './ISBlessedStdioComponent';

export interface ISBlessedStdioSettings {
  stacks?: string[];
  mapTypesToStacks?: any;
}

export interface ISBlessedStdioMetas {
  width: number;
  spaceRight: number;
  time?: boolean;
  content?: string;
}
export interface ISBlessedStdioCtor {
  new (sources: any[], handlerInstance: any, settings?: ISBlessedStdioSettings);
  registeredComponents: Object;
  registerComponent(
    component: ISBlessedStdioComponentCtor,
    settings?: ISBlessedStdioComponentSettings,
    as?: string
  ): void;
}

export default interface ISBlessedStdio {
  _handlerInstance: any;
}
