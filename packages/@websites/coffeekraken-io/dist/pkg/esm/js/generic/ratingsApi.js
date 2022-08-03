var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where, } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDT-OwhiWreRMdNFj61uQ4ukIftBvXyaQQ",
    authDomain: "coffeekraken-ratings.firebaseapp.com",
    projectId: "coffeekraken-ratings",
    storageBucket: "coffeekraken-ratings.appspot.com",
    messagingSenderId: "1050427238214",
    appId: "1:1050427238214:web:612d485c9735997c28a747",
    measurementId: "G-9S85NZNJB7",
};
class RatingsApi {
    constructor() {
        this._app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(this._app);
        this._db = getFirestore(this._app);
        this._auth = getAuth(this._app);
        this._auth.languageCode = "en";
    }
    getRatingObjForCurrentUser() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._user)
                return false;
            const docRef = doc(this._db, "ratings", this._user.email);
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
            yield setDoc(doc(this._db, "ratings", this._user.email), {
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
            const q = query(collection(this._db, "ratings"), where("rating", ">=", 2));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzdDLE9BQU8sRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFDTCxVQUFVLEVBQ1YsR0FBRyxFQUNILE1BQU0sRUFDTixPQUFPLEVBQ1AsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ04sS0FBSyxHQUNOLE1BQU0sb0JBQW9CLENBQUM7QUFFNUIsTUFBTSxjQUFjLEdBQUc7SUFDckIsTUFBTSxFQUFFLHlDQUF5QztJQUNqRCxVQUFVLEVBQUUsc0NBQXNDO0lBQ2xELFNBQVMsRUFBRSxzQkFBc0I7SUFDakMsYUFBYSxFQUFFLGtDQUFrQztJQUNqRCxpQkFBaUIsRUFBRSxlQUFlO0lBQ2xDLEtBQUssRUFBRSw0Q0FBNEM7SUFDbkQsYUFBYSxFQUFFLGNBQWM7Q0FDOUIsQ0FBQztBQUVGLE1BQU0sVUFBVTtJQVFkO1FBQ0UsSUFBSSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDMUMsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUNqQyxDQUFDO0lBRUssMEJBQTBCOztZQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLEtB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