## Recap of Part 1: Setting the Stage for Secure Authentication

In the first installment of our series, we laid the foundation for adding robust authentication to your Node.js backend, focusing on the critical importance of security from the outset. We discussed the essence of JWTs (JSON Web Tokens) and their role in facilitating secure information exchange between parties. Understanding why JWTs are chosen for authentication and authorization processes was our starting point, emphasizing their compact, self-contained nature.

We walked through the initial steps needed to set up your authentication system, including:

- **Setting Up Your Project**: Ensuring necessary dependencies such as Express, Mongoose (for MongoDB integration), bcrypt (for password hashing), and jsonwebtoken (for handling JWTs) are installed and configured.
- **Creating a User Model**: Defining a model to represent user data within your application.
- **Registering Users**: Developing a registration process that involves validating user input, hashing passwords, and handling user data securely.

Additionally, we touched on the importance of sending verification emails as part of the registration process, ensuring that users verifying their email addresses are a crucial step towards enhancing the security of your application.

# Part 2: Advancing Authentication with Login, Token Management, and Security Enhancements

Building upon the groundwork laid in Post 1, this next installment will delve deeper into the authentication journey. We'll expand our authentication system to include user login, token refresh, and user logout functionalities. Moreover, we'll explore additional security features to further fortify our application. Here’s what we'll cover:

## **Step 4: User Login**

We're diving into implementing the login functionality in this part, ensuring that users can securely access their accounts. This involves a few crucial steps: validating login credentials against what's stored in the database, generating JWTs for authenticated sessions, and managing session tokens with care.

This part of the login process is where the real magic happens. We're setting up two different types of tokens here, and there's a good reason for that. It's all about striking the right balance between security and convenience for users.

**Here's the Deal with the Two Tokens:**

- **Access Token**: Think of this as your event ticket. It grants you access to everything you're supposed to access but only lasts for a short while, like 15 minutes. This short lifespan means that if it falls into the wrong hands, there's only a brief window for it to be misused.

- **Refresh Token**: Consider this your backstage pass. It's stored securely on the server and lets you get a new access token without having to log in all over again. It lasts much longer, helping you use the app without interruption.

**Why Go Through the Trouble of Two Tokens?**

- **Tighter Security**: The access token's brief validity period limits the potential damage from unauthorized access. It's like having a self-destruct mechanism for temporary passes.
  
- **Less Hassle for You**: With the refresh token, you can enjoy longer sessions without the constant need to re-authenticate. It's all about keeping things smooth and user-friendly.

- **Keeping Things Organized**: By dividing responsibilities between two tokens—one for short-term access and another for long-term session management—we can enhance security without compromising on convenience.

This approach is our way of ensuring you're well-protected without getting bogged down by frequent login prompts. It reflects our commitment to safeguarding your digital experience.

Below is a sample implementation of the `Login` method:

> ```javascript
> async Login(req: any, res: any) {
>     const body = req.body;
>     const { email, password } = body;
> 
>     if (!email || !password) {
>       return res
>         .code(400)
>         .send({ error: "Please share both email and password to login" });
>     }
> 
>     // get user from database
>     const response = await userRepo.getUser(email);
>     let user: User;
>     if (response) {
>       user = {
>         email: response[0].email,
>         password: response[0].password,
>         role: response[0].role,
>         first_name: response[0].first_name,
>         last_name: response[0].last_name ? response[0].last_name : null,
>         is_verified: response[0].is_verified,
>       };
>     } else {
>       return res.code(400).send({ error: "Invalid credentials" });
>     }
> 
>     // check if passwords match
>     const match = await bcrypt.compare(password, user.password);
> 
>     // if they do not return error response
>     if (!match) {
>       return res.code(400).send({ error: "Invalid credentials" });
>     }
> 
>     // if they do check if user is verified or not
>     if (!user.is_verified) {
>       return res.code(200)
>                  .send({ message: "User needs to verify before logging in" });
>     }
> 
>     // now log in...generate token first
>     const userId = response[0].id as number;
>     const role = user.role ? user.role : "user" as string;
>     const loginTokenPayload = { id: userId, role: role };
>     // generate access token
>     const accessToken = generateToken(loginTokenPayload, 
>                                        "15m", "access");
>     // generate refresh toke
>     const refreshToken = generateToken(loginTokenPayload, 
>                                        "12h", "refresh") as string;
> 
>     // save session
>     const saveSessionResp = await userRepo.saveSession(email, 
>                             response[0].id, refreshToken, req.ip);
> 
>     // specify http only cookie with max age 24
>     res.cookie("jwt", refreshToken, { httpOnly: true, 
>                                       maxAge: 24 * 60 * 60 * 1000,
>                                        SameSite: 'Lax', path: '/'});
>
>     // send token along with other details confiriming login
>     res.code(200).send({ accessToken:accessToken,email:user.email,
>                           first_name:user.first_name });
> }
> ```

