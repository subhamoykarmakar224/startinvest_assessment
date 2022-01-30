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
  where
} from 'firebase/firestore'
import { TB_PRODUCTS } from '../utils/Constants'

const sellerProductRef = collection(db, TB_PRODUCTS)

class SellerProductDataService {
  addProduct = (newProduct) => {
    return addDoc(sellerProductRef, newProduct)
  }

  updateProduct = (id, updatedProduct) => {
    const productDoc = doc(db, TB_PRODUCTS, id)
    return updateDoc(productDoc, updatedProduct)
  }

  deleteProduct = (id) => {
    const productDoc = doc(db, TB_PRODUCTS, id)
    return deleteDoc(productDoc)
  }

  getAllProducts = (sellerId) => {
    const q = query(sellerProductRef, where('seller_id', '==', sellerId))
    return getDocs(q)
  }

  getProduct = (id) => {
    const productDoc = doc(db, TB_PRODUCTS, id)
    return getDoc(productDoc)
  }
}


export default new SellerProductDataService();
