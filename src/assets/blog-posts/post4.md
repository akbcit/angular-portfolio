## Recap of Part 3: Advancing Authentication with setting up Auth Management in React

In Part 3, we transitioned to integrating authentication features into a React frontend. We began by setting up a new React application and then proceed with installing and configuring Axios for handling HTTP requests. 

We also set up global state management For Authentication to manage authentication state across the React application by employing React Context. The AuthProvider component now serves as the provider for the AuthContext, maintaining authentication state and providing functions for updating it. A custom hook named useAuth was defined to allow components easy access to the authentication context.

# Part 4: Advancing Authentication with creating frontend components and routes for managing auth

## Step 3: Create the Register Component

In this step, we'll create the Register component responsible for rendering a form where users can input their username, email, and password to register for an account. This component will handle user input and submission of the registration form.

Here's a breakdown of the code:

- The Register component is a functional component that utilizes React's useState hook to manage state for the username, email, and password fields.

- Inside the component, we define a handleSubmit function to handle form submission. It prevents the default form submission behavior and logs the user input to the console for demonstration purposes.

- The form element renders input fields for username, email, and password. Each input field is associated with its respective state variable (username, email, password), and their values are controlled by the state. The onChange event handlers update the state variables as the user types into the input fields.

- When the user clicks the Register button, the handleSubmit function is triggered, capturing the user input and triggering the desired action (in this case, logging the input to the console).

This Register component serves as the foundation for the user registration feature in your React application, allowing users to input their credentials securely.

```javascript
import { useState, FormEvent } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Register with:', { username, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
```

## Step 4: Implement the Login Component

In this step, we create the Login component responsible for rendering a form where users can input their email and password to log in. This component interacts with the backend server to authenticate the user's credentials.

Key Features:

- The Login component is a functional component that utilizes React's useState and useContext hooks to manage state and access the AuthContext.
- Inside the component, we define a handleSubmit function to handle form submission. It sends a POST request to the backend endpoint "/auth/login" with the user's email and password.
- Upon successful login, the response data containing user details (such as accessToken) is passed to the login method provided by the AuthContext. The user is then redirected to the homepage ("/").
- If there's an error during login, such as invalid credentials, an error message is displayed to the user.

This Login component serves as the entry point for users to authenticate and access protected routes within the application.

```javascript
import { useState, FormEvent, useContext } from 'react';
import axiosInstance from '../network/axiosInstance';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // Use the login method provided by AuthContext
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axiosInstance.post("/auth/login", { email, password });
      if (response.data) {
        console.log(response.data);
        login(response.data); 
        // Navigate to the homepage upon successful login
        navigate("/"); 
      }
    } catch (error) {
      setError('Failed to login. Please check your credentials and try again.');
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>Login</button>
    </form>
  );
};
export default Login;
```
## Step 5: Create the Auth Page

In this step, we create the PageAuth component responsible for rendering either the Login or Register component based on the user's choice. The component also provides a toggle option for users to switch between login and registration forms.

Key Features:

- The PageAuth component uses state to manage the current form state, which can be either "Login" or "Register".
- Depending on the current form state, the component renders either the Login or Register component.
- A prompt text is displayed above the form, allowing users to easily switch between login and registration forms.
- The useEffect hook listens for changes in authentication status. If the user is already authenticated, they are redirected to another page or informed that they are already logged in.
- The changeFormState function toggles between the "Login" and "Register" forms when the prompt text is clicked.

The PageAuth component serves as the entry point for users to either log in or register within the application.

>```javascript
>import { useEffect, useState, useContext } from "react";
>"../styles/PageAuth.scss";
>import Login from "../components/Login";
>import Register from "../components/Register";
>import useGetUserDetails from "../hooks/useGetUserDetails"; 
>import { AuthContext } from "../context/authContext";
>
>function PageAuth() {
>    const [currForm, setCurrForm] = useState("Login");
>    const [promptText, setPromptText] = useState("Don't have an account? Sign up now!");
>    const { authState } = useContext(AuthContext);
>
>    useEffect(() => {
>    }, [authState.isAuth]);
>
>    // Use the custom hook to get user details
>    const userDetails = useGetUserDetails();
>    const isAuth = userDetails?.isAuth;  
>
>    useEffect(() => {
>        // Update the prompt text based on the current form
>        setPromptText(currForm === "Login" ? "Don't have an account? Sign up now!" : "Have an account? Login now!");
>    }, [currForm]);
>
>    const changeFormState = () => {
>        // Toggle between Login and SignUp forms
>        setCurrForm(currForm === "Login" ? "SignUp" : "Login");
>    }
>
>    // Redirect or inform the user if already logged in
>    if (isAuth) {
>        return <p>You are logged in!</p>;
>    }
>
>    return (
>        <>
>            <p id="form-state-control" onClick={changeFormState}>{promptText}</p>
>            {currForm === "Login" ? <Login /> : <Register />}
>        </>
>    );
>}
>
>export default PageAuth;
>```

## Step 6: Ensure Routing with React Router DOM

In this step, we set up routing for our application using React Router DOM. The BrowserRouter component wraps the entire application, enabling client-side routing.

Key Features:

- The BrowserRouter component from React Router DOM enables client-side routing.
- Routes are defined using the Routes component, where each Route specifies a path and the corresponding component to render.
- We define routes for the homepage ("/"), authentication ("/auth"), and a wildcard route ("/*") for handling 404 errors.
- Each route is associated with a specific component: PageHome, PageAuth, and Page404.

Routing ensures that users can navigate between different pages of the application seamlessly, providing a smooth and intuitive user experience.

```javascript
> import './App.scss';
> import { BrowserRouter, Routes, Route } from 'react-router-dom';
> import PageHome from './pages/PageHome';
> import Page404 from './pages/Page404';
> import PageAuth from './pages/PageAuth';
> import { AuthProvider } from './context/authContext';
> import MainNavigation from './components/MainNavigation';
> import PersistLogin from './components/PersistLogin';
> 
> function App() {
> 
>   return (
>     <AuthProvider>
>       <PersistLogin>
>         <BrowserRouter>
>           <MainNavigation />
>           <main>
>             <Routes>
>               <Route path="/" element={<PageHome />} />
>               <Route path="/auth" element={<PageAuth />} />
>               <Route path="/*" element={<Page404 />} />
>             </Routes>
>           </main>
>         </BrowserRouter>
>       </PersistLogin>
>     </AuthProvider>
>   )
> }
> 
> export default App;
```

The `MainNavigation` component handles navigation throughout the application, providing users with an intuitive way to move between different pages and sections.

The `PersistLogin` component ensures that user authentication remains persistent across page reloads or browser sessions, enhancing the user experience by maintaining login states seamlessly.

More on these in next steps!

## Step 7: Creating the Logout Component

In this step, we'll create the `Logout` component, which allows users to log out of their accounts. This component will send a request to the server to logout, clear user details and update the authentication state, and then redirect the user to the login page or homepage after successful logout.

The `Logout` component is responsible for handling the logout functionality and ensuring a smooth user experience when logging out of the application.

> ```javascript
> import { useContext } from "react";
> import { useNavigate } from "react-router-dom";
> import { AuthContext } from "../context/authContext";
> import useAxiosPrivate from "../hooks/useAxiosPrivate";
> import "../styles/Logout.scss";
> 
> function Logout() {
>   const { logout } = useContext(AuthContext); 
>   const axiosPrivate = useAxiosPrivate();
>   const navigate = useNavigate();
> 
>   const handleLogout = async () => {
>     try {
>       // Make the logout request to the server
>       await axiosPrivate.get("/auth/logout");
> 
>       // Clear user details and update auth state by calling logout 
>       logout();
> 
>       // Navigate to the login page or homepage after logout
>       navigate('/auth');
>     } catch (error) {
>       console.error("Logout failed:", error);
>     }
>   };
> 
>   return <p id="logout-link" onClick={handleLogout}>Logout</p>;
> }
> 
> export default Logout;
> ```
