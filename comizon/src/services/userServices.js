import { db } from '../firebase'
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore'

const userCollectionRef = collection(db, 'User')

class UserDataService {
  addUser = (newUser) => {
    return addDoc(userCollectionRef, newUser)
  }

  updateUser = (id, updatedUser) => {
    const userDoc = doc(db, "User", id)
    return updateDoc(userDoc, updatedUser)
  }

  deleteUser = (id) => {
    const bookDoc = doc(db, "User", id)
    return deleteDoc(bookDoc)
  }

  getAllUser = (newUser) => {
    return getDocs(userCollectionRef)
  }

  getUser = (id) => {
    const bookDoc = doc(db, "books", id)
    return getDoc(bookDoc)
  }
}


export default new UserDataService();
