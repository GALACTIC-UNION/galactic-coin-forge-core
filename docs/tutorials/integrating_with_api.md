# Integrating with the Galactic Coin Forge API

## Introduction

This tutorial will help you understand how to integrate with the Galactic Coin Forge API to perform actions programmatically.

## Step 1: Obtain Your API Token

1. Log in to your account.
2. Navigate to the "API" section in your account settings.
3. Generate a new API token and save it securely.

## Step 2: Make Your First API Call

### Example: User Login

You can use the following example to log in and obtain a JWT token:

```bash
1 curl -X POST https://api.galacticcoinforge.com/v1/users/login \
2 -H "Content-Type: application/json" \
3 -d '{
4   "email": "your_email@example.com",
5   "password": "your_password"
6 }'
```

### Example: Fetch User Profile
Once you have the JWT token, you can use it to fetch your user profile:

```bash
1 curl -X GET https://api.galacticcoinforge.com/v1/users/profile \
2 -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

# Conclusion
You have successfully integrated with the Galactic Coin Forge API! Explore the API documentation to learn more about available endpoints and parameters.
