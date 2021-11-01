import __SSugarConfig from '@coffeekraken/s-sugar-config';
const markdownConfig = __SSugarConfig.get('markdownBuilder');
export default function isSectionWanted(conditional, options) {
    // @ts-ignore
    let sections = this.sections;
    // @ts-ignore
    if (!this.sections) {
        sections = Object.keys(markdownConfig.sections);
    }
    else {
        // @ts-ignore
        sections = this.sections.split(',').map((l) => l.trim());
    }
    if (sections.indexOf(conditional) !== -1) {
        // @ts-ignore
        return options.fn(this);
    }
    else {
        // @ts-ignore
        return options.inverse(this);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNTZWN0aW9uV2FudGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXNTZWN0aW9uV2FudGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFELE1BQU0sY0FBYyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUU3RCxNQUFNLENBQUMsT0FBTyxVQUFVLGVBQWUsQ0FBQyxXQUFXLEVBQUUsT0FBTztJQUN4RCxhQUFhO0lBQ2IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUM3QixhQUFhO0lBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDaEIsUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ25EO1NBQU07UUFDSCxhQUFhO1FBQ2IsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDNUQ7SUFFRCxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDdEMsYUFBYTtRQUNiLE9BQU8sT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMzQjtTQUFNO1FBQ0gsYUFBYTtRQUNiLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNoQztBQUNMLENBQUMifQ==