"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssUiSpecsEditorInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssUiSpecsEditorInterface;
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
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 * @scope       behavior        Behavior css
 *
 * @snippet         @s.ui.specsEditor($1);
 *
 * @example     css
 * .s-slider {
 *    @s.ui.specsEditor;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, sharedData, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    // bare
    // lnf
    vars.push(`@s.scope 'lnf' {`);
    vars.push(`

        .s-specs-editor_child {
            border-left: s.margin(10) solid s.color(complementary, --alpha 0.5);
        
            &:has(+ .s-specs-editor_child) .s-specs-editor_child-metas {
                border-bottom: 1px solid s.color(main, --alpha 0.1);
            }
        
            .s-specs-editor_child {
                border-left: s.margin(10) solid
                    s.color(complementary, --alpha 0.05);
            }
        }

        .s-specs-editor_child-metas {}

        .s-specs-editor_child-heading {
            gap: s.margin(20);
            padding-inline: var(--s-specs-editor-padding-inline);
            padding-block: var(--s-specs-editor-padding-block);
        }
        
        .s-specs-editor_child-toggle {
            
            &,
            * {
                @s.transition fast;
            }
        
            &:hover {
                background: s.color(complementary, --alpha 0.05);
            }
            &.active {
                background: s.color(complementary, --alpha 0.5);
        
                &:not(.s-specs-editor_child-prop .s-specs-editor_child-toggle),
                *:not(.s-specs-editor_child-prop .s-specs-editor_child-toggle *) {
                    color: s.color(complementary, foreground) !important;
                }
            }
        }
        .s-specs-editor_child-prop .s-specs-editor_child-toggle.active {}
        
        .s-specs-editor_child-title {
            font-size: s.font.size(40);
        
            &:not(
                    .s-specs-editor_child
                        .s-specs-editor_child
                        .s-specs-editor_child-title
                ) {
                color: s.color(accent);
            }
        }
        .s-specs-editor_child-media {}
        .s-specs-editor_child-description {
            padding-block-end: s.padding(30);
            color: s.color(main, text, --alpha 0.4);
        }
        
        .s-specs-editor_child-prop {}

        .copy-btn {
            @s.ui.button ($lnf: text);
        
            ._pending {
            }
            ._success {
                i {
                    color: s.color(success);
                }
            }
        
            &.success {}
        }
        
        .s-specs-editor_error {
            padding: s.padding(30);
            border: 1px solid s.color(error, border);
            background: s.color(error, --lighten 48);
            color: s.color(error);
            margin-block-start: s.margin(20);
            @s.border.radius;
        }

        .inline-input {
            margin-block-start: s.margin(30);
        
            ._label {
                width: 33%;
                white-space: nowrap;
                text-elipsis: elipsis;
                padding: s.padding(20) 0;
                opacity: 0.5;
            }
        
            &:has(input[type='checkbox']) {
                ._label {
                    width: auto;
                    flex-grow: 1;
                }
            }
        
            ._required {
                color: s.color(error);
            }
        
            ._input[type='text'] {
                @s.ui.input();
            }
            ._input[type='checkbox'] {
                @s.ui.switch();
                @s.color (accent);
            }
        }

        .s-specs-editor_label {
            margin-block-end: s.margin(20);
        
            > span {
            }
        
            ._title {
                opacity: 0.5;
            }
        
            ._required {
                color: s.color(error);
            }
        
            ._help-icon {
                margin-inline-start: s.margin(10);
        
                .s-tooltip {
                    min-width: 200px;
                }
            }
        
            i {
                opacity: 0.4;
                @s.transition (fast);
        
                &:hover {
                    opacity: 0.8;
                }
            }
        }
        
        .s-specs-editor_media-icons {
            border-right: 1px solid s.color(main, border);
            padding-inline-end: s.padding(20);
            margin-inline-end: s.margin(20);
        }
        .s-specs-editor_media-icon {
            padding-inline: s.padding(10);
        
            i {
                opacity: 0.3;
            }
        
            &.active {
                position: relative;
        
                &:after {
                    background: s.color(accent);
                    border-radius: 50%;
                }
            }
        
            &:hover i,
            &.current i {
                opacity: 1;
            }
        }
        
        .s-specs-editor_metas {
            border-bottom: 1px solid s.color(main, border);
            background: s.color(main, background);
        
            &:has(&-source) {
                border-bottom: none;
            }
        
            &-heading {
                padding-inline: var(--s-specs-editor-padding-inline);
                padding-block: s.padding(30);
                @s.transition;
        
                * {
                    @s.transition;
                    opacity: 1;
                }
                ._title {
                }
        
                ._actions {
                    gap: s.margin(10);
        
                    ._action {
                    }
                    ._action-save {
                        @s.ui.button();
                        @s.color (complementary);
        
                        i {
                            color: s.color(complementary, foreground);
                        }
        
                        &.success {
                            @s.color (success);
                        }
        
                        &.error {
                            @s.color (error);
                        }
                    }
                    ._action-delete {
                        @s.ui.button ($lnf: text);
                    }
                }
            }
        
            &-source {
                padding-inline: var(--s-specs-editor-padding-inline);
                padding-block: s.padding(20);
                background: s.color(accent, --alpha 0.2);
                @s.transition;
        
                ._text {
                }
                ._link {
                    font-weight: bold;
                    color: s.color(accent);
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
            @s.transition;
        
            &.sorting {
                opacity: 0.3;
            }
        
            &.sorted {
                background: s.color(complementary, --alpha 0.1);
            }
        }
        
        .s-specs-editor_repeatable-drop {
            background: s.color(complementary, --alpha 0.1);
            @s.transition fast;
        
            &:after {
                @s.transition fast;
            }
        
            &:has(+ .s-specs-editor_repeatable-item.sorting),
            .s-specs-editor_repeatable-item.sorting + & {
            }
        
            .s-specs-editor_repeatable.sort > & {
                height: s.margin(10);
        
                &:after {
                    height: s.margin(50);
                }
                &.sort-over {
                    background: s.color(complementary, --alpha 0.3);
                    height: s.margin(50);
        
                    &:after {
                        height: s.margin(100);
                    }
                }
            }
        }
        
        .s-specs-editor_repeatable-title {
            gap: s.margin(20);
            background: s.color(accent, --alpha 0.05);
            padding: s.padding(20) var(--s-specs-editor-padding-inline);
            border-top: 1px solid s.color(accent, --alpha 0.2);
        
            &,
            * {
                @s.transition (fast);
            }
        
            > span {
            }
        
            &.active,
            &:hover {
                background: s.color(accent, --alpha 0.05);
            }
        
            &.active,
            &:has(
                    + .s-specs-editor_repeatable-body
                        + .s-specs-editor_repeatable-actions:last-child
                ) {
                border-bottom: 1px solid s.color(accent, --alpha 0.2);
            }
        
            ._reorder {
                @s.ui.button ( $lnf: text);
                box-shadow: none !important;
            }
        
            ._remove {
                @s.ui.button ($lnf: text);
                @s.color (error);
                @s.scale (0.9);
            }
            &:hover ._remove {
            }
        }
        
        .s-specs-editor_repeatable-empty {
            padding-inline: var(--s-specs-editor-padding-inline);
            padding-block: s.padding(10);
            gap: s.margin(30);
        
            i {
                opacity: 0.1;
                font-size: s.font.size(100);
            }
        
            ._text {
                @s.typo p;
                @s.font.size (25);
                opacity: 0.5;
            }
        }
        
        .s-specs-editor_repeatable-body {
            border-left: s.margin(10) solid s.color(accent, --alpha 0.05);
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
                @s.ui.button ($lnf: outline);
                @s.color (accent);
        
                i {
                    color: currentColor;
                    margin: 0;
                }
            }
        }

        .s-specs-editor_warning {
            padding: s.padding(30);
            border: 1px solid s.color(warning, --lighten 35);
            background: s.color(warning, --lighten 45);
            color: s.color(warning, --darken 10);
            @s.border.radius;
        }
        
        .s-specs-editor_widget {
            @s.transition fast;
        
            &:has(._override) {
            }
        
            ._override {
                padding-inline: var(--s-specs-editor-padding-inline);
                background: s.color(main, surface, --alpha 0.7);
                border-top: 1px solid s.color(main, --alpha 0.05);
                border-bottom: 1px solid s.color(main, --alpha 0.05);
            }
        
            ._override-btn {
                @s.ui.button();
                @s.color (accent);
            }
        }
        
        .s-specs-editor_checkbox-widget {
            margin-block-start: s.margin(30);
        
            .s-specs-editor_label {
                margin-block-end: s.margin(30);
        
                > span {
                }
        
                ._option {
                    font-size: s.font.size(30);
                    opacity: 0.5;
                }
            }
        }

        .s-specs-editor_color-picker-widget {
            s-color-picker {
            }
        
            ._color-preview {
                height: calc(100% - s.margin(20) * 2);
                right: s.margin(20);
                transform: translate(0, -50%);
                border: 1px solid s.color(main, border);
                @s.border.radius;
                @s.depth (20);
            }
        }

        .s-specs-editor_image-widget {
            .s-dropzone {
                color: s.color(main, text, --alpha 0.3);
                padding: s.padding(30);
            }
        
            ._drop {
                @s.ui.input;
            }
        
            ._name {
                padding-inline: s.padding(20);
                line-height: 1.1;
                color: s.color(main, text, --alpha 0.5);
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
                @s.ui.button ($lnf: text);
            }
        }
        
        .s-specs-editor_layout-widget {
            ._layout {
                gap: s.margin(10);
            }
        
            ._same-as-default {
                text-align: center;
                color: s.color(main, text, --alpha 0.3);
                padding: s.padding(20);
            }
        
            .custom-select {
                margin-block-end: s.margin(30);
            }
        
            .custom-select_item {
                ._same-as-default {
                    border: 1px solid s.color(main, border);
                    @s.border.radius;
                }
            }
        
            .custom-select_item:hover {
                background: s.color(accent, surface);
        
                ._same-as-default {
                    background-color: s.color(main, background);
                    border-color: s.color(main, background);
                    color: s.color(accent, surface);
                }
        
                ._area {
                    background: s.color(accent, foreground);
                    color: s.color(accent, surface);
                }
            }
        
            ._area {
                height: 40px;
                background: s.color(main, --alpha 0.2);
                font-size: s.font.size(50);
                color: s.color(main, foreground);
                @s.border.radius;
            }
        
            .custom-select_item.active,
            .custom-select_value {
                ._area {
                    background: s.color(accent, --alpha 0.3);
                    color: s.color(accent, foreground);
                }
            }
        }
        
        .custom-select {
            @s.ui.input;
            --padding-inline: s.padding(ui.form.paddingInline);
            background-repeat: no-repeat;
            background-image: linear-gradient(
                    45deg,
                    transparent 50%,
                    s.color(current) 50%
                ),
                linear-gradient(135deg, s.color(current) 50%, transparent 50%);
            background-position: right calc(var(--padding-inline) + 5px) top 50%,
                right var(--padding-inline) top 50%;
            background-size: s.scalable(5px) s.scalable(5px),
                s.scalable(5px) s.scalable(5px);
        
            &:focus,
            &:focus-within {
                .custom-select_dropdown {
                    opacity: 1;
                    pointer-events: all;
                    transform: translateY(0);
                }
            }
        
            .custom-select_dropdown {
                background: s.color(main, background);
                opacity: 0;
                transform: translateY(calc(s.margin(30) * -1));
                @s.transition;
            }
        }
        .custom-select_value {
            padding-inline-end: s.padding(20);
        }
        .custom-select_dropdown {
            max-height: 70vh;
            @s.scrollbar();
            @s.depth (100);
        }
        .custom-select_item {
            padding: s.margin(30);
        
            &:hover {
                background: s.color(main, surface);
            }
        }

        .s-specs-editor_spaces-widget {
            .s-label {
                margin-block-end: s.margin(30);
            }
        }
        
        .s-specs-editor_switch-widget {
            gap: s.margin(20);
        
            .s-label {
                margin-block-end: 0;
            }
        
            .s-specs-editor_switch {
                @s.color (accent);
            }
        }
        
        .s-specs-editor_video-widget {
            .s-dropzone {
                color: s.color(main, text, --alpha 0.3);
                padding: s.padding(30);
            }
        
            ._format {
                @s.ui.badge;
                @s.color (accent);
            }
        
            ._drop {
                @s.ui.input;
            }
        
            ._name {
                padding-inline: s.padding(20);
                line-height: 1.1;
                color: s.color(main, text, --alpha 0.5);
            }
        
            ._videos {
            }
        
            ._video {
                gap: s.margin(20);
        
                &:nth-child(even) {
                    background: s.color(main, surface);
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
                @s.ui.button ($lnf: text);
            }
        }
        
        


        `);
    vars.push('}');
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLDZCQUE4QixTQUFRLHFCQUFZO0lBQ3BELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSXlDLGtEQUFTO0FBRW5EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsRUFDVixXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUVQLE1BQU07SUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FncEJMLENBQUMsQ0FBQztJQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBenFCRCw0QkF5cUJDIn0=