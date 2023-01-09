
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
        moreLink: string;
    } | {
        status: string;
        message?: undefined;
        example?: undefined;
        moreLink?: undefined;
    };
};
export default _default;
