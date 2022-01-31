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
import { TB_COMMENTS } from '../utils/Constants'

const buyerCommentProductRef = collection(db, TB_COMMENTS)

class BuyerCommentProductService {
    getAllComments = (productId) => {
        const q = query(buyerCommentProductRef, where('productId', '==', productId))
        return getDocs(q)
    }

    addComment = (commentData) => {
        return addDoc(buyerCommentProductRef, commentData)
    }

    updateComment = (comment_id, updatedData) => {
        const commentDoc = doc(db, TB_COMMENTS, comment_id)
        return updateDoc(commentDoc, updatedData)
    }

    deleteComment = (comment_id) => {
        const commentDoc = doc(db, TB_COMMENTS, comment_id)
        return deleteDoc(commentDoc)
    }
}


export default new BuyerCommentProductService();
