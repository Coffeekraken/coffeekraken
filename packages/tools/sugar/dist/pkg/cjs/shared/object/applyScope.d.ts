
export interface IApplyScopeSettings {
    deep: boolean;
    clone: boolean;
}
export default function __applyScope(object: Record<string, any>, scopes: string[], settings?: Partial<IApplyScopeSettings>): Record<string, any>;
