import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase'
const AuthContext = React.createContext()

// we get access to AuthContext using the useAuth hook
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [userRole, setUserRole] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password, role) {
        setUserRole(role)
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password, role) {
        setUserRole(role)
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(newEmail) {
        currentUser.updateEmail(newEmail)
    }

    function updatePassword(password) {
        currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        userRole,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
