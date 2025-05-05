/**  we are creating a global state where we can store the currently authenticated user with the functions such as login,logout,signup */

import {create} from "zustand";
import axios from "axios";
import toast from "react-hot-toast";


// we are returning the object from the hook,whatever we return from this object is going to be state for us
export const useAuthStore=create((set)=>({
    user:null,
    isSigningUp:false,
    isCheckingAuth: true,
    signup:async(credentials)=>{
        // in try we will send a request to our endpoint
        set({isSigningUp:true})
        try{
            const response=await axios.post(`/api/v1/auth/signup`,credentials);
            // once we signup we can set the "user" state
            set({user:response.data.user,isSigningUp:false});
            toast.success("Account created successfully");


        }
        catch(error){
            toast.error(error.response.data.message || "Signup failed");
            set({isSigningUp:false,user:null})

        }
    },
    login: async (credentials) => {
        set({ isLoggingIn: true });
		try {
			const response = await axios.post("/api/v1/auth/login", credentials);
			set({ user: response.data.user, isLoggingIn: false });
		} catch (error) {
			set({ isLoggingIn: false, user: null });
			toast.error(error.response.data.message || "Login failed");
		}
		
	},
    logout:async () => {
		set({ isLoggingOut: true });
		try {
			await axios.post("/api/v1/auth/logout");
			set({ user: null, isLoggingOut: false });
			toast.success("Logged out successfully");
		} catch (error) {
			set({ isLoggingOut: false });
			toast.error(error.response.data.message || "Logout failed");
		}
	},
    authCheck: async () => {
		set({ isCheckingAuth: true });
		try {
			const response = await axios.get("/api/v1/auth/authCheck");

			set({ user: response.data.user, isCheckingAuth: false });
		} catch (error) {
			set({ isCheckingAuth: false, user: null });
			// toast.error(error.response.data.message || "An error occurred");
		}
	},


}))