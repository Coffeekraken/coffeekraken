import __bezierEasing from 'bezier-easing';
export default function __cssEasingStrToJsFunction(easing) {
    // linear easing by default
    let params = [0, 0, 1, 1];
    switch (easing) {
        case 'ease':
            params = [0.25, 1, 0.25, 1];
            break;
        case 'ease-in-out':
            params = [0.42, 0, 0.58, 1];
            break;
        case 'ease-in':
            params = [0.42, 0, 1, 1];
            break;
        case 'ease-out':
            params = [0, 0, 0.58, 1];
            break;
        case 'linear':
            break;
        default:
            params = easing
                .replace(/^cubic-bezier\(/, '')
                .replace(/\)$/, '')
                .split(',')
                .map((v) => parseFloat(v));
            break;
    }
    // @ts-ignore
    return __bezierEasing(...params);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sY0FBYyxNQUFNLGVBQWUsQ0FBQztBQW1DM0MsTUFBTSxDQUFDLE9BQU8sVUFBVSwwQkFBMEIsQ0FDOUMsTUFBYztJQUVkLDJCQUEyQjtJQUMzQixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRTFCLFFBQVEsTUFBTSxFQUFFO1FBQ1osS0FBSyxNQUFNO1lBQ1AsTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTTtRQUNWLEtBQUssYUFBYTtZQUNkLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE1BQU07UUFDVixLQUFLLFNBQVM7WUFDVixNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNO1FBQ1YsS0FBSyxVQUFVO1lBQ1gsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTTtRQUNWLEtBQUssUUFBUTtZQUNULE1BQU07UUFDVjtZQUNJLE1BQU0sR0FBRyxNQUFNO2lCQUNWLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUM7aUJBQzlCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO2lCQUNsQixLQUFLLENBQUMsR0FBRyxDQUFDO2lCQUNWLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsTUFBTTtLQUNiO0lBQ0QsYUFBYTtJQUNiLE9BQU8sY0FBYyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7QUFDckMsQ0FBQyJ9