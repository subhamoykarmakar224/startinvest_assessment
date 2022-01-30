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
import { TB_USER_SELLER } from '../utils/Constants'

const userSellerCollectionRef = collection(db, TB_USER_SELLER)

class UserSellerDataService {
  addUser = (newUser) => {
    return addDoc(userSellerCollectionRef, newUser)
  }

  updateUser = (id, updatedUser) => {
    const userDoc = doc(db, TB_USER_SELLER, id)
    return updateDoc(userDoc, updatedUser)
  }

  deleteUser = (id) => {
    const bookDoc = doc(db, TB_USER_SELLER, id)
    return deleteDoc(bookDoc)
  }

  getAllUser = (newUser) => {
    return getDocs(userSellerCollectionRef)
  }

  getUser = (id) => {
    const bookDoc = doc(db, TB_USER_SELLER, id)
    return getDoc(bookDoc)
  }
}


export default new UserSellerDataService();
