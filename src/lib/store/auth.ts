// auth.ts
import { writable } from 'svelte/store';
import { auth } from './firebase';
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
	onAuthStateChanged,
	type User
} from 'firebase/auth';

export interface AuthState {
	user: User | null;
	loading: boolean;
}

const createAuthStore = () => {
	// Initially: user is not defined, loading is in progress
	const { subscribe, set, update } = writable<AuthState>({ user: null, loading: true });

	// Monitor authentication changes
	onAuthStateChanged(auth, (user) => {
		// After receiving data from Firebase, we consider loading to be complete
		set({ user, loading: false });
	});

	return {
		subscribe,

		async login(email: string, password: string) {
			try {
				const result = await signInWithEmailAndPassword(auth, email, password);
				update(() => ({ user: result.user, loading: false }));
			} catch (error) {
				console.error('Login failed:', error);
			}
		},

		async signUp(email: string, password: string) {
			try {
				const result = await createUserWithEmailAndPassword(auth, email, password);
				update(() => ({ user: result.user, loading: false }));
			} catch (error) {
				console.error('Sign up failed:', error);
			}
		},

		async logout() {
			try {
				await signOut(auth);
				update(() => ({ user: null, loading: false }));
			} catch (error) {
				console.error('Logout failed:', error);
			}
		},

		async loginWithGoogle() {
			const provider = new GoogleAuthProvider();
			try {
				const result = await signInWithPopup(auth, provider);
				update(() => ({ user: result.user, loading: false }));
			} catch (error) {
				console.error('Login with Google failed:', error);
			}
		},

		getUser() {
			return auth.currentUser;
		}
	};
};

export const authStore = createAuthStore();
