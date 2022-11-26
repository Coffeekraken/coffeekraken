import { __easeInterval } from '@coffeekraken/sugar/function';
export default {
    transition($from, $to) {
        return new Promise((resolve, reject) => {
            // disable scroll snaping during transition
            this.$slidesWrapper.style.scrollSnapType = 'none';
            const toRect = $to.getBoundingClientRect(), fromRect = $from.getBoundingClientRect(), sliderRect = this.getBoundingClientRect(), _this = this;
            let startX = this.$slidesWrapper.scrollLeft, startY = this.$slidesWrapper.scrollTop, fromOffset, toOffset, dist = 0;
            if (this.props.direction === 'vertical') {
                fromOffset = (sliderRect.height - fromRect.height) * 0.5;
                toOffset = (sliderRect.height - toRect.height) * 0.5;
                dist = toRect.y - fromRect.y - toOffset + fromOffset;
            }
            else {
                fromOffset = (sliderRect.width - fromRect.width) * 0.5;
                toOffset = (sliderRect.width - toRect.width) * 0.5;
                dist = toRect.x - fromRect.x - toOffset + fromOffset;
            }
            __easeInterval(this.props.transitionDuration, (percentage) => {
                const offset = (dist / 100) * percentage;
                if (this.props.direction === 'vertical') {
                    this.$slidesWrapper.scroll(0, Math.round(startY + offset));
                }
                else {
                    this.$slidesWrapper.scroll(Math.round(startX + offset), 0);
                }
            }, {
                easing: this.props.transitionEasing,
                onEnd() {
                    if (_this.props.direction === 'vertical') {
                        _this.$slidesWrapper.style.scrollSnapType =
                            'y mandatory';
                    }
                    else {
                        _this.$slidesWrapper.style.scrollSnapType =
                            'x mandatory';
                    }
                    resolve();
                },
            });
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUU5RCxlQUFlO0lBQ1gsVUFBVSxDQUFDLEtBQWtCLEVBQUUsR0FBZ0I7UUFDM0MsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQywyQ0FBMkM7WUFDM0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztZQUVsRCxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMscUJBQXFCLEVBQUUsRUFDdEMsUUFBUSxHQUFHLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxFQUN4QyxVQUFVLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLEVBQ3pDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQ3ZDLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFDdEMsVUFBVSxFQUNWLFFBQVEsRUFDUixJQUFJLEdBQUcsQ0FBQyxDQUFDO1lBRWIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxVQUFVLEVBQUU7Z0JBQ3JDLFVBQVUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFDekQsUUFBUSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUNyRCxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxHQUFHLFFBQVEsR0FBRyxVQUFVLENBQUM7YUFDeEQ7aUJBQU07Z0JBQ0gsVUFBVSxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUN2RCxRQUFRLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBQ25ELElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsUUFBUSxHQUFHLFVBQVUsQ0FBQzthQUN4RDtZQUVELGNBQWMsQ0FDVixJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUM3QixDQUFDLFVBQVUsRUFBRSxFQUFFO2dCQUNYLE1BQU0sTUFBTSxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQztnQkFFekMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxVQUFVLEVBQUU7b0JBQ3JDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUN0QixDQUFDLEVBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQzlCLENBQUM7aUJBQ0w7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxFQUMzQixDQUFDLENBQ0osQ0FBQztpQkFDTDtZQUNMLENBQUMsRUFDRDtnQkFDSSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0I7Z0JBQ25DLEtBQUs7b0JBQ0QsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxVQUFVLEVBQUU7d0JBQ3RDLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLGNBQWM7NEJBQ3JDLGFBQWEsQ0FBQztxQkFDckI7eUJBQU07d0JBQ0gsS0FBSyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsY0FBYzs0QkFDckMsYUFBYSxDQUFDO3FCQUNyQjtvQkFDRCxPQUFPLEVBQUUsQ0FBQztnQkFDZCxDQUFDO2FBQ0osQ0FDSixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0osQ0FBQyJ9