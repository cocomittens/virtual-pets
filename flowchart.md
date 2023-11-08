flowchart TD
A{First Time User}
A -->|Yes| B[View Intro]
B --> C[Choose Pet]
C --> D[Name Pet]
D --> E[Tutorial]
A -->|No| F{Is Hungry?}
E --> F{Is Hungry?}
F --> |Yes| G[F]
G --> I[Main Menu]
F --> |No| I[Main Menu]
