# Essential Prerequisites for Securing Your Node.js and React/JS Backend Application with JWT Part 1

As we prepare to dive deep into the implementation of JSON Web Tokens (JWT) for securing your application, it's essential to lay a solid foundation of the key concepts involved. This guide is designed to navigate you through the intricacies of enhancing the security of applications built using Node.js for the backend and React for the frontend.

## Why JWT?

JWTs provide a compact and self-contained method for securely transmitting information between parties as a JSON object. Employing JWTs not only verifies and secures the data exchanged but also streamlines the authentication and authorization processes. Throughout this exploration, you'll discover how to effectively leverage these tokens to fortify your application. To know more and play around, visit the **[official JWT website](https://jwt.io/)**.

## Prerequisites

This article is crafted for readers with an intermediate grasp of web technologies, alongside hands-on experience in **Node.js** and **React**. A comfort level with the essentials of building web applications and familiarity with concepts such as **HTTP requests**, **REST APIs**, and the **MVC architecture** is expected. Proficiency in **JavaScript** (ES6 and beyond) is also assumed.

For those new to Node.js, React, or JWTs, revisiting these topics beforehand may be beneficial. Nevertheless, I'll provide detailed explanations and resources throughout to bridge any knowledge gaps you may encounter.

Please note that this tutorial is in **TypeScript**, and it involves discussions on evolving technologies and security practices in web development. Remember, no system is entirely secure, so it's crucial to conduct your own research as well.

## Overall Flow

### Initial Setup and Registration

#### User Visits the Registration Page
- On the frontend, a user navigates to the registration page where they are prompted to enter their details (email, password, and possibly other personal information).

#### Form Submission and Backend Processing
- The user submits the registration form.
- The backend validates the user's input, hashes the password, and creates a new user record in the database marked as unverified.
- A verification email with a JWT link is sent to the user's email address.

#### Email Verification
- The user clicks the verification link in their email.
- The backend verifies the JWT from the link, marks the user as verified, and redirects the user to a login page.

### Logging In

#### User Logs In
- The user enters their credentials on the login page and submits the form.
- The backend verifies the credentials and generates two tokens: an Access Token (short-lived) and a Refresh Token (long-lived), sending them back to the frontend.

#### Frontend Token Storage and User Session
- The Access Token is stored in memory, and the Refresh Token is stored in an HTTP-only cookie for security.
- The user is now authenticated and redirected to the homepage or a user dashboard.

### Persistent Sessions and Token Refresh

#### Persisting User Sessions
- The application stores user details and token information in local storage or a similar mechanism to keep the user logged in across page reloads or browser sessions.
- If the user navigates away and returns, the frontend checks for existing session details and automatically logs the user in, refreshing tokens if necessary.

#### Access Token Expiration and Refresh
- Upon expiration of the Access Token, the application uses the Refresh Token to request a new Access Token from the backend without requiring the user to log in again.
- The backend verifies the Refresh Token, issues a new Access Token, and the user continues their session uninterrupted.

### User Logout

#### User Initiates Logout
- The user decides to log out and clicks the logout button.
- The frontend sends a request to the backend to invalidate the Refresh Token and clears the user's session information from local storage and memory.

#### Session Termination
- The backend invalidates the user's Refresh Token and confirms the logout.
- The user is redirected to the login page, and their session is securely terminated.

# Part 1: Adding auth to your Node.js backend.

In Part 1 of this series, we focus on establishing a robust authentication framework within a Node.js backend, laying the groundwork necessary for securing applications using JWTs. This phase is crucial for ensuring that user data is handled securely right from the start—beginning with user registration and email verification. Here, I'll guide you through setting up your Node.js environment, creating a User model in TypeScript, and implementing the registration process, including password hashing and sending verification emails. We'll also delve into how to verify users' emails using JWTs, setting the stage for a secure authentication flow.

## Steps in Part 1

- **Step 1** Setup and Dependencies
- **Step 2** Registering Users.
- **Step 3** Email Verification.

We will outline the implementation into various steps based on the provided code snippet, focusing on essential parts like registering users, verifying email, logging in, refreshing tokens, and logging out.

## **Step 1: Setup and Dependencies**

- Initialize your Node.js project and install necessary dependencies: Express for the server, Mongoose for database operations (if using MongoDB), bcrypt for hashing passwords, and jsonwebtoken for JWT handling.
- Ensure you have a `User` model and relevant helper functions (`validatePassword`, `sendVerificationMail`, etc.) ready as outlined in the imports.

Below is a sample User Model in TypeScript:

> ```javascript
> export interface User {
>   email: string;
>   password: string;
>   role: string | null;
>   is_verified: boolean;
>   first_name: string;
>   last_name: string | null;
> }
> ```

## **Step 2: Registering Users**

- Implement the `Register` method in your `AuthController`.

  - Validate the received user data.
  - Ensure the password meets security criteria using `validatePassword`.
  - Hash the password with `bcrypt`.
  - Save the new user as unverified using a user repository method (e.g., `userRepo.addUnverifiedUser`).
  - Send a verification email using `sendVerificationMail`.

  Below is a sample implementation in TypeScript (method within AuthController class):

