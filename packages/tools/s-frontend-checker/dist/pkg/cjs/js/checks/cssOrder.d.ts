
declare const _default: {
    id: string;
    name: string;
    description: string;
    level: number;
    check({ $context }: {
        $context: any;
    }): {
        status: string;
        message?: undefined;
        example?: undefined;
        moreLink?: undefined;
    } | {
        status: string;
        message: string;
        example: string;
        moreLink: string;
    };
};
export default _default;
