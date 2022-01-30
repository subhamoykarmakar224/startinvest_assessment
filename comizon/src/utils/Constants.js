export const TB_USER_BUYER='users_buyer'
export const TB_USER_SELLER='users_seller'

export const TB_PRODUCTS='products'


export const TB_SELLER_TRANX_HISTROY='sellerhistory'


export const TB_BUYER_TRANX_HISTROY='buyerhistory'


export const TB_COMMENTS='comments'


/*
Collection Names:
users_buyer (buyer_id(PK), email, role)
users_seller (seller_id(PK), email, role)
users_admin (admin_id(PK), email, role)

products (product_id(PK), title, description, price, image_id, seller_id(FK))
seller_history (transaction_id(PK), product_id(FK), timestamp, user_id, quantity, total_price)
buyer_history (transaction_id(PK), product_id(FK), timestamp, quantity, total_price)
comments(comment_id, product_id, buyer_id, stars, comment)

*/