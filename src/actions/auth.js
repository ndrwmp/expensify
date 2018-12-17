import { firebase, googleAuthProvider, twitterAuthProvider, githubAuthProvider } from '../firebase/firebase';

export const catchError = (error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    
    alert("Error code " + errorCode + ": " + errorMessage);
};

export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

export const startLoginWithGoogle = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider).catch(catchError);
    };
};

export const startLoginWithTwitter = () => {
    return () => {
        return firebase.auth().signInWithPopup(twitterAuthProvider).catch(catchError);
    };
};

export const startLoginWithGithub = () => {
    return () => {
        return firebase.auth().signInWithPopup(githubAuthProvider).catch(catchError);
    };
};

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};