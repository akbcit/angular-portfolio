## Recap of Part 2: Advancing Authentication with Login, Token Management, and Security Enhancements

In Part 2, we've significantly expanded our authentication system by implementing vital functionalities: **User Login**, **Token Refresh**, and **User Logout**. Each step was carefully designed to enhance both security and user experience, from validating login credentials to managing JWTs efficiently.

We introduced **HTTP-only cookies** and the practice of storing session information in the database. These measures are pivotal in our security architecture. HTTP-only cookies minimize the risk of token theft through XSS attacks, and storing sessions in the database allows for granular control over user sessions. This includes the secure handling and verification of refresh tokens, making our authentication process not only more secure but also robust against potential security threats.

# Part 3: Advancing Authentication with setting up Auth Management in React

In this section, we'll focus on integrating authentication features into a React frontend. We'll start by setting up a new React application using `npm create vite@latest` and then proceed to install and configure Axios for handling HTTP requests. Assuming that a react app is setup, let's dive deeper. 

## Step 1: Setting Up Axios Instance and Configuring Vite

To facilitate HTTP requests in our React application, we'll set up an Axios instance. This instance will be configured with the base URL of our backend API and include options to handle JSON content and enable credentials for cross-origin requests.

```javascript
// axiosInstance.js

import axios from "axios";

const BASE_URL = "/api";

export default axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
});
```

To avoid CORS issues and proxy requests to the backend, we'll configure Vite's development server to proxy requests to our backend API. This setup ensures that our React frontend can communicate seamlessly with the backend during development.

```javascript
// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Adjust the backend URL accordingly
    proxy:{
      '/api':'http://[::1]:3004/'  
    },
    watch:{
      usePolling:true,
    },
    host:"0.0.0.0",
  }
})
```

## Step 2: Global State Management For Authentication

To manage authentication state globally across your React application, we'll utilize React Context. This approach ensures that authentication-related data, such as the user's authentication status, email, first name, and access token, can be accessed from any component without the need for prop drilling.

Here's a breakdown of the code:

- We define the initial state for authentication using the AuthState model, containing properties such as `isAuth`, `email`, `first_name`, and `accessToken`.

- Next, we create a context named `AuthContext` with the `createContext` function provided by React. This context will hold the authentication state and functions for updating it.

- The `AuthProvider` component serves as the provider for the `AuthContext`. It maintains the authentication state using the `useState` hook and exposes `login` and `logout` functions to update the state accordingly. When a user logs in, the `login` function is called to update the state and store user details in local storage. Similarly, the `logout` function resets the state and removes user details from local storage.

- Finally, we define a custom hook named `useAuth`, which allows components to consume the authentication context. By invoking `useContext(AuthContext)`, components can access the authentication state and functions provided by the `AuthProvider`.

This setup ensures that authentication-related data is managed centrally and can be accessed and modified across various components in your React application.

>```javascript
>import React, { createContext, useState, useContext } from "react";
>import { AuthState, ContainerProps } from "../models/model";
>
>// Define the initial state based on the AuthState model
>const initialState: AuthState = {
>    isAuth: false,
>    email: "",
>    first_name: "",
>    accessToken: "",
>};
>
>/* Define the context value type with functions for 
>   updating the state */
>interface AuthContextType {
>    authState: AuthState;
>    login: (userDetails: AuthState) => void;
>    logout: () => void;
>}
>
>// Create the context with an initial placeholder value
>export const AuthContext = createContext<AuthContextType>(null!);
>
>// Component to provide the context value
>export const AuthProvider: React.FC<ContainerProps> = ({ children }) =>
>{
>    const [authState, setAuthState] = useState<AuthState>(initialState);
>
>    // Function to handle user login
>    const login = (userDetails: AuthState) => {
>        setAuthState({ ...userDetails, isAuth: true });
>        localStorage.setItem("userDetails", JSON.stringify
>({first_name:userDetails.first_name , email:userDetails.email,isAuth: >true }));
>    };
>
>    // Function to handle user logout
>    const logout = () => {
>        setAuthState(initialState);
>        localStorage.removeItem("userDetails");
>    };
>
>    return (
>        <AuthContext.Provider value={{ authState, login, logout }}>
>            {children}
>       </AuthContext.Provider>
>    );
>};
>
>// Custom hook to use the auth context
>export const useAuth = () => useContext(AuthContext);
>```