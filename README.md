## 🧭 System Workflow Diagram

```mermaid
flowchart TD
    A[Landing Page] --> B[Login / Signup]

    B --> C{Select Role}

    C -->|User| D[User Authentication]
    C -->|Provider| E[Provider Authentication]

    D --> F[JWT Issued]
    E --> F[JWT Issued]

    F --> G{Role Check}

    G -->|USER| H[User Dashboard]
    G -->|PROVIDER| I[Provider Dashboard]

    %% User Dashboard Flow
    H --> H1[View Steps]
    H --> H2[View Active Time]
    H --> H3[View Sleep]
    H --> H4[Goals & Reminders]
    H --> H5[Profile Management]

    %% Provider Dashboard Flow
    I --> I1[Patient List]
    I --> I2[Patient Details]
    I --> I3[Today's Operations]
    I --> I4[Compliance & Goals Status]

    %% Security Flow
    H --> J[Verify JWT Cookie]
    I --> J[Verify JWT Cookie]
    J -->|Invalid| B
    J -->|Valid| H
    J -->|Valid| I

    %% Logout
    H --> K[Logout]
    I --> K[Logout]
    K --> B
```

## 🔐 Authentication & Authorization

This application uses **JWT-based authentication** with **role-based authorization** to securely manage access for different user types.

---

## 🧑‍💻 User Roles

The system supports two roles:

| Role | Description |
|------|------------|
| USER | End user / patient |
| PROVIDER | Healthcare provider |

Roles are stored in the database and embedded inside the JWT token.

---

## 🔑 Authentication Flow (JWT)

### Signup
1. User submits email, username, password, and role
2. Backend:
   - Validates input
   - Hashes password using bcrypt
   - Stores user with role in MongoDB
   - Generates JWT containing `{ userId, role }`
3. JWT is sent as an **HTTP-only cookie**

### Login
1. User submits email and password
2. Backend:
   - Verifies credentials
   - Generates JWT with role
   - Stores JWT in cookie
3. User is redirected based on role

---

## 🪪 JWT Structure

```json
{
  "id": "user_id",
  "user_name" : "username",
  "email" : "mail id",
  "role": "USER | PROVIDER",
  "Password" : "bcrypt hased password",
  "iat": 1710000000,
  "exp": 1710086400
}

