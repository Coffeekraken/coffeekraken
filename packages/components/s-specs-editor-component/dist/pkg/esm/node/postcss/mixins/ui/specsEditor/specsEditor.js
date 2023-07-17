import __SInterface from '@coffeekraken/s-interface';
class postcssUiSpecsEditorInterface extends __SInterface {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf'],
                default: ['bare', 'lnf'],
            },
        };
    }
}
export { postcssUiSpecsEditorInterface as interface };
/**
 * @name          specsEditor
 * @namespace     ui.specsEditor
 * @type               PostcssMixin
 * @platform      css
 * @status        beta
 * @private
 *
 * Apply the slider style to any s-slider element
 *
 * @snippet         @sugar.ui.specsEditor($1);
 *
 * @example     css
 * .s-slider {
 *    @sugar.ui.specsEditor;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, sharedData, replaceWith, }) {
    const finalParams = Object.assign({ scope: ['bare', 'lnf'] }, params);
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
    

    `);
    }
    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`

        .s-specs-editor_child {
            border-left: sugar.margin(10) solid sugar.color(complementary, --alpha 0.5);
        
            &:has(+ .s-specs-editor_child) .s-specs-editor_child-metas {
                border-bottom: 1px solid sugar.color(main, --alpha 0.1);
            }
        
            .s-specs-editor_child {
                border-left: sugar.margin(10) solid
                    sugar.color(complementary, --alpha 0.05);
            }
        }

        .s-specs-editor_child-metas {}

        .s-specs-editor_child-heading {
            gap: sugar.margin(20);
            padding-inline: var(--s-specs-editor-padding-inline);
            padding-block: var(--s-specs-editor-padding-block);
        }
        
        .s-specs-editor_child-toggle {
            
            &,
            * {
                @sugar.transition fast;
            }
        
            &:hover {
                background: sugar.color(complementary, --alpha 0.05);
            }
            &.active {
                background: sugar.color(complementary, --alpha 0.5);
        
                &:not(.s-specs-editor_child-prop .s-specs-editor_child-toggle),
                *:not(.s-specs-editor_child-prop .s-specs-editor_child-toggle *) {
                    color: sugar.color(complementary, foreground) !important;
                }
            }
        }
        .s-specs-editor_child-prop .s-specs-editor_child-toggle.active {}
        
        .s-specs-editor_child-title {
            font-size: sugar.font.size(40);
        
            &:not(
                    .s-specs-editor_child
                        .s-specs-editor_child
                        .s-specs-editor_child-title
                ) {
                color: sugar.color(accent);
            }
        }
        .s-specs-editor_child-media {}
        .s-specs-editor_child-description {
            padding-block-end: sugar.padding(30);
            color: sugar.color(main, text, --alpha 0.4);
        }
        
        .s-specs-editor_child-prop {}

        .copy-btn {
            @sugar.ui.button ($lnf: text);
        
            ._pending {
            }
            ._success {
                i {
                    color: sugar.color(success);
                }
            }
        
            &.success {}
        }
        
        .s-specs-editor_error {
            padding: sugar.padding(30);
            border: 1px solid sugar.color(error, border);
            background: sugar.color(error, --lighten 48);
            color: sugar.color(error);
            margin-block-start: sugar.margin(20);
            @sugar.border.radius;
        }

        .inline-input {
            margin-block-start: sugar.margin(30);
        
            ._label {
                width: 33%;
                white-space: nowrap;
                text-elipsis: elipsis;
                padding: sugar.padding(20) 0;
                opacity: 0.5;
            }
        
            &:has(input[type='checkbox']) {
                ._label {
                    width: auto;
                    flex-grow: 1;
                }
            }
        
            ._required {
                color: sugar.color(error);
            }
        
            ._input[type='text'] {
                @sugar.ui.input();
            }
            ._input[type='checkbox'] {
                @sugar.ui.switch();
                @sugar.color (accent);
            }
        }

        .s-specs-editor_label {
            margin-block-end: sugar.margin(20);
        
            > span {
            }
        
            ._title {
                opacity: 0.5;
            }
        
            ._required {
                color: sugar.color(error);
            }
        
            ._help-icon {
                margin-inline-start: sugar.margin(10);
        
                .s-tooltip {
                    min-width: 200px;
                }
            }
        
            i {
                opacity: 0.4;
                @sugar.transition (fast);
        
                &:hover {
                    opacity: 0.8;
                }
            }
        }
        
        .s-specs-editor_media-icons {
            border-right: 1px solid sugar.color(main, border);
            padding-inline-end: sugar.padding(20);
            margin-inline-end: sugar.margin(20);
        }
        .s-specs-editor_media-icon {
            padding-inline: sugar.padding(10);
        
            i {
                opacity: 0.3;
            }
        
            &.active {
                position: relative;
        
                &:after {
                    background: sugar.color(accent);
                    border-radius: 50%;
                }
            }
        
            &:hover i,
            &.current i {
                opacity: 1;
            }
        }
        
        .s-specs-editor_metas {
            border-bottom: 1px solid sugar.color(main, border);
            background: sugar.color(main, background);
        
            &:has(&-source) {
                border-bottom: none;
            }
        
            &-heading {
                padding-inline: var(--s-specs-editor-padding-inline);
                padding-block: sugar.padding(30);
                @sugar.transition;
        
                * {
                    @sugar.transition;
                    opacity: 1;
                }
                ._title {
                }
        
                ._actions {
                    gap: sugar.margin(10);
        
                    ._action {
                    }
                    ._action-save {
                        @sugar.ui.button();
                        @sugar.color (complementary);
        
                        i {
                            color: sugar.color(complementary, foreground);
                        }
        
                        &.success {
                            @sugar.color (success);
                        }
        
                        &.error {
                            @sugar.color (error);
                        }
                    }
                    ._action-delete {
                        @sugar.ui.button ($lnf: text);
                    }
                }
            }
        
            &-source {
                padding-inline: var(--s-specs-editor-padding-inline);
                padding-block: sugar.padding(20);
                background: sugar.color(accent, --alpha 0.2);
                @sugar.transition;
        
                ._text {
                }
                ._link {
                    font-weight: bold;
                    color: sugar.color(accent);
                }
            }
        }
        
        .s-specs-editor_prop {
            padding-inline: var(--s-specs-editor-padding-inline);
        
            .s-specs-editor_prop {
                padding-inline: 0;
            }
        
            &:has(> .s-specs-editor_repeatable) {
                padding: 0;
            }
        
            &:has(> div) {
                padding-block: var(--s-specs-editor-padding-block);
            }
        
            .s-specs-editor_child & {
            }
        }
        
        .s-specs-editor_repeatable {
            
            > .s-label {
                padding-inline: var(--s-specs-editor-padding-inline);
                padding-block-start: var(--s-specs-editor-padding-block);
            }
        }
        
        .s-specs-editor_repeatable-item {
            @sugar.transition;
        
            &.sorting {
                opacity: 0.3;
            }
        
            &.sorted {
                background: sugar.color(complementary, --alpha 0.1);
            }
        }
        
        .s-specs-editor_repeatable-drop {
            background: sugar.color(complementary, --alpha 0.1);
            @sugar.transition fast;
        
            &:after {
                @sugar.transition fast;
            }
        
            &:has(+ .s-specs-editor_repeatable-item.sorting),
            .s-specs-editor_repeatable-item.sorting + & {
            }
        
            .s-specs-editor_repeatable.sort > & {
                height: sugar.margin(10);
        
                &:after {
                    height: sugar.margin(50);
                }
                &.sort-over {
                    background: sugar.color(complementary, --alpha 0.3);
                    height: sugar.margin(50);
        
                    &:after {
                        height: sugar.margin(100);
                    }
                }
            }
        }
        
        .s-specs-editor_repeatable-title {
            gap: sugar.margin(20);
            background: sugar.color(accent, --alpha 0.05);
            padding: sugar.padding(20) var(--s-specs-editor-padding-inline);
            border-top: 1px solid sugar.color(accent, --alpha 0.2);
        
            &,
            * {
                @sugar.transition (fast);
            }
        
            > span {
            }
        
            &.active,
            &:hover {
                background: sugar.color(accent, --alpha 0.05);
            }
        
            &.active,
            &:has(
                    + .s-specs-editor_repeatable-body
                        + .s-specs-editor_repeatable-actions:last-child
                ) {
                border-bottom: 1px solid sugar.color(accent, --alpha 0.2);
            }
        
            ._reorder {
                @sugar.ui.button ( $lnf: text);
                box-shadow: none !important;
            }
        
            ._remove {
                @sugar.ui.button ($lnf: text);
                @sugar.color (error);
                @sugar.scale (0.9);
            }
            &:hover ._remove {
            }
        }
        
        .s-specs-editor_repeatable-empty {
            padding-inline: var(--s-specs-editor-padding-inline);
            padding-block: sugar.padding(10);
            gap: sugar.margin(30);
        
            i {
                opacity: 0.1;
                font-size: sugar.font.size(100);
            }
        
            ._text {
                @sugar.typo p;
                @sugar.font.size (25);
                opacity: 0.5;
            }
        }
        
        .s-specs-editor_repeatable-body {
            border-left: sugar.margin(10) solid sugar.color(accent, --alpha 0.05);
        }
        .s-specs-editor_repeatable-body.active {
        }
        
        .s-specs-editor_repeatable-item-actions {
            text-align: end;
        }
        
        .s-specs-editor_repeatable-item-props {
        }
        
        .s-specs-editor_repeatable-actions {
            padding-inline: var(--s-specs-editor-padding-inline);
            padding-block: var(--s-specs-editor-padding-block);
            text-align: end;
        
            ._add {
                @sugar.ui.button ($lnf: outline);
                @sugar.color (accent);
        
                i {
                    color: currentColor;
                    margin: 0;
                }
            }
        }

        .s-specs-editor_warning {
            padding: sugar.padding(30);
            border: 1px solid sugar.color(warning, --lighten 35);
            background: sugar.color(warning, --lighten 45);
            color: sugar.color(warning, --darken 10);
            @sugar.border.radius;
        }
        
        .s-specs-editor_widget {
            @sugar.transition fast;
        
            &:has(._override) {
            }
        
            ._override {
                padding-inline: var(--s-specs-editor-padding-inline);
                background: sugar.color(main, surface, --alpha 0.7);
                border-top: 1px solid sugar.color(main, --alpha 0.05);
                border-bottom: 1px solid sugar.color(main, --alpha 0.05);
            }
        
            ._override-btn {
                @sugar.ui.button();
                @sugar.color (accent);
            }
        }
        
        .s-specs-editor_checkbox-widget {
            margin-block-start: sugar.margin(30);
        
            .s-specs-editor_label {
                margin-block-end: sugar.margin(30);
        
                > span {
                }
        
                ._option {
                    font-size: sugar.font.size(30);
                    opacity: 0.5;
                }
            }
        }

        .s-specs-editor_color-picker-widget {
            s-color-picker {
            }
        
            ._color-preview {
                height: calc(100% - sugar.margin(20) * 2);
                right: sugar.margin(20);
                transform: translate(0, -50%);
                border: 1px solid sugar.color(main, border);
                @sugar.border.radius;
                @sugar.depth (20);
            }
        }

        .s-specs-editor_image-widget {
            .s-dropzone {
                color: sugar.color(main, text, --alpha 0.3);
                padding: sugar.padding(30);
            }
        
            ._drop {
                @sugar.ui.input;
            }
        
            ._name {
                padding-inline: sugar.padding(20);
                line-height: 1.1;
                color: sugar.color(main, text, --alpha 0.5);
                overflow: hidden;
                text-overflow: ellipsis;
            }
        
            ._image {
            }
        
            ._preview {
                img {
                }
            }
        
            ._spacer {
            }
        
            ._actions {
            }
        
            ._delete {
                @sugar.ui.button ($lnf: text);
            }
        }
        
        .s-specs-editor_layout-widget {
            ._layout {
                gap: sugar.margin(10);
            }
        
            ._same-as-default {
                text-align: center;
                color: sugar.color(main, text, --alpha 0.3);
                padding: sugar.padding(20);
            }
        
            .custom-select {
                margin-block-end: sugar.margin(30);
            }
        
            .custom-select_item {
                ._same-as-default {
                    border: 1px solid sugar.color(main, border);
                    @sugar.border.radius;
                }
            }
        
            .custom-select_item:hover {
                background: sugar.color(accent, surface);
        
                ._same-as-default {
                    background-color: sugar.color(main, background);
                    border-color: sugar.color(main, background);
                    color: sugar.color(accent, surface);
                }
        
                ._area {
                    background: sugar.color(accent, foreground);
                    color: sugar.color(accent, surface);
                }
            }
        
            ._area {
                height: 40px;
                background: sugar.color(main, --alpha 0.2);
                font-size: sugar.font.size(50);
                color: sugar.color(main, foreground);
                @sugar.border.radius;
            }
        
            .custom-select_item.active,
            .custom-select_value {
                ._area {
                    background: sugar.color(accent, --alpha 0.3);
                    color: sugar.color(accent, foreground);
                }
            }
        }
        
        .custom-select {
            @sugar.ui.input;
            --padding-inline: sugar.padding(ui.form.paddingInline);
            background-repeat: no-repeat;
            background-image: linear-gradient(
                    45deg,
                    transparent 50%,
                    sugar.color(current) 50%
                ),
                linear-gradient(135deg, sugar.color(current) 50%, transparent 50%);
            background-position: right calc(var(--padding-inline) + 5px) top 50%,
                right var(--padding-inline) top 50%;
            background-size: sugar.scalable(5px) sugar.scalable(5px),
                sugar.scalable(5px) sugar.scalable(5px);
        
            &:focus,
            &:focus-within {
                .custom-select_dropdown {
                    opacity: 1;
                    pointer-events: all;
                    transform: translateY(0);
                }
            }
        
            .custom-select_dropdown {
                background: sugar.color(main, background);
                opacity: 0;
                transform: translateY(calc(sugar.margin(30) * -1));
                @sugar.transition;
            }
        }
        .custom-select_value {
            padding-inline-end: sugar.padding(20);
        }
        .custom-select_dropdown {
            max-height: 70vh;
            @sugar.scrollbar();
            @sugar.depth (100);
        }
        .custom-select_item {
            padding: sugar.margin(30);
        
            &:hover {
                background: sugar.color(main, surface);
            }
        }

        .s-specs-editor_spaces-widget {
            .s-label {
                margin-block-end: sugar.margin(30);
            }
        }
        
        .s-specs-editor_switch-widget {
            gap: sugar.margin(20);
        
            .s-label {
                margin-block-end: 0;
            }
        
            .s-specs-editor_switch {
                @sugar.color (accent);
            }
        }
        
        .s-specs-editor_video-widget {
            .s-dropzone {
                color: sugar.color(main, text, --alpha 0.3);
                padding: sugar.padding(30);
            }
        
            ._format {
                @sugar.ui.badge;
                @sugar.color (accent);
            }
        
            ._drop {
                @sugar.ui.input;
            }
        
            ._name {
                padding-inline: sugar.padding(20);
                line-height: 1.1;
                color: sugar.color(main, text, --alpha 0.5);
            }
        
            ._videos {
            }
        
            ._video {
                gap: sugar.margin(20);
        
                &:nth-child(even) {
                    background: sugar.color(main, surface);
                }
            }
        
            ._preview {
                video {
                    width: 5em;
                    height: 5em;
                }
            }
        
            ._spacer {
            }
        
            ._delete {
                @sugar.ui.button ($lnf: text);
            }
        }
        
        


        `);
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sNkJBQThCLFNBQVEsWUFBWTtJQUNwRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztnQkFDdkIsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQzthQUMzQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNRCxPQUFPLEVBQUUsNkJBQTZCLElBQUksU0FBUyxFQUFFLENBQUM7QUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQ25CLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE9BQU87SUFDUCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7OztLQUdiLENBQUMsQ0FBQztLQUNGO0lBRUQsTUFBTTtJQUNOLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FncEJULENBQUMsQ0FBQztLQUNOO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9