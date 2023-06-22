export interface ISFrontendChecker {
    CATEGORY_ACCESSIBILITY: string;
    CATEGORY_SEO: string;
    CATEGORY_BEST_PRACTICES: string;
    CATEGORY_PERFORMANCE: string;
    CATEGORY_SOCIAL: string;
    CATEGORY_NICE_TO_HAVE: string;
    LEVEL_LOW: number;
    LEVEL_MEDIUM: number;
    LEVEL_HIGH: number;
    STATUS_SUCCESS: string;
    STATUS_WARNING: string;
    STATUS_ERROR: string;
}

export interface ISFrontendCheckerSettings {
    icons: Record<string, string>;
}

export interface ISFrontendCheckerCheckObj {
    id: string;
    name: string;
    description: string;
    level: number;
    check: Function;
    result?: ISFrontendCheckerCheckResult;
}

export interface ISFrontendCheckerCheckResultAction {
    label: string;
    handler: Function;
}

export interface ISFrontendCheckerCheckResult {
    status: 'success' | 'warning' | 'error';
    message?: string;
    example?: string;
    action?: ISFrontendCheckerCheckResultAction;
    moreLink?: string;
}

export interface ISFrontendCheckerCheckFn {
    ($context: HTMLElement): Promise<ISFrontendCheckerCheckResult>;
}
