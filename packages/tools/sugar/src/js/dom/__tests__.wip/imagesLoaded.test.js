"use strict";
var __imagesLoaded = require('../imagesLoaded');
var __dispatchEvent = require('../dispatchEvent');
describe('sugar.js.dom.imagesLoaded', function () {
    document.head.innerHTML = "\n    <img id=\"image1\" src=\"src/data/tests/testing.jpg\" />\n    <img id=\"image2\" src=\"src/data/tests/testing.jpg\" />\n    <img id=\"image3\" src=\"src/data/tests/testing.jpg\" />\n  ";
    var $img1 = document.head.querySelector('#image1');
    var $img2 = document.head.querySelector('#image2');
    var $img3 = document.head.querySelector('#image3');
    var isLoaded = false, isError = false, imgsCount = 0;
    __imagesLoaded([$img1, $img2, $img3])
        .on('img.loaded', function (_$img) {
        imgsCount++;
    })
        .then(function (arrayImages) {
        isLoaded = true;
    })
        .catch(function (e) {
        isError = true;
    });
    __dispatchEvent($img1, 'load');
    __dispatchEvent($img2, 'load');
    __dispatchEvent($img3, 'load');
    it('Should detect when all the images are loaded correctly', function () {
        setTimeout(function () {
            expect(isLoaded).toBe(true);
            expect(isError).toBe(false);
            expect(imgsCount).toBe(3);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VzTG9hZGVkLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbWFnZXNMb2FkZWQudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDbEQsSUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFcEQsUUFBUSxDQUFDLDJCQUEyQixFQUFFO0lBQ3BDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLGdNQUl6QixDQUFDO0lBQ0YsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckQsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckQsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFckQsSUFBSSxRQUFRLEdBQUcsS0FBSyxFQUNsQixPQUFPLEdBQUcsS0FBSyxFQUNmLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFFaEIsY0FBYyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNsQyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQUMsS0FBSztRQUN0QixTQUFTLEVBQUUsQ0FBQztJQUNkLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxVQUFDLFdBQVc7UUFDaEIsUUFBUSxHQUFHLElBQUksQ0FBQztJQUNsQixDQUFDLENBQUM7U0FDRCxLQUFLLENBQUMsVUFBQyxDQUFDO1FBQ1AsT0FBTyxHQUFHLElBQUksQ0FBQztJQUNqQixDQUFDLENBQUMsQ0FBQztJQUVMLGVBQWUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDL0IsZUFBZSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMvQixlQUFlLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRS9CLEVBQUUsQ0FBQyx3REFBd0QsRUFBRTtRQUMzRCxVQUFVLENBQUM7WUFDVCxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==