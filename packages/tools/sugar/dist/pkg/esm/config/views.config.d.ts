export default function ({ env, config }: {
    env: any;
    config: any;
}): {
    layouts: {
        main: {
            name: string;
            viewPath: {
                twig: string;
                blade: any;
            };
        };
    };
    rootDirs: {
        twig: string[];
        blade: string[];
    };
};
