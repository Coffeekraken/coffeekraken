export default function onScrollEnd($elm, callback, settings) {
    const finalSettings = Object.assign({ offset: 20, once: false, times: -1 }, (settings !== null && settings !== void 0 ? settings : {}));
    let active = true, count = 0;
    const internalCallback = (e) => {
        if (active &&
            $elm.offsetHeight + $elm.scrollTop >=
                $elm.scrollHeight - finalSettings.offset) {
            callback();
            active = false;
            count++;
            if (finalSettings.once)
                $elm.removeEventListener('scroll', internalCallback);
            else if (finalSettings.times > 0 && count >= finalSettings.times) {
                $elm.removeEventListener('scroll', internalCallback);
            }
        }
        else if ($elm.offsetHeight + $elm.scrollTop <
            $elm.scrollHeight - finalSettings.offset) {
            active = true;
        }
    };
    $elm.addEventListener('scroll', internalCallback);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25TY3JvbGxFbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvblNjcm9sbEVuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE2QkEsTUFBTSxDQUFDLE9BQU8sVUFBVSxXQUFXLENBQ2pDLElBQWlCLEVBQ2pCLFFBQWtCLEVBQ2xCLFFBQStCO0lBRS9CLE1BQU0sYUFBYSxtQkFDakIsTUFBTSxFQUFFLEVBQUUsRUFDVixJQUFJLEVBQUUsS0FBSyxFQUNYLEtBQUssRUFBRSxDQUFDLENBQUMsSUFDTixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsSUFBSSxNQUFNLEdBQUcsSUFBSSxFQUNmLEtBQUssR0FBRyxDQUFDLENBQUM7SUFFWixNQUFNLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDN0IsSUFDRSxNQUFNO1lBQ04sSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUztnQkFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxhQUFhLENBQUMsTUFBTSxFQUMxQztZQUNBLFFBQVEsRUFBRSxDQUFDO1lBQ1gsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNmLEtBQUssRUFBRSxDQUFDO1lBQ1IsSUFBSSxhQUFhLENBQUMsSUFBSTtnQkFDcEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO2lCQUNsRCxJQUFJLGFBQWEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxhQUFhLENBQUMsS0FBSyxFQUFFO2dCQUNoRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7YUFDdEQ7U0FDRjthQUFNLElBQ0wsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUztZQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQ3hDO1lBQ0EsTUFBTSxHQUFHLElBQUksQ0FBQztTQUNmO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3BELENBQUMifQ==