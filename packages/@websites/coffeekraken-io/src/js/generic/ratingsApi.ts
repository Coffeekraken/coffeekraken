import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";

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
  _app;
  _db;
  _auth;
  _googleProvider;
  _user;
  _ratingObj;

  constructor() {
    this._app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(this._app);
    this._db = getFirestore(this._app);
    this._auth = getAuth(this._app);
    this._auth.languageCode = "en";
  }

  async getRatingObjForCurrentUser() {
    if (!this._user) return false;

    const docRef = doc(this._db, "ratings", this._user.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this._ratingObj = docSnap.data();
      return this._ratingObj;
    }
    return;
  }

  async _signInWithGoogle() {
    this._googleProvider = new GoogleAuthProvider();

    const result = await signInWithPopup(this._auth, this._googleProvider);

    const userObj = {
      email: result.user.email,
      name: result.user.displayName,
      pictureUrl: result.user.photoURL,
    };

    this._user = userObj;

    return userObj;
  }

  async create(ratingObj) {
    if (!this._user?.email) return;
    await setDoc(doc(this._db, "ratings", this._user.email), {
      email: this._user.email,
      name: this._user.name,
      pictureUrl: this._user.pictureUrl,
      rating: ratingObj.rating,
      comment: ratingObj.comment,
    });
  }

  async read() {
    const q = query(collection(this._db, "ratings"), where("rating", ">=", 2));

    const querySnapshot = await getDocs(q);
    const ratings: any = [];
    querySnapshot.forEach((doc) => {
      ratings.push(doc.data());
      ratings.push(doc.data());
      ratings.push(doc.data());
      ratings.push(doc.data());
      ratings.push(doc.data());
      ratings.push(doc.data());
      ratings.push(doc.data());
      ratings.push(doc.data());
      ratings.push(doc.data());
      ratings.push(doc.data());
    });
    return ratings;
  }
}

export default new RatingsApi();