Below is a sample implementation of the `generateToken` method:

> ```javascript
> import jwt from "jsonwebtoken";
> import "dotenv/config";
> import { JwtGenericPayLoad } from "../tsmodels/models";
> 
> const JWT_SECRET_ACCESS = process.env.JWT_SECRET_ACCESS!;
> const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH!;
> 
> const generateToken = (payload: JwtGenericPayLoad, 
>                        duration: string, 
>                        type: string) => {
>     const payloadKeys = Object.keys(payload);
> 
>     // check if payLoadKeys has at least one key and duration is greater than 0
>     if (payloadKeys.length < 0) {
>         return false;
>     }
> 
>     // create options object
>     const options = { expiresIn: duration };
> 
>     // return signed jwt 
>     return jwt.sign(payload, type === "access" ? 
>                     JWT_SECRET_ACCESS : JWT_SECRET_REFRESH, options);
> }
> 
> export default generateToken;
> ```

#### **About HTTP-only Cookies and Session Storage:**

Using HTTP-only cookies is a security practice we've adopted to protect your session tokens. These types of cookies are shielded from JavaScript access in the browser, drastically reducing the likelihood of session cookie theft through cross-site scripting (XSS) attacks. While they bolster defense against XSS, it's important to recognize they don't cover all bases, especially not cross-site request forgery (CSRF) attacks. Nonetheless, opting for HTTP-only cookies offers a layer of security far superior to storing tokens in local or session storage, where they're easily accessible by scripts.

#### **Why We Save Sessions to the Database:**

The decision to store session information in the database extends beyond just control—it’s about security and integrity. By doing this, we gain the ability to directly invalidate and manage sessions, providing us with robust mechanisms for dealing with potential security breaches. This includes the ability to verify refresh tokens securely on the server side. 

Saving sessions and refresh tokens in the database is a crucial step for maintaining the integrity of the authentication process. It ensures that even if an access token is compromised, we can prevent unauthorized access by validating or invalidating the associated refresh token. This method also supports implementing broader security measures, such as enabling users to log out from all devices simultaneously, thus offering enhanced control and a rapid response capability in case of account security issues.

## **Step 5: Token Refresh**
Token management is crucial for maintaining secure sessions. We'll discuss how to implement a token refresh mechanism, allowing users to receive new access tokens based on valid refresh tokens, thereby extending their sessions without compromising security.

Below is a sample implementation of the `RefreshToken` method:

> ```javascript
> async Refresh(req: any, res: any) {
>   try {
>     // retrieve the 'jwt' cookie
>     const jwt = req.cookies ? req.cookies.jwt : undefined;
> 
>     // Check if the JWT cookie is present
>     if (!jwt) {
>       return res.code(401).send({ error: 'No refresh token provided' });
>     }
> 
>     // check if token is present without a logout_time
>     const sessionData = await userRepo.checkRefreshToken(jwt);
> 
>     // if token is not present in db
>     if (!sessionData) {
>       res.clearCookie("jwt", { httpOnly: true, path: '/', SameSite: 'Lax' });
>       return res.code(401).send({ error: 'Invalid token' });
>     }
> 
>     // evaluate jwt
>     const decoded = decodeRefreshToken(jwt);
>     if (!decoded) {
>       res.clearCookie("jwt", { httpOnly: true, path: '/', SameSite: 'Lax' });
>       return res.code(401).send({ error: 'Invalid token' });
>     }
> 
>     const tokenUserId = decoded.id;
>     const tokenUserRole = decoded.role;
> 
>     // check if token userId and session userId are the same
>     if (sessionData.user_id !== tokenUserId) {
>       res.clearCookie("jwt", { httpOnly: true, path: '/', SameSite: 'Lax' });
>       return res.code(403).send({ error: 'Invalid token' });
>     }
> 
>     // generate a new access token
>     const accessTokenPayload = { id: tokenUserId, role: tokenUserRole };
>     const accessToken = generateToken(accessTokenPayload, "15m", "access");
> 
>     // send auth state
>     res.code(200).send({ accessToken });
>   }
>   catch (err) {
>     console.error(err);
>     res.code(500).send({ error: 'Internal server error' });
>   }
> }
> ```