> ```javascript
> /*
>  * Libraries Used:
>  * - bcrypt for hashing passwords.
>  * - The validatePassword function is a custom utility 
>      library for password validation.
>  * - sendVerificationMail function is a custom utility 
>      method for sending verification emails 
>      (using node-mailer)
>  * - User model for representing user data.
>  * - userRepo for database operations related to users.
>  */
>
> async Register(req: any, res: any) {
>     // access the request body
>     const body = req.body;
>
>     // extract props
>     const { email, password, first_name, last_name } = body;
>
>     // check if all props are present
>     if (!email || !password || !first_name) {
>       return res.code(400).send({ error: "Please share complete details." });
>     }
>
>     // check if password meets criteria
>     if (!validatePassword(password)) {
>       return res
>         .code(400)
>         .send({ error: "Password does not meet security guidelines." });
>     }
>
>     // if it does send verification email
>     console.log(await sendVerificationMail(email));
>
>     // encrypt password
>     const hashedPassword = await bcrypt.hash(password, 10);
>
>     // create user object
>     const user: User = {
>       email,
>       password: hashedPassword,
>       is_verified: false,
>       role: "user",
>       first_name: first_name,
>       ...(last_name && { last_name }),
>     };
>
>     // send unverified user to repo to save in DB
>     const addUserResp: boolean = await userRepo.addUnverifiedUser(user);
>     if (addUserResp) {
>       return res.code(200).send({ success: "User added but not verified." });
>     } else {
>       return res
>         .code(500)
>         .send({
>           error: "Could not add user. Please ensure unique email and username!",
>         });
>     }
> }
> ```

  Below is a sample implementation of the sendVerificationMail method

  > ```javascript
> import nodemailer from "nodemailer";
> import jwt from "jsonwebtoken";
> import "dotenv/config";
> 
> const EMAIL_USER = process.env.EMAIL_USER;
> const EMAIL_PASS = process.env.EMAIL_PASS;
> const URL = process.env.URL;
> 
> const JWT_SECRET = process.env.JWT_SECRET!;
> const sendVerificationMail = async (userEmail: string) => {
>     // create a signed jwt using a secret key with email in it
>     const token = jwt.sign({ email: userEmail }, 
>                   JWT_SECRET, { expiresIn: '1d' });
>     // create transporter
>     let transporter = nodemailer.createTransport({
>         service: 'gmail',
>         auth: {
>             user: EMAIL_USER,
>             pass: EMAIL_PASS,
>         },
>     });
>     // send email
>     let info = await transporter.sendMail({
>         // sender address
>         from: `"Auth System" <${EMAIL_USER}>`, 
>         // list of receivers
>         to: userEmail, 
>         // Subject line
>         subject: "Please verify your email", 
>         // email body html
>         html: `<b>Click here to verify your email:</b> 
>         <a href="${URL}/api/auth/verify-email?token=${token}">
>             Verify Email
>         </a>`,
>     });
>     console.log("Message sent: %s", info.messageId);
> }
> 
> export default sendVerificationMail;
> ```

## **Step 3: Email Verification**

- Implement the `VerifyEmail` method.
  - Extract and decode the email verification token using `decodeTokenEmail`.
  - Verify the user's email by updating their verification status in your database through the user repository.

Below is a sample implementation in TypeScript (method within AuthController class):

> ```javascript
>
> async VerifyEmail(req: any, res: any) {
>     // get token from named query param
>     const token = req.query.token;
>     // get email from token
>     const email = decodeTokenEmail(token);
>     if (email) {
>         //verify user email
>         const response = await userRepo.verifyUser(email);
>         if (response) {
>             res.code(200).send({ success: `user verified` });
>         } else {
>             res.code(500).send({ error: `could not verify user` });
>         }
>     } else {
>         res.send({ error: "no email" });
>     }
> }
> ```

Below is a sample implementation of decodeTokenEmail

> ```javascript
> import jwt from "jsonwebtoken";
> import "dotenv/config";
> import { JwtPayloadWithEmail } from "../tsmodels/models";
> 
> const JWT_SECRET_EMAIL = process.env.JWT_SECRET_EMAIL!;
> 
> const decodeTokenEmail = (token: string) => {
>     try {
>         const decoded = 
>          jwt.verify(token, JWT_SECRET_EMAIL) 
>          as JwtPayloadWithEmail;
>         return decoded.email;
>     } catch (err) {
>         console.log(err);
>         return false;
>     }
> };
> 
> export default decodeTokenEmail;
> ```

Following this, Part 2 will continue with the authentication journey, focusing on the user login process. This will include validating credentials, generating JWTs for authenticated sessions, and handling token refresh scenarios, ensuring a seamless and secure user experience.

Stay tuned as we navigate through the intricacies of JWT authentication, providing you with the knowledge and tools needed to implement these features in your own Node.js and React/JS applications.