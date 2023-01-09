
declare const _default: {
    id: string;
    name: string;
    description: string;
    level: number;
    check({ $context }: {
        $context: any;
    }): {
        status: string;
        message: any;
        example: string;
        moreLink: any;
        action: {
            label: () => string;
            handler: () => void;
        };
    } | {
        status: string;
        message?: undefined;
        example?: undefined;
        moreLink?: undefined;
        action?: undefined;
    };
};
export default _default;
