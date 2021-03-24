export interface ITreatAsValueSettings {
  during?: number;
}

export interface ITreatAsValueProxy extends ProxyConstructor {
  restorePromiseBehavior: Function;
}

export default interface ITreatAsValue {
  (promise: any, settings?: ITreatAsValueSettings): ITreatAsValueProxy;
}
