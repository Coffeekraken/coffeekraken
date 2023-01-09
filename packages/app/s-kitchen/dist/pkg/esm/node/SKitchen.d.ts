import __SClass from '@coffeekraken/s-class';
import type { ISLogAsk } from '@coffeekraken/s-log';
import { ISProcessManagerProcessSettings, ISProcessSettings } from '@coffeekraken/s-process';
import type { IDetectProjectTypeResult } from '@coffeekraken/sugar/project';
export interface ISKitchenSettings {
}
export interface ISKitchenNewParams {
}
export interface ISKitchenRecipesettings {
    process: Partial<ISProcessSettings>;
    processManager: Partial<ISProcessManagerProcessSettings>;
}
export interface ISKitchenIngredientContext {
    recipe?: string;
    projectType: IDetectProjectTypeResult;
    new: boolean;
}
export interface ISKitchenIngredientAddApi {
    ask(askObj: ISLogAsk): Promise<any>;
    log(message: string): void;
    emit(type: 'log' | 'ask', what: any): void;
    pipe: Function;
    context: ISKitchenIngredientContext;
}
export interface ISKitchenIngredient {
    id: string;
    description: string;
    projectTypes: string[];
    add(api: ISKitchenIngredientAddApi): Promise<any>;
}
export interface ISKitchenAction {
    id: string;
    title: string;
    description: string;
    params: any;
    command: string;
    process: string;
    settings: Partial<ISKitchenRecipesettings>;
    [key: string]: any;
}
export interface ISKitchenActionWrapper {
    action: ISKitchenAction;
    params: any;
    [key: string]: any;
}
export interface ISKitchenRecipeRequirements {
    commands: string[];
}
export interface ISKitchenRecipeStack {
    description: string;
    sharedParams: any;
    runInParallel: boolean;
    actions: Record<string, ISKitchenAction> | Record<string, ISKitchenActionWrapper>;
}
export interface ISKitchenRecipe {
    id: string;
    title: string;
    description: string;
    requirements?: ISKitchenRecipeRequirements;
    defaultStack: string;
    stacks: Record<string, ISKitchenRecipeStack>;
}
export interface ISKitchenAddParams {
    ingredients: ('frontspec' | 'manifest' | 'favicon' | 'postcss' | 'sugarJson' | 'toolkit')[];
}
export interface ISKitchenActionParams {
    action: string;
    params: string;
}
export interface ISKitchenRecipeParams {
    recipe: string;
    stack: string;
    exclude: string[];
}
export interface ISKitchenRunParams {
    recipe: string;
    action: string;
    stack: string;
}
export interface ISKitchenListParams {
    recipe: string;
    ingredients: boolean;
}
declare class SKitchen extends __SClass {
    
    static _registeredIngredients: Record<string, ISKitchenIngredient>;
    
    static registerIngredient(ingredientObj: ISKitchenIngredient): void;
    
    constructor(settings?: Partial<ISKitchenSettings>);
    
    new(params: ISKitchenNewParams | string): any;
    
    run(params: Partial<ISKitchenRunParams> | string): any;
    
    listRecipes(): Record<string, ISKitchenRecipe>;
    
    list(params: ISKitchenListParams | string): Promise<any>;
    
    add(params: ISKitchenListParams | string): Promise<any>;
}
export default SKitchen;
