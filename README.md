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
