
interface ISugarBannerSettings {
    version?: string;
    borders?: boolean;
    marginLeft: number;
    paddingTop: number;
    paddingBottom: number;
}
export default function __sugarBanner(settings?: Partial<ISugarBannerSettings>): string;
export {};
