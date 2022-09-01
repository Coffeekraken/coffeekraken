"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
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
        this._app = (0, app_1.initializeApp)(firebaseConfig);
        // const analytics = getAnalytics(this._app);
        this._db = (0, firestore_1.getFirestore)(this._app);
        this._auth = (0, auth_1.getAuth)(this._app);
        this._auth.languageCode = 'en';
    }
    getRatingObjForCurrentUser() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._user)
                return false;
            const docRef = (0, firestore_1.doc)(this._db, 'ratings', this._user.email);
            const docSnap = yield (0, firestore_1.getDoc)(docRef);
            if (docSnap.exists()) {
                this._ratingObj = docSnap.data();
                return this._ratingObj;
            }
            return;
        });
    }
    _signInWithGoogle() {
        return __awaiter(this, void 0, void 0, function* () {
            this._googleProvider = new auth_1.GoogleAuthProvider();
            const result = yield (0, auth_1.signInWithPopup)(this._auth, this._googleProvider);
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
            yield (0, firestore_1.setDoc)((0, firestore_1.doc)(this._db, 'ratings', this._user.email), {
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
            const q = (0, firestore_1.query)((0, firestore_1.collection)(this._db, 'ratings'), (0, firestore_1.where)('rating', '>=', 2));
            const querySnapshot = yield (0, firestore_1.getDocs)(q);
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
exports.default = new RatingsApi();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTZDO0FBQzdDLHdDQUE2RTtBQUM3RSxrREFTNEI7QUFFNUIsTUFBTSxjQUFjLEdBQUc7SUFDbkIsTUFBTSxFQUFFLHlDQUF5QztJQUNqRCxVQUFVLEVBQUUsc0NBQXNDO0lBQ2xELFNBQVMsRUFBRSxzQkFBc0I7SUFDakMsYUFBYSxFQUFFLGtDQUFrQztJQUNqRCxpQkFBaUIsRUFBRSxlQUFlO0lBQ2xDLEtBQUssRUFBRSw0Q0FBNEM7SUFDbkQsYUFBYSxFQUFFLGNBQWM7Q0FDaEMsQ0FBQztBQUVGLE1BQU0sVUFBVTtJQVFaLGdCQUFlLENBQUM7SUFFaEIsSUFBSTtRQUNBLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBQSxtQkFBYSxFQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzFDLDZDQUE2QztRQUM3QyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUEsd0JBQVksRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFBLGNBQU8sRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFFSywwQkFBMEI7O1lBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSztnQkFBRSxPQUFPLEtBQUssQ0FBQztZQUU5QixNQUFNLE1BQU0sR0FBRyxJQUFBLGVBQUcsRUFBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFELE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBQSxrQkFBTSxFQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXJDLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUNs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