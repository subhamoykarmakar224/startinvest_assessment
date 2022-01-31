import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
})

// authentication instance
export const auth = app.auth() 
export const db = getFirestore(app)
export const storage = getStorage(app)

// export const storage = getStorage(app)
// export const storageRef = ref(storage)

// Firebase instance
export default app
