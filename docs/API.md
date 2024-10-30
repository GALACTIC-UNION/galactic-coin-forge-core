# API Documentation

## Overview

The Galactic Coin Forge API provides a set of endpoints for interacting with the platform. This document outlines the available endpoints, request/response formats, and authentication requirements.

## Base URL

[https://api.galacticcoinforge.com/v1](https://api.galacticcoinforge.com/v1) 


## Authentication

All API requests require a valid JWT token. Include the token in the `Authorization` header:

```bash
1 Authorization: Bearer YOUR_JWT_TOKEN
```


## Endpoints

### 1. User Registration

- **Endpoint**: `/users/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  1 {
  2   "username": "string",
  3   "email": "string",
  4   "password": "string"
  5 }
  ```

  - Response:
      - 201 Created: User registered successfully.
      - 400 Bad Request: Validation errors.

### 2. User Login
- **Endpoint**: /users/login
- **Method**: POST
- **Request Body**:
  ```json
  1 {
  2   "email": "string",
  3   "password": "string"
  4 }
  ```

- Response:
    - 200 OK: Returns JWT token.
    - 401 Unauthorized: Invalid credentials.

### 3. Get User Profile
- **Endpoint**: /users/profile
- **Method**: GET
- **Response**:
     - 200 OK: Returns user profile data.
     - 401 Unauthorized: Invalid or missing token.

# Conclusion
This API documentation provides a comprehensive overview of the available endpoints for the Galactic Coin Forge. For further details, please refer to the codebase or contact the development team.
