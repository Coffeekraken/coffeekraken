import __theme from './theme';
export default function (from, to) {
    let vars = [];
    let fromVariable = `--s-theme-color-${from}`, toVariable = `--s-theme-color-${to}`;
    __theme().loopOnColors((colorObj) => {
        if (colorObj.name === to) {
            if (!colorObj.state && !colorObj.variant && colorObj.value.color) {
                vars.push(`${fromVariable}-h: ${colorObj.value.h};`);
                vars.push(`${fromVariable}-s: ${colorObj.value.s};`);
                vars.push(`${fromVariable}-l: ${colorObj.value.l};`);
            }
            else if (!colorObj.value.color) {
                vars.push(`${fromVariable}-${colorObj.variant}-saturation-offset: var(${toVariable}-${colorObj.variant}-saturation-offset, 0);`);
                vars.push(`${fromVariable}-${colorObj.variant}-lightness-offset: var(${toVariable}-${colorObj.variant}-lightness-offset, 0);`);
                vars.push(`${fromVariable}-a: var(${toVariable}-a, 1);`);
            }
        }
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtYXBDb2xvclZhcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZW1hcENvbG9yVmFycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFJOUIsTUFBTSxDQUFDLE9BQU8sV0FBVyxJQUFZLEVBQUUsRUFBVTtJQUM3QyxJQUFJLElBQUksR0FBYSxFQUFFLENBQUM7SUFFeEIsSUFBSSxZQUFZLEdBQUcsbUJBQW1CLElBQUksRUFBRSxFQUN4QyxVQUFVLEdBQUcsbUJBQW1CLEVBQUUsRUFBRSxDQUFDO0lBRXpDLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQ2hDLElBQUksUUFBUSxDQUFDLElBQUksS0FBSyxFQUFFLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUM5RCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBWSxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3hEO2lCQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtnQkFDOUIsSUFBSSxDQUFDLElBQUksQ0FDTCxHQUFHLFlBQVksSUFBSSxRQUFRLENBQUMsT0FBTywyQkFBMkIsVUFBVSxJQUFJLFFBQVEsQ0FBQyxPQUFPLHlCQUF5QixDQUN4SCxDQUFDO2dCQUNGLElBQUksQ0FBQyxJQUFJLENBQ0wsR0FBRyxZQUFZLElBQUksUUFBUSxDQUFDLE9BQU8sMEJBQTBCLFVBQVUsSUFBSSxRQUFRLENBQUMsT0FBTyx3QkFBd0IsQ0FDdEgsQ0FBQztnQkFDRixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBWSxXQUFXLFVBQVUsU0FBUyxDQUFDLENBQUM7YUFDNUQ7U0FDSjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9