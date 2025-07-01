import { auth } from './firebaseClient';

export async function getIdToken() {
    const user = auth.currentUser;
    if (!user) return null;

    return await user.getIdToken(true); // 'true' to refresh token
}