
declare const _default: {
    id: string;
    name: string;
    description: string;
    level: number;
    check({ $context }: {
        $context: any;
    }): Promise<{
        status: string;
        message: string;
        action: {
            label: () => string;
            handler: () => void;
        };
    } | {
        status: string;
        message?: undefined;
        action?: undefined;
    }>;
};
export default _default;
