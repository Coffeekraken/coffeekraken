import type { ISDurationObject } from '@coffeekraken/s-duration';

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

export interface ISFrontendCheckerCheckResult {
    score: number;
    duration: ISDurationObject;
    checks: Record<string, ISFrontendCheckerCheckObj>;
}

export interface ISFrontendCheckerCheckParams {
    $context: HTMLElement | Document;
    includeLazy: boolean;
}

export interface ISFrontendCheckerCheckObj {
    id: string;
    name: string;
    description: string;
    level: number;
    check: Function;
    lazy: boolean;
    logs?: string[];
    result?: ISFrontendCheckerCheckResult;
    duration?: ISDurationObject;
    isChecking: boolean;
}

export interface ISFrontendCheckerCheckResultAction {
    label: string;
    handler: Function;
}

export interface ISFrontendCheckerCheckCheckResult {
    status: 'success' | 'warning' | 'error';
    message?: string;
    example?: string;
    action?: ISFrontendCheckerCheckResultAction;
    moreLink?: string;
}

export interface ISFrontendCheckerCheckFn {
    ($context: HTMLElement): Promise<ISFrontendCheckerCheckResult>;
}

export type TSFrontendCheckerCheckAriaColotContrastLevels = 'A' | 'AA' | 'AAA';

export interface ISFrontendCheckerCheckAriaColotContrastSettings {
    level: 'A' | 'AA' | 'AAA';
    ratios: Record<TSFrontendCheckerCheckAriaColotContrastLevels, number>;
    colors: Record<TSFrontendCheckerCheckAriaColotContrastLevels, string>;
}
