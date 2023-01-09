export interface ISDatetimeConfigI18n {
    previousMonth: string;
    nextMonth: string;
    months: string[12];
    weekdays: string[7];
    weekdaysShort: string[7];
}
export default function (api: any): {
    
    dateFormat: string;
    
    timeFormat: string;
    i18n: {
        
        previousMonth: string;
        
        nextMonth: string;
        
        months: string[];
        
        weekdays: string[];
        
        weekdaysShort: string[];
    };
};
