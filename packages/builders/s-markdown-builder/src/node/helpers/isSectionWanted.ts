import __SSugarConfig from '@coffeekraken/s-sugar-config';

const markdownConfig = __SSugarConfig.get('markdownBuilder');

export default function isSectionWanted(conditional, options) {

    let wantedSections = [];
    let sections = this.sections;
    if (!this.sections) {
        sections = Object.keys(markdownConfig.sections);
    } else {
        sections = this.sections.split(',').map(l => l.trim());
    }

    if (sections.indexOf(conditional) !== -1) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }

}