import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDrollyyUHCBaXgIbcRZrAsCaTWkOIR34k",
    authDomain: "new-stonks.firebaseapp.com",
    projectId: "new-stonks",
    storageBucket: "new-stonks.appspot.com",
    messagingSenderId: "816083621534",
    appId: "1:816083621534:web:21dd8b343ed44d67880d8f",
    measurementId: "G-2C535LQL9Q"

};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;

export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

/**
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) { 
    const usersRef = firestore.collection('users');                         
    const query = usersRef.where('username', '==', username).limit(1);      
    const userDoc = (await query.get()).docs[0];                            
    return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
    const data = doc.data();
    return {
        ...data,
        createdAt: data?.createdAt.toMillis() || 0,
        updatedAt: data?.updatedAt.toMillis() || 0,
    };
}
