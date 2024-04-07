## Recap of Part 4: Advancing Authentication with creating frontend components and routes for managing auth

In Part 4, we advanced our authentication implementation by creating frontend components and routes for managing authentication. We created the Register and Login components, allowing users to register for an account and log in, respectively. These components handle user input, form submission, and interaction with the backend server for authentication.

Additionally, we created the PageAuth component, which serves as the entry point for users to either log in or register. Depending on the user's choice, the component renders either the Login or Register component and provides a toggle option for switching between them.

Furthermore, we ensured routing with React Router DOM by setting up routes for the homepage, authentication, and 404 error handling. This ensures seamless navigation within the application and provides a smooth user experience.

Finally, we created the Logout component, allowing users to log out of their accounts. This component sends a request to the server to logout, clears user details, updates the authentication state, and redirects the user to the login page or homepage after successful logout.

# Part 5: Advancing Authentication with persisting login at front end

## Step 8: Create the Persist Login Component

### Step 8: Implementing Persistent Login State

In this step, we create the `PersistLogin` component responsible for maintaining the user's authentication state across page reloads or browser sessions. This component ensures that users remain logged in even after refreshing the page by persisting their login details in the browser's local storage.

**Key Features:**

- The `PersistLogin` component utilizes React's `useEffect` hook to initialize the authentication state upon component mount.
- It retrieves the user's authentication details from local storage and checks if an access token is present.
- If the access token is missing, indicating an expired session, the component attempts to refresh the token by sending a request to the server.
- Upon successful token refresh, the component updates the authentication state with the new access token.
- If the token refresh fails, the user is automatically logged out, ensuring the security and integrity of the authentication process.
- Once the authentication state is initialized, the component renders its children, allowing the application to proceed with the authenticated user.

>```javascript
>import { useEffect, useContext, useState } from "react";
>import { AuthContext } from "../context/authContext";
>import axiosInstance from "../network/axiosInstance";
>import { ContainerProps } from "../models/model";
>
>function PersistLogin({ children }:ContainerProps) {
>    const { login, logout } = useContext(AuthContext);
>    const [isLoading, setLoading] = useState(true);
>
>    const refreshAccessToken = async () => {
>        try {
>            // get access token from backend
>            const response = await axiosInstance.get("/auth/refresh");
>            return response.data;
>        } catch (error) {
>            console.error("Error refreshing access token:", error);
>            return null;
>        }
>    };
>
>    useEffect(() => {
>        const initializeAuth = async () => {
>            // get user details saved during login
>            const userDetailsString = localStorage.getItem
>                                      ("userDetails");
>            if (userDetailsString) {
>                const userDetails = JSON.parse(userDetailsString);
>                if (!userDetails.accessToken) {
>                    /* User is considered authenticated but 
>                       lacks an accessToken, attempt to refresh it */
>                    const refreshedData = await refreshAccessToken();
>                    if (refreshedData) {
>                        login({ ...userDetails, 
>                                accessToken: refreshedData
>                                             .accessToken });
>                    } else {
>                      /* If token refresh fails, consider 
>                         the session expired and logout*/
>                        logout();
>                    }
>                } else {
>                  /* If accessToken is present, 
>                     directly populate the state with 
>                     stored details */
>                    login(userDetails);
>                }
>            }
>            setLoading(false);
>        };
>
>        initializeAuth();
>    }, [login, logout]);
>
>    if (isLoading) {
>        return <p>Loading...</p>;
>    }
>
>    return <>{children}</>;
>}
>
>export default PersistLogin;
>```

Congratulations on reaching the end of this journey in enhancing your application's authentication system! Over the course of five comprehensive parts, we've taken significant steps to secure our Node.js and React application using JSON Web Tokens (JWT). Here's a quick recap of what we've accomplished together:

## Part 1: Backend Setup and User Registration
- **Initialized** our Node.js project with essential dependencies.
- **Crafted** a User model to manage user data effectively.
- **Implemented** a user registration process, complete with email verification to ensure a secure start for user accounts.

## Part 2: Email Verification, User Login, and Token Management
- **Established** a secure login process that verifies user credentials and generates JWTs.
- **Designed** a token refresh mechanism to maintain user sessions without compromising security.
- **Created** a user logout process to securely terminate sessions.

## Part 3: Setting Up the React Frontend
- **Set up** a React application and configured Axios for making HTTP requests.
- **Implemented** global state management using React Context for handling authentication states.
- **Configured** routing with React Router DOM to enable seamless navigation within our application.

## Part 4: Frontend Components for Authentication
- **Developed** Register and Login components for handling user registration and login.
- **Introduced** the PageAuth component as a central point for users to log in or register, with options to switch between these two actions.
- **Ensured** secure routing and user experience enhancements with the Logout component, facilitating a seamless logout process.

## Part 5: Persisting Login State on the Frontend
- **Finalized** our authentication journey by creating the `PersistLogin` component, ensuring users remain logged in across page reloads and browser sessions.
- **Integrated** advanced mechanisms to refresh tokens automatically, ensuring uninterrupted user sessions.

## Final Thoughts
By now, your application should have a robust authentication system in place, leveraging JWT for secure communication between the frontend and backend. These enhancements not only secure your application but also provide a seamless and user-friendly experience. 

Remember, the world of web security is always evolving. It's crucial to stay informed about the latest security practices and continually assess and update your application's security measures.

Thank you for following along on this journey. Here's to creating more secure and user-friendly applications!
