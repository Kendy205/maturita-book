import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics"
import "firebase/performance"
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  
}

export const analytics = firebase.analytics;
export const perf = firebase.performance

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const increment = firebase.firestore.FieldValue.increment;
// LoginPage
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export async function getBooksFromCategory(bookCategory) {
  const bookCategoryRef = firestore.collection('books');
  const query = bookCategoryRef.where('category_id', "==", bookCategory);
  const booksDocs = await query.get();
  console.log("getBooksFromCategory" + booksDocs)
  return booksDocs;
}

export async function getBookFromBookId(bookid) {
  const bookRef = firestore.collection('books');
  const query = bookRef.where('name_id', "==", bookid).limit(1);
  const bookDoc = (await query.get()).docs[0];
  return bookDoc;
}

export const getComments = (bookId) => {
  const commentSnapshot = firestore.collection("books").doc(`${bookId}`).collection("comments").get()
  return commentSnapshot
}

export const {serverTimestamp}  = firebase.firestore.FieldValue;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;

export function postToJSON(data) {
  return {
    ...data,
    createdAt: data.createdAt.toMillis() || 0
  }
}

export function postToJSONWithoutMilis(doc) {
  let data = doc.data()
  return {
    ...data,
  }
}