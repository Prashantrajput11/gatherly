// src/store/authStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../utils/supabase";

const useAuthStore = create(
	persist(
		(set, get) => ({
			session: null,
			user: null,
			loading: false,
			error: null,

			setSession: (session) => set({ session }),
			setUser: (user) => set({ user }),

			// Sign in with email and password
			signIn: async (email, password) => {
				set({ loading: true, error: null });
				try {
					const { data, error } = await supabase.auth.signInWithPassword({
						email,
						password,
					});

					if (error) throw error;

					set({
						session: data.session,
						user: data.user,
						loading: false,
					});
					return true;
				} catch (error) {
					set({ error: error.message, loading: false });
					return false;
				}
			},

			// Sign up with email and password
			signUp: async (email, password) => {
				set({ loading: true, error: null });
				try {
					const { data, error } = await supabase.auth.signUp({
						email,
						password,
					});

					if (error) throw error;

					set({
						session: data.session,
						user: data.user,
						loading: false,
					});
					return true;
				} catch (error) {
					set({ error: error.message, loading: false });
					return false;
				}
			},

			// Sign out
			signOut: async () => {
				set({ loading: true });
				try {
					const { error } = await supabase.auth.signOut();
					if (error) throw error;

					set({
						session: null,
						user: null,
						loading: false,
						error: null,
					});
					return true;
				} catch (error) {
					set({ error: error.message, loading: false });
					return false;
				}
			},

			// Check if user is authenticated
			isAuthenticated: () => {
				const state = get();
				return !!state.session?.access_token;
			},

			// Reset error state
			clearError: () => set({ error: null }),
		}),
		{
			name: "auth-storage",
			storage: createJSONStorage(() => AsyncStorage),
			partialize: (state) => ({
				session: state.session,
				user: state.user,
			}),
		}
	)
);

export default useAuthStore;
