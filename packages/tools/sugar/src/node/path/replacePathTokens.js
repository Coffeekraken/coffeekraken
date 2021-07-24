import __packageTmpDir from './packageTmpDir';
import __packageLocalDir from './packageLocalDir';
import __packageCacheDir from './packageCacheDir';
import __packageRootDir from './packageRootDir';
import __srcRootDir from './srcRootDir';
import __distRootDir from './distRootDir';
import __srcJsDir from './srcJsDir';
import __srcCssDir from './srcCssDir';
import __srcDocDir from './srcDocDir';
import __srcFontsDir from './srcFontsDir';
import __srcIconsDir from './srcIconsDir';
import __srcImgDir from './srcImgDir';
import __srcNodeDir from './srcNodeDir';
import __srcViewsDir from './srcViewsDir';
import __distJsDir from './distJsDir';
import __distCssDir from './distCssDir';
import __distDocDir from './distDocDir';
import __distFontsDir from './distFontsDir';
import __distIconsDir from './distIconsDir';
import __distImgDir from './distImgDir';
import __distNodeDir from './distNodeDir';
import __distViewsDir from './distViewsDir';
export default function replacePathTokens(paths, settings) {
    const set = Object.assign({ packageTmpDir: true, packageLocalDir: true, packageCacheDir: true, packageRootDir: true, srcRootDir: true, distRootDir: true, srcJsDir: true, srcCssDir: true, srcDocDir: true, srcFontsDir: true, srcIconsDir: true, srcImgDir: true, srcNodeDir: true, srcViewsDir: true, distJsDir: true, distCssDir: true, distDocDir: true, distFontsDir: true, distIconsDir: true, distImgDir: true, distNodeDir: true, distViewsDir: true }, settings);
    const isArray = Array.isArray(paths);
    if (!isArray)
        paths = [paths];
    const finalPaths = paths.map((path) => {
        if (set.packageTmpDir)
            path = path.replace('%packageTmpDir', __packageTmpDir());
        if (set.packageLocalDir)
            path = path.replace('%packageLocalDir', __packageLocalDir());
        if (set.packageCacheDir)
            path = path.replace('%packageCacheDir', __packageCacheDir());
        if (set.packageRootDir)
            path = path.replace('%packageRootDir', __packageRootDir());
        if (set.srcRootDir)
            path = path.replace('%srcRootDir', __srcRootDir());
        if (set.distRootDir)
            path = path.replace('%distRootDir', __distRootDir());
        if (set.srcJsDir)
            path = path.replace('%srcJsDir', __srcJsDir());
        if (set.srcCssDir)
            path = path.replace('%srcCssDir', __srcCssDir());
        if (set.srcDocDir)
            path = path.replace('%srcDocDir', __srcDocDir());
        if (set.srcFontsDir)
            path = path.replace('%srcFontsDir', __srcFontsDir());
        if (set.srcIconsDir)
            path = path.replace('%srcIconsDir', __srcIconsDir());
        if (set.srcImgDir)
            path = path.replace('%srcImgDir', __srcImgDir());
        if (set.srcNodeDir)
            path = path.replace('%srcNodeDir', __srcNodeDir());
        if (set.srcViewsDir)
            path = path.replace('%srcViewsDir', __srcViewsDir());
        if (set.distJsDir)
            path = path.replace('%distJsDir', __distJsDir());
        if (set.distCssDir)
            path = path.replace('%distCssDir', __distCssDir());
        if (set.distDocDir)
            path = path.replace('%distDocDir', __distDocDir());
        if (set.distFontsDir)
            path = path.replace('%distFontsDir', __distFontsDir());
        if (set.distIconsDir)
            path = path.replace('%distIconsDir', __distIconsDir());
        if (set.distImgDir)
            path = path.replace('%distImgDir', __distImgDir());
        if (set.distNodeDir)
            path = path.replace('%distNodeDir', __distNodeDir());
        if (set.distViewsDir)
            path = path.replace('%distViewsDir', __distViewsDir());
        path = path.replace(/\/\//gm, '/');
        return path;
    });
    if (isArray)
        return finalPaths;
    else
        return finalPaths[0];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGFjZVBhdGhUb2tlbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXBsYWNlUGF0aFRva2Vucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGVBQWUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLGlCQUFpQixNQUFNLG1CQUFtQixDQUFDO0FBQ2xELE9BQU8saUJBQWlCLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxnQkFBZ0IsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLFlBQVksTUFBTSxjQUFjLENBQUM7QUFDeEMsT0FBTyxhQUFhLE1BQU0sZUFBZSxDQUFDO0FBRTFDLE9BQU8sVUFBVSxNQUFNLFlBQVksQ0FBQztBQUNwQyxPQUFPLFdBQVcsTUFBTSxhQUFhLENBQUM7QUFDdEMsT0FBTyxXQUFXLE1BQU0sYUFBYSxDQUFDO0FBQ3RDLE9BQU8sYUFBYSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLGFBQWEsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxXQUFXLE1BQU0sYUFBYSxDQUFDO0FBQ3RDLE9BQU8sWUFBWSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLGFBQWEsTUFBTSxlQUFlLENBQUM7QUFFMUMsT0FBTyxXQUFXLE1BQU0sYUFBYSxDQUFDO0FBQ3RDLE9BQU8sWUFBWSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLFlBQVksTUFBTSxjQUFjLENBQUM7QUFDeEMsT0FBTyxjQUFjLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxjQUFjLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxZQUFZLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sYUFBYSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLGNBQWMsTUFBTSxnQkFBZ0IsQ0FBQztBQWdENUMsTUFBTSxDQUFDLE9BQU8sVUFBVSxpQkFBaUIsQ0FDdkMsS0FBSyxFQUNMLFFBQThDO0lBRTlDLE1BQU0sR0FBRyxHQUFHLGdCQUNWLGFBQWEsRUFBRSxJQUFJLEVBQ25CLGVBQWUsRUFBRSxJQUFJLEVBQ3JCLGVBQWUsRUFBRSxJQUFJLEVBQ3JCLGNBQWMsRUFBRSxJQUFJLEVBQ3BCLFVBQVUsRUFBRSxJQUFJLEVBQ2hCLFdBQVcsRUFBRSxJQUFJLEVBQ2pCLFFBQVEsRUFBRSxJQUFJLEVBQ2QsU0FBUyxFQUFFLElBQUksRUFDZixTQUFTLEVBQUUsSUFBSSxFQUNmLFdBQVcsRUFBRSxJQUFJLEVBQ2pCLFdBQVcsRUFBRSxJQUFJLEVBQ2pCLFNBQVMsRUFBRSxJQUFJLEVBQ2YsVUFBVSxFQUFFLElBQUksRUFDaEIsV0FBVyxFQUFFLElBQUksRUFDakIsU0FBUyxFQUFFLElBQUksRUFDZixVQUFVLEVBQUUsSUFBSSxFQUNoQixVQUFVLEVBQUUsSUFBSSxFQUNoQixZQUFZLEVBQUUsSUFBSSxFQUNsQixZQUFZLEVBQUUsSUFBSSxFQUNsQixVQUFVLEVBQUUsSUFBSSxFQUNoQixXQUFXLEVBQUUsSUFBSSxFQUNqQixZQUFZLEVBQUUsSUFBSSxJQUNmLFFBQVEsQ0FDWixDQUFDO0lBRUYsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxJQUFJLENBQUMsT0FBTztRQUFFLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNwQyxJQUFJLEdBQUcsQ0FBQyxhQUFhO1lBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQztRQUNoRixJQUFJLEdBQUcsQ0FBQyxlQUFlO1lBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1FBQ3RGLElBQUksR0FBRyxDQUFDLGVBQWU7WUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUM7UUFDdEYsSUFBSSxHQUFHLENBQUMsY0FBYztZQUFFLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQztRQUNuRixJQUFJLEdBQUcsQ0FBQyxVQUFVO1lBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7UUFDdkUsSUFBSSxHQUFHLENBQUMsV0FBVztZQUFFLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBRTFFLElBQUksR0FBRyxDQUFDLFFBQVE7WUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUNqRSxJQUFJLEdBQUcsQ0FBQyxTQUFTO1lBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDcEUsSUFBSSxHQUFHLENBQUMsU0FBUztZQUFFLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLElBQUksR0FBRyxDQUFDLFdBQVc7WUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUMxRSxJQUFJLEdBQUcsQ0FBQyxXQUFXO1lBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDMUUsSUFBSSxHQUFHLENBQUMsU0FBUztZQUFFLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLElBQUksR0FBRyxDQUFDLFVBQVU7WUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUN2RSxJQUFJLEdBQUcsQ0FBQyxXQUFXO1lBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFFMUUsSUFBSSxHQUFHLENBQUMsU0FBUztZQUFFLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLElBQUksR0FBRyxDQUFDLFVBQVU7WUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUN2RSxJQUFJLEdBQUcsQ0FBQyxVQUFVO1lBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7UUFDdkUsSUFBSSxHQUFHLENBQUMsWUFBWTtZQUFFLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO1FBQzdFLElBQUksR0FBRyxDQUFDLFlBQVk7WUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUM3RSxJQUFJLEdBQUcsQ0FBQyxVQUFVO1lBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7UUFDdkUsSUFBSSxHQUFHLENBQUMsV0FBVztZQUFFLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQzFFLElBQUksR0FBRyxDQUFDLFlBQVk7WUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUU3RSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDLENBQUMsQ0FBQztJQUNILElBQUksT0FBTztRQUFFLE9BQU8sVUFBVSxDQUFDOztRQUMxQixPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1QixDQUFDIn0=