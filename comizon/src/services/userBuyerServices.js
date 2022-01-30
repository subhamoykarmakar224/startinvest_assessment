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
import { TB_USER_BUYER } from '../utils/Constants'

const userBuyerCollectionRef = collection(db, TB_USER_BUYER)

class UserBuyerDataService {
  addUser = (newUser) => {
    return addDoc(userBuyerCollectionRef, newUser)
  }

  updateUser = (id, updatedUser) => {
    const userDoc = doc(db, TB_USER_BUYER, id)
    return updateDoc(userDoc, updatedUser)
  }

  deleteUser = (id) => {
    const userDoc = doc(db, TB_USER_BUYER, id)
    return deleteDoc(userDoc)
  }

  getAllUser = (newUser) => {
    return getDocs(userBuyerCollectionRef)
  }

  getUser = (id) => {
    const userDoc = doc(db, TB_USER_BUYER, id)
    return getDoc(userDoc)
  }
}


export default new UserBuyerDataService();
