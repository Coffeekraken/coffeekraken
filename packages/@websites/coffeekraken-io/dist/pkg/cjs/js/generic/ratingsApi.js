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
const analytics_1 = require("firebase/analytics");
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
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
        this._app = (0, app_1.initializeApp)(firebaseConfig);
        const analytics = (0, analytics_1.getAnalytics)(this._app);
        this._db = (0, firestore_1.getFirestore)(this._app);
        this._auth = (0, auth_1.getAuth)(this._app);
        this._auth.languageCode = "en";
    }
    getRatingObjForCurrentUser() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._user)
                return false;
            const docRef = (0, firestore_1.doc)(this._db, "ratings", this._user.email);
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
            yield (0, firestore_1.setDoc)((0, firestore_1.doc)(this._db, "ratings", this._user.email), {
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
            const q = (0, firestore_1.query)((0, firestore_1.collection)(this._db, "ratings"), (0, firestore_1.where)("rating", ">=", 2));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsa0RBQWtEO0FBQ2xELHNDQUE2QztBQUM3Qyx3Q0FBNkU7QUFDN0Usa0RBUzRCO0FBRTVCLE1BQU0sY0FBYyxHQUFHO0lBQ3JCLE1BQU0sRUFBRSx5Q0FBeUM7SUFDakQsVUFBVSxFQUFFLHNDQUFzQztJQUNsRCxTQUFTLEVBQUUsc0JBQXNCO0lBQ2pDLGFBQWEsRUFBRSxrQ0FBa0M7SUFDakQsaUJBQWlCLEVBQUUsZUFBZTtJQUNsQyxLQUFLLEVBQUUsNENBQTRDO0lBQ25ELGFBQWEsRUFBRSxjQUFjO0NBQzlCLENBQUM7QUFFRixNQUFNLFVBQVU7SUFRZDtRQUNFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBQSxtQkFBYSxFQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sU0FBUyxHQUFHLElBQUEsd0JBQVksRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFBLHdCQUFZLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBQSxjQUFPLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUNqQyxDQUFDO0lBRUssMEJBQTBCOztZQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUs7Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFFOUIsTUFBTSxNQUFNLEdBQUcsSUFBQSxlQUFHLEVBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxRCxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUEsa0JBQU0sRUFBQyxNQUFNLENBQUMsQ0FBQztZ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