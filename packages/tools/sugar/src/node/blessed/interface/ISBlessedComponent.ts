export interface ISBlessedComponentSettings {}

export interface ISBlessedComponentCtor {
  new (settings?: ISBlessedComponentSettings);
}

export default interface ISBlessedComponent {
  setFramerate(framerate: number): void;
  update(): void;
  isDisplayed(): boolean;
  isDestroyed(): boolean;
}
