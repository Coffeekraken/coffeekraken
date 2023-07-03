var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where, } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: 'AIzaSyDT-OwhiWreRMdNFj61uQ4ukIftBvXyaQQ',
    authDomain: 'coffeekraken-ratings.firebaseapp.com',
    projectId: 'coffeekraken-ratings',
    storageBucket: 'coffeekraken-ratings.appspot.com',
    messagingSenderId: '1050427238214',
    appId: '1:1050427238214:web:612d485c9735997c28a747',
    measurementId: 'G-9S85NZNJB7',
};
class RatingsApi {
    constructor() { }
    init() {
        this._app = initializeApp(firebaseConfig);
        // const analytics = getAnalytics(this._app);
        this._db = getFirestore(this._app);
        this._auth = getAuth(this._app);
        this._auth.languageCode = 'en';
    }
    getRatingObjForCurrentUser() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._user)
                return false;
            const docRef = doc(this._db, 'ratings', this._user.email);
            const docSnap = yield getDoc(docRef);
            if (docSnap.exists()) {
                this._ratingObj = docSnap.data();
                return this._ratingObj;
            }
            return;
        });
    }
    _signInWithGoogle() {
        return __awaiter(this, void 0, void 0, function* () {
            this._googleProvider = new GoogleAuthProvider();
            const result = yield signInWithPopup(this._auth, this._googleProvider);
            const userObj = {
                email: result.user.email,
                name: result.user.displayName,
                pictureUrl: result.user.photoURL,
            };
            this._user = userObj;
            return userObj;
        });
    }
    create(ratingObj) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = this._user) === null || _a === void 0 ? void 0 : _a.email))
                return;
            yield setDoc(doc(this._db, 'ratings', this._user.email), {
                email: this._user.email,
                name: this._user.name,
                pictureUrl: this._user.pictureUrl,
                rating: ratingObj.rating,
                comment: ratingObj.comment,
            });
        });
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._readPromise) {
                return this._readPromise;
            }
            const q = query(collection(this._db, 'ratings'), where('rating', '>=', 2));
            const querySnapshot = yield getDocs(q);
            const ratings = [];
            querySnapshot.forEach((doc) => {
                ratings.push(doc.data());
                // ratings.push(doc.data());
                // ratings.push(doc.data());
                // ratings.push(doc.data());
                // ratings.push(doc.data());
                // ratings.push(doc.data());
                // ratings.push(doc.data());
                // ratings.push(doc.data());
                // ratings.push(doc.data());
                // ratings.push(doc.data());
            });
            this._readPromise = ratings;
            return ratings;
        });
    }
}
export default new RatingsApi();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDN0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUNILFVBQVUsRUFDVixHQUFHLEVBQ0gsTUFBTSxFQUNOLE9BQU8sRUFDUCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixLQUFLLEdBQ1IsTUFBTSxvQkFBb0IsQ0FBQztBQUU1QixNQUFNLGNBQWMsR0FBRztJQUNuQixNQUFNLEVBQUUseUNBQXlDO0lBQ2pELFVBQVUsRUFBRSxzQ0FBc0M7SUFDbEQsU0FBUyxFQUFFLHNCQUFzQjtJQUNqQyxhQUFhLEVBQUUsa0NBQWtDO0lBQ2pELGlCQUFpQixFQUFFLGVBQWU7SUFDbEMsS0FBSyxFQUFFLDRDQUE0QztJQUNuRCxhQUFhLEVBQUUsY0FBYztDQUNoQyxDQUFDO0FBRUYsTUFBTSxVQUFVO0lBUVosZ0JBQWUsQ0FBQztJQUVoQixJQUFJO1FBQ0EsSUFBSSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDMUMsNkNBQTZDO1FBQzdDLElBQUksQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFFSywwQkFBMEI7O1lBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSztnQkFBRSxPQUFPLEtBQUssQ0FBQztZQUU5QixNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxRCxNQUFNLE9BQU8sR0FBRyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVyQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2pDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUMxQjtZQUNELE9BQU87UUFDWCxDQUFDO0tBQUE7SUFFSyxpQkFBaUI7O1lBQ25CLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1lBRWhELE1BQU0sTUFBTSxHQUFHLE1BQU0sZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBRXZFLE1BQU0sT0FBTyxHQUFHO2dCQUNaLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUs7Z0JBQ3hCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVc7Z0JBQzdCLFVBQVUsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVE7YUFDbkMsQ0FBQztZQUVGLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1lBRXJCLE9BQU8sT0FBTyxDQUFDO1FBQ25CLENBQUM7S0FBQTtJQUVLLE1BQU0sQ0FBQyxTQUFTOzs7WUFDbEIsSUFBSSxDQUFDLENBQUEsTUFBQSxJQUFJLENBQUMsS0FBSywwQ0FBRSxLQUFLLENBQUE7Z0JBQUUsT0FBTztZQUMvQixNQUFNLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDckQsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztnQkFDdkIsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtnQkFDckIsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVTtnQkFDakMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxNQUFNO2dCQUN4QixPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU87YUFDN0IsQ0FBQyxDQUFDOztLQUNOO0lBR0ssSUFBSTs7WUFDTixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ25CLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQzthQUM1QjtZQUVELE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FDWCxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsRUFDL0IsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQzNCLENBQUM7WUFFRixNQUFNLGFBQWEsR0FBRyxNQUFNLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QyxNQUFNLE9BQU8sR0FBUSxFQUFFLENBQUM7WUFDeEIsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUMxQixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUN6Qiw0QkFBNEI7Z0JBQzVCLDRCQUE0QjtnQkFDNUIsNEJBQTRCO2dCQUM1Qiw0QkFBNEI7Z0JBQzVCLDRCQUE0QjtnQkFDNUIsNEJBQTRCO2dCQUM1Qiw0QkFBNEI7Z0JBQzVCLDRCQUE0QjtnQkFDNUIsNEJBQTRCO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7WUFFNUIsT0FBTyxPQUFPLENBQUM7UUFDbkIsQ0FBQztLQUFBO0NBQ0o7QUFFRCxlQUFlLElBQUksVUFBVSxFQUFFLENBQUMifQ==