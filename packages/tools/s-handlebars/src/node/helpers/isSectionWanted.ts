import __SSugarConfig from '@coffeekraken/s-sugar-config';

const markdownConfig = __SSugarConfig.get('markdownBuilder');

export default function isSectionWanted(conditional, options) {
    // @ts-ignore
    let sections = this.sections;
    // @ts-ignore
    if (!this.sections) {
        sections = Object.keys(markdownConfig.sections);
    } else {
        // @ts-ignore
        sections = this.sections.split(',').map((l) => l.trim());
    }

    if (sections.indexOf(conditional) !== -1) {
        // @ts-ignore
        return options.fn(this);
    } else {
        // @ts-ignore
        return options.inverse(this);
    }
}
