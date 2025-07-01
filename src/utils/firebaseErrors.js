export const getFirebaseErrorMessage = (errorCode) => {
    const errorMessages = {
        'auth/email-already-in-use': 'This email address is already registered. Please use a different email or try signing in.',
        'auth/weak-password': 'Password is too weak. Please choose a stronger password with at least 6 characters.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/operation-not-allowed': 'Email/password accounts are not enabled. Please contact support.',
        'auth/user-not-found': 'No account found with this email address. Please check your email or sign up.',
        'auth/wrong-password': 'Incorrect password. Please try again.',
        'auth/user-disabled': 'This account has been disabled. Please contact support.',
        'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
        'auth/network-request-failed': 'Network error. Please check your internet connection and try again.',
        'auth/invalid-credential': 'Invalid email or password. Please check your credentials and try again.',
        'auth/requires-recent-login': 'Please sign in again to complete this action.',
        'auth/credential-already-in-use': 'This credential is already associated with a different user account.',
        'auth/invalid-verification-code': 'Invalid verification code. Please try again.',
        'auth/invalid-verification-id': 'Invalid verification ID. Please try again.',
        'auth/missing-verification-code': 'Please enter the verification code.',
        'auth/missing-verification-id': 'Missing verification ID.',
        'auth/code-expired': 'The verification code has expired. Please request a new one.',
        'auth/popup-closed-by-user': 'Sign-in popup was closed before completing the process.',
        'auth/popup-blocked': 'Sign-in popup was blocked by the browser. Please allow popups and try again.',
        'auth/unauthorized-domain': 'This domain is not authorized for OAuth operations.',
        'auth/account-exists-with-different-credential': 'An account already exists with the same email but different sign-in credentials.',

        // Default message
        'default': 'An unexpected error occurred. Please try again.'
    };

    return errorMessages[errorCode] || errorMessages['default'];
};

export const handleFirebaseError = (error) => {
    console.error('Firebase Error:', error);

    // Check if it's a Firebase error with a code
    if (error.code) {
        return getFirebaseErrorMessage(error.code);
    }

    // Handle other types of errors
    if (error.message) {
        if (error.message.includes('duplicate key') || error.message.includes('already exists')) {
            return 'This account already exists. Please try signing in instead.';
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
            return 'Network error. Please check your connection and try again.';
        }
    }

    return getFirebaseErrorMessage('default');
};

