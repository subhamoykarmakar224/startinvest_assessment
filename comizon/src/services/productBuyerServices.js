import { db } from '../firebase'
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  startAt,
  endAt
} from 'firebase/firestore'
import { TB_PRODUCTS } from '../utils/Constants'

const buyerProductRef = collection(db, TB_PRODUCTS)

class SellerProductDataService {
  getAllProducts = (searchString) => {
    if (searchString === '') {
      return getDocs()
    } else {
      const q = query(buyerProductRef,
        orderBy('title'),
        startAt(searchString),
        endAt(searchString + '~')
      )
      return getDocs(q)
    }
  }

  getPurchaseHistory() {

  }

  getProduct = (id) => {
    const productDoc = doc(db, TB_PRODUCTS, id)
    return getDoc(productDoc)
  }
}


export default new SellerProductDataService();
