import __SValidator from '@coffeekraken/s-validator';
import __en from '../../dist/pkg/esm/shared/i18n/en';

export default async function () {
    return {
        en: __en,
        validatorsDefinition: __SValidator.getValidatorsDefinition(),
    };
}
