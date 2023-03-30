
export interface II18nSettings {
    id: string;
    tokens: Record<string, string | number>;
}
export default function __i18n(str: string, settings?: Partial<II18nSettings>): string;
