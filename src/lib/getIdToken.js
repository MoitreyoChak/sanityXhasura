import { auth } from './firebaseClient';

export async function getIdToken() {
    const user = auth.currentUser;
    if (!user) {
        console.warn("No user is currently signed in");
        return null;
    }

    return await user.getIdToken(true); // 'true' to refresh token
}