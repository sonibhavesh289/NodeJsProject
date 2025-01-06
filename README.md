# Node.js Projects and Tasks  

This directory contains small projects and tasks that demonstrate various Node.js concepts. Each task focuses on a specific topic to enhance learning and practical understanding.  

---

## 1. Module Example  
This task introduces the basics of Node.js modules. It demonstrates how to create a custom module and use it in another file.  

### How to Run:  
- `node hello`  
- `npm start`  
  - The `start` script is defined in the `package.json` file as: `"start": "node hello"`  

---

## 2. Sample App  
This task demonstrates how to build a basic server application using Node.js. It covers routing with the `http` module and using the `url` module to extract query parameters.  

### Key Points:  
- **Routing with `http`**: Learn to handle routes using Node.js's built-in `http` module.  
- **Using the `url` Module**: Parse and extract query parameters.  
- **Express.js Comparison**: Highlights how Express.js simplifies routing and improves code readability.  

### Recommended Resources:  
- [Express Routing Guide](https://expressjs.com/en/guide/routing.html)  
- [Response Methods in Express.js](https://expressjs.com/en/guide/routing.html#:~:text=)%0A%7D)-,Response%20methods,-The%20methods%20on)  

---  

# 3. REST API (Understanding Middleware and API Operations)

## Key Highlights:
- **Middleware Usage**:  
  - Implemented a custom `requestTime` middleware that is called on all routes.  
  - The middleware adds a `requestTime` property to the `req` object, which can be utilized in subsequent route handlers.  

- **JSON Data Generation**:  
  - Used [Mockaroo](https://www.mockaroo.com/) to generate sample JSON data for testing.  

## API Endpoints:
| Endpoint         | HTTP Method | Description               |
|------------------|-------------|---------------------------|
| `/api/users/`    | GET         | Retrieve all users        |
| `/api/users/`    | POST        | Create a new user         |
| `/api/users/:id` | GET         | Retrieve user by ID       |
| `/api/users/:id` | PATCH       | Update user details by ID |
| `/api/users/:id` | DELETE      | Delete a user by ID       |

## Tools:
- **Postman**: Used for testing and validating the API endpoints.  

---  

## 4. Rest_API_Segregated_Code (Improved MVC Version)  

This task is an enhanced version of the previous REST API project, focusing on segregating the code into a structured MVC (Model-View-Controller) format. This approach makes the codebase more scalable, maintainable, and developer-friendly.  

### Key Points:  
- **Code Segregation**:  
  - **Controllers**: Route-handling logic is moved to dedicated controller files.  
    - Example: All `/api/users` routes are managed in a separate `controllers/user.js` file.  
  - **Middleware**: Custom middleware functions, such as `requestTime`, are extracted into `middleware/index.js`.  

### Why This Version?  
- A more modular and organized version of the REST API project.  
- Easier to extend and maintain as the application grows.  

---

## 5. Rest_API_MongoDB_MVC (REST API with MongoDB)  

This task extends the previous REST API projects by integrating a local MongoDB server for data persistence. The application follows the MVC pattern and supports all the previously listed API operations.  

### Key Points:  
- **MongoDB Integration**:  
  - Replaced JSON file storage with a local MongoDB server for handling all data transfer operations.  
- **Modular Code Structure**:  
  - `connection.js`: Handles MongoDB connection logic.  
  - `models/user.js`: Defines the Mongoose schema and model for `User`.  
- **API Support**:  
  - Same endpoints as in the [Rest_API](#rest_api) project, e.g., `http://localhost:8000/api/users/` (GET, POST, etc.).  

---

## **Stateful vs Stateless Authentication**

Before diving into the implementation of the **Short URLs** functionality, it's important to understand the two primary types of authentication systems: **Stateful** and **Stateless**. These two authentication models ensure that users don't have to log in repeatedly each time they visit a website or service.

---

### 1. **Stateful Authentication (Session-based Authentication)**

Stateful authentication involves the server storing session data about the user. After a successful login, the server creates a session key and maps it to the user's information (e.g., email, role). This session is stored on the server side, but if the server restarts, the session data is lost unless persisted in a database or storage mechanism.

- **Key Characteristics:**
  - Server keeps track of the session.
  - Relies on storing session information on the server side.
  - If the server restarts, session data is lost unless persisted.
  
---

### 2. **Stateless Authentication (Token-based Authentication)**

In stateless authentication, no session information is stored on the server. Instead, when a user logs in, the server generates a **token** containing the user's information (such as email and role). This token is sent to the client, which stores it (e.g. file storage for mobile apps). The client sends this token back in the **Authorization** header in future requests.

- **Key Characteristics:**
  - No session data is stored on the server.
  - The token contains all necessary information.
  - The server uses a secret key to validate and decode the token.

---

### **How Tokens Are Stored and Sent to the Server**

Tokens can be sent in two main ways:

#### 1. **Using Cookies**
- After the server sends a token in the response, the browser stores the token in a cookie. The cookie includes details such as the domain name and expiry date.
- For subsequent visits to the same domain, the browser automatically includes the cookie in all requests to that server.
  
  **Example:** A cookie set by `example.com` will be sent with requests to `example.com`, but not to other domains.

#### 2. **Using Request Headers**
- The client stores the token locally (e.g., in local storage or secure mobile storage) after receiving it from the server.
- On subsequent requests, the client includes the token in the **Authorization** header, using the format `Authorization: Bearer <token>`.
- The server reads the token from the header, validates it, and processes the request accordingly.

---

### Why This Matters

Understanding the differences between **Stateful** and **Stateless** authentication is crucial when building web or mobile applications that require user login. These methods are used to ensure that users can remain logged in without needing to repeatedly enter their credentials, improving the user experience and security.

Now, let's move on to the next task, **Short URLs**, where we’ll implement functionality involving session-based authentication to manage user sessions and shorten URLs.

---

## 6. Short URLs  

This project implements a URL shortening service with session-based authentication. Users can sign up, log in, and create shortened URLs, while the server keeps track of the number of visits for each URL.  

### Functionality:  
- **User Authentication**:  
  - Login and Signup functionality.  
  - Session IDs are stored on the server side and sent to the client as cookies.  
- **URL Shortening**:  
  - Users can provide any URL to generate a shortened version.  
- **URL Management**:  
  - Users can view all their shortened URLs along with the number of visits each URL has received.  

### Upcoming Task: **Short URLs with JWT Authentication and Admin Authorization**  
The next task enhances this project by introducing JWT-based (stateless) authentication and role-based authorization:  
- **JWT Authentication**:  
  - Replaces session-based authentication with JWT tokens.  
- **Role-Based Authorization**:  
  - Introduces `NORMAL` and `ADMIN` user roles.  
  - Adds a new `/admin/urls` endpoint for managing all users' URLs (accessible only to `ADMIN` users).  
- **API Support**:  
  - All APIs from this task are retained, with additional endpoints for admin-specific operations.  

---  

## 7. Short URLs with JWT Authentication and Admin Authorization  

This project is an enhancement of the **Short URLs** task, implementing JWT-based authentication and role-based authorization. It introduces middleware for handling authentication and access control, as well as additional features like admin-only endpoints.  

---

### Key Features:  

#### Middleware:  
1. **`checkForAuthentication`** (Runs for all routes):  
   - A "soft check" middleware that attempts to retrieve the JWT token from the cookie.  
   - If a valid token is found, it sets `req.user` to the user data; otherwise, it sets `req.user` to `null`.  
   - Calls `next()` to pass control to the next middleware or route handler.  

2. **`restrictTo`** (Runs on specific routes):  
   - A "hard check" middleware used to protect sensitive routes (not applied to `/login` and `/signup`).  
   - If no user is found, it redirects to `/login`.  
   - If a user exists, it verifies the user's authorization for the route.  
   - Calls `next()` if all checks pass successfully.  

---

### API Endpoints:  

#### **Public Routes**:  
- **`/signup` (GET)**  
  - Renders the signup view.  
  - Form action points to a POST request at `/user/signup`.  

- **`/login` (GET)**  
  - Renders the login page.  
  - Form action points to a POST request at `/user/login`.  

- **`/user/signup` (POST)**  
  - Creates a new user in the database.  
  - Redirects to `/`.  

- **`/user/login` (POST)**  
  - Authenticates the user using email and password.  
  - On success:  
    - **Session-based Authentication**: Stores the session ID in a cookie and maps it to the user object.  
    - **JWT-based Authentication**: Generates a token containing user details (email, password, role) and sets it in a cookie.  
  - Redirects to `/` on success or re-renders the login view on failure.  

---

#### **Protected Routes**:  
- **`/` (GET)**  
  - Runs `restrictTo` middleware.  
  - Displays all URLs created by the logged-in user.  

- **`/url` (POST)**  
  - Runs `restrictTo` middleware.  
  - Creates a new short URL and associates it with the logged-in user.  

- **`/url/analytics/:shortID` (GET)**  
  - Returns a JSON object with analytics data for the specified short URL (e.g., visit count).  

---

#### **Admin Routes**:  
- **`/admin/urls` (GET)**  
  - Accessible only to users with the `ADMIN` role.  
  - Displays all users' URL data.  
  - Returns "Unauthorized" if accessed by non-admin users.  

---

This project highlights the transition from session-based to JWT-based authentication, as well as the implementation of stateless authentication and role-based access control.  

---  

## **Guide Pages**

To enhance your understanding of the concepts and APIs used in the project, here are some key resources and documentation links that will provide you with detailed explanations and examples:

### 1. **Event Loop in Node.js**
   - **Overview:** Learn how the Node.js event loop works, its interaction with timers, `nextTick()`, and other asynchronous functions. Understanding the event loop is fundamental to writing efficient, non-blocking code in Node.js.
   - **Resource:** [Event Loop, Timers, and nextTick](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)

### 2. **Express APIs Guide**
   - **Overview:** Express.js provides a wide range of methods to handle HTTP requests. This guide covers all the core Express API methods and their usage.
   - **Resource:** [Express.js API Documentation](https://expressjs.com/en/4x/api.html#express)

### 3. **Understanding `require('express')`**
   - **Overview:** Ever wondered what happens when you `require('express')` in a Node.js project? This StackOverflow thread explains whether Express is treated as a function or an object when required.
   - **Resource:** [What happens when you `require('express')`](https://stackoverflow.com/questions/42631107/when-express-is-required-is-it-a-function-or-an-object)

### 4. **Express.js Routing Guide**
   - **Overview:** Learn how to handle routing in Express.js. This guide explains how to define routes and organize them efficiently in your application.
   - **Resource:** [Express.js Routing Guide](https://expressjs.com/en/guide/routing.html)

### 5. **Additional Topics to Explore:**
   - **Middleware in Express:** Understanding middleware is key to managing request/response pipelines, adding custom logic, or handling errors in Express applications.
     - **Resource:** [Middleware in Express](https://expressjs.com/en/guide/using-middleware.html)
---

