import React, { useState, useEffect } from 'react';
// import app from '../firebase'
import UserDataService from "../services/userSellerServices";


function DemoFirestore() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    // const ref = app.firestore().collection('User')

    // const getUsers = () => {
    //     setLoading(true)
    //     ref.onSnapshot((querySnapshot) => {
    //         const us = []
    //         querySnapshot.forEach((doc) => {
    //             us.push(doc.data())
    //         })
    //         setUsers(us)
    //         setLoading(false)
    //     });
    // }

    // const getUsers2 = () => {
    //     setLoading(true)
    //     ref.get().then((item) => {
    //         const items = item.docs.map((doc) => doc.data());
    //         setUsers(items)
    //         setLoading(false)
    //     })
    // }

    const getUsers3 = async () => {
        setLoading(true)
        const data = await UserDataService.getAllUser()
        setUsers(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
        setLoading(false)
    }

    useEffect(() => {
        // getUsers()
        // getUsers2()
        getUsers3()
    }, [])

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <h1>Users</h1>
            {
                users.map((user) => (
                    <div key={user.id}>
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default DemoFirestore;
