"use strict";
var __addEventListenerOnce = require('../addEventListenerOnce');
var __dispatchEvent = require('../dispatchEvent');
describe('sugar.js.dom.addEventListenerOnce', function () {
    document.body.innerHTML = "\n      <div id=\"testing\">Hello World</div>\n  ";
    var $elm = document.querySelector('#testing');
    var isTriggeredTwice = false;
    it('Should add the event listener on the element correctly', function (done) {
        __addEventListenerOnce($elm, 'click').on('click', function (e) {
            if (e.detail.twice)
                isTriggeredTwice = true;
            done();
        });
        __dispatchEvent($elm, 'click', {
            first: true
        });
    });
    it('Should not trigger anymore the same event', function () {
        __dispatchEvent($elm, 'click', {
            twice: true
        });
        expect(isTriggeredTwice).toBe(false);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkRXZlbnRMaXN0ZW5lck9uY2UudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFkZEV2ZW50TGlzdGVuZXJPbmNlLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU0sc0JBQXNCLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDbEUsSUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFcEQsUUFBUSxDQUFDLG1DQUFtQyxFQUFFO0lBQzVDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLG1EQUV6QixDQUFDO0lBQ0YsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoRCxJQUFJLGdCQUFnQixHQUFHLEtBQUssQ0FBQztJQUU3QixFQUFFLENBQUMsd0RBQXdELEVBQUUsVUFBQyxJQUFJO1FBQ2hFLHNCQUFzQixDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSztnQkFBRSxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7WUFDNUMsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO1lBQzdCLEtBQUssRUFBRSxJQUFJO1NBQ1osQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsMkNBQTJDLEVBQUU7UUFDOUMsZUFBZSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7WUFDN0IsS0FBSyxFQUFFLElBQUk7U0FDWixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9