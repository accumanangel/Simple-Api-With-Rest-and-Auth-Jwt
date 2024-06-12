# Node.js Authentication API

This project provides a Node.js-based RESTful API for user authentication and authorization using JWT (JSON Web Tokens).

## Features

- **User Sign-Up**: Validates email and password, hashes the password, and stores the user securely.
- **User Login**: Authenticates users by comparing hashed passwords and issues JWT tokens for authorized access.
- **JWT Authentication**: Middleware ensures that certain routes are protected and can only be accessed with a valid JWT.
- **Protected Routes**: `/api/auth/users` and `/api/auth/posts` are examples of routes accessible only with a valid JWT.

## Technologies Used

- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **JWT (JSON Web Tokens)**: For securely transmitting information between parties as a JSON object.
- **bcrypt**: Library used to hash passwords before storing them in the database.
- **dotenv**: Module to load environment variables from a `.env` file into `process.env`.
- **Express Validator**: Middleware to validate incoming data.

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>

   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and set the following environment variables:
   ```plaintext
   PORT=5000
   SECRET="your_jwt_secret"
   ```
4. Start the server:
   ```bash
   npm start
   ```

## Contributing

Contributions are welcome! Fork the repository, create your branch, commit your changes, and push the branch. Finally, submit a pull request.

## License

This project is licensed under the MIT License.

# End points

### `/api/auth/signup`

Endpoint to register a new user with email and password.

### Endpoint

```bash
POST /api/auth/signup
```

### Expected Body

```json
{
  "email": "example@example.com",
  "password": "password123"
}
```

### Success Results

#### Status: `201 Created`

#### Body:

```json
{
  "msg": "User Account Created!"
}
```
