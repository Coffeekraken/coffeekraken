export default function (api) {
    if (api.env.platform !== 'node') return;
    return {
        defaultRecipe: 'generic',

        exclude: [],

        recipes: {
            /**
             * @name            generic
             * @namespace       config.kitchen.recipes
             * @type            String
             * @default         [config.kitchenRecipeGeneric]
             *
             * Specify the default recipe
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get generic() {
                return api.config.kitchenRecipeGeneric;
            },

            /**
             * @name            nextJs12
             * @namespace       config.kitchen.recipes
             * @type            String
             * @default         [config.kitchenRecipeNextJs12]
             *
             * Specify the next.js recipe
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get nextJs12() {
                return api.config.kitchenRecipeNextJs12;
            },
        },

        get actions() {
            return api.config.kitchenActions;
        },
    };
}
