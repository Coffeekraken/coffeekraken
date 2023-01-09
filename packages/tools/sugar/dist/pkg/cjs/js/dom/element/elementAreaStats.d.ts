
export interface IAreaStatsResult {
    percentage: number;
    percentageX: number;
    percentageY: number;
    centerOffsetX: number;
    centerOffsetY: number;
    width: number;
    height: number;
    top: number;
    relTop: number;
    left: number;
    relLeft: number;
}
export interface IAreaStatsSettings {
    relativeTo?: HTMLElement | 'visible';
}
export default function __elementAreaStats($elm: HTMLElement, settings?: IAreaStatsSettings): IAreaStatsResult;