Below is a sample implementation of the `decodeRefreshToken` method:

> ```typescript
> import jwt from "jsonwebtoken";
> import "dotenv/config";
> import { JwtGenericPayLoad } from "../tsmodels/models";
> 
> const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH!;
> 
> const decodeRefreshToken = (token: string) => {
>     try {
>         const decoded = jwt.verify(token, JWT_SECRET_REFRESH) 
>                         as JwtGenericPayLoad;
>         return decoded;
>     } catch (err) {
>         console.log(err);
>         return false;
>     }
> }
> 
> export default decodeRefreshToken;
> ```

## **Step 6: User Logout**
Securing the logout process is vital for your application's security. When users log out, it's important to end their sessions correctly and make sure any related tokens can't be used again. This keeps the application secure and protects user data after they log out.

#### What to Do:

- **Clear Session Cookies**: Remove session cookies from the user's browser. This gets rid of session IDs that could be misused.

- **Invalidate Access Tokens**: Make sure any JWT access tokens the user has are invalidated when they log out. This stops these tokens from being used again.

- **Manage Refresh Tokens**: Invalidate any refresh tokens during logout. This prevents them from being used to get new access tokens.

- **Update Session Records**: Change session records in your database to show they are closed. This makes sure the session can't be used again.

Implementing these steps ensures a secure logout process, making your application safer for users.

Below is a sample implementation of the `Logout` method:

> ```typescript
> async Logout(req: any, res: any) { 
>     // retrieve the 'jwt' cookie
>     const jwt = req.cookies ? req.cookies.jwt : undefined;
> 
>     // Check if the JWT cookie is present
>     if (!jwt) {
>       res.clearCookie("jwt", { httpOnly: true, path: '/', SameSite: 'Lax' });
>       return res.code(204).send();
>     }
>     
>     // check if token is present without a logout_time
>     const sessionData = await userRepo.checkRefreshToken(jwt);
> 
>     // if token is not present in db
>     if (!sessionData) {
>       // clear cookie
>       res.clearCookie("jwt", { httpOnly: true, path: '/', SameSite: 'Lax' });
>       return res.code(204).send();
>     }
> 
>     //evaluate jwt
>     const decoded = decodeRefreshToken(jwt);
>     if (!decoded) {
>       // clear cookie
>       res.clearCookie("jwt", { httpOnly: true, path: '/', SameSite: 'Lax' });
>       return res.code(204).send();
>     }
> 
>     const tokenUserId = decoded.id;
>     const tokenUserRole = decoded.role;
> 
>     // check if token userId and session userId are the same
>     if (sessionData.user_id !== tokenUserId) {
>       // clear cookie
>       res.clearCookie("jwt", { httpOnly: true, path: '/', SameSite: 'Lax' });
>       return res.code(204).send();
>     }
> 
>     // set session object logout time
>     const logoutResponse = await userRepo.logoutSession(sessionData.id);
>     // clear cookie
>     res.clearCookie("jwt", { httpOnly: true, path: '/', SameSite: 'Lax' });
>     return res.code(204).send();
>   }
> ```


## **Step 7: Integrating the AuthController**
Finally, we'll ensure that our `AuthController` methods are fully integrated with our application routes, providing a seamless and secure user authentication experience.

> ```typescript
> import fastify from "fastify";
> import AuthController from "../controllers/auth.controller";
> 
> const authController = new AuthController();
> 
> const authRoutes = async (fastify:any, options:any) => {
>     fastify.post("/register", authController.Register);
>     fastify.post("/login", authController.Login);
>     fastify.get("/logout", authController.Logout);
>     fastify.get("/verify-email", authController.VerifyEmail);
>     fastify.get("/refresh", authController.Refresh);
> };
> 
> export default authRoutes;
> ```

## Looking Ahead to Part 3: Integrating Secure Authentication in the React Frontend

As we move forward, Part 3 will guide us through the crucial step of integrating our secure authentication system into the React frontend. We'll explore the management of access and refresh tokens on the client side, ensuring that our application remains secure while offering a seamless user experience.

Expect to dive into best practices for:

- Storing tokens in the frontend.
- Handling token renewal seamlessly.
- Safeguarding against common security pitfalls in a Single Page Application (SPA) context.

Stay tuned as we bridge the gap between backend security measures and frontend implementation, aiming to secure our entire stack from end to end. The journey from backend to frontend security is a critical one, and we're here to make sure you're well-prepared for this transition.