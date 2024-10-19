graph TD
A[User lands on marketing page] --> B[Click 'Get Started']
B --> C{Has Base name?}
C -->|Yes| D[Login/Signup Page]
C -->|No| E[Redirect to Base name registration]
E --> F[User registers Base name]
F --> D
D --> G{Existing user?}
G -->|Yes| H[Login]
G -->|No| I[Signup]
I --> J[Complete profile setup]
J --> K[Dashboard]
H --> K
