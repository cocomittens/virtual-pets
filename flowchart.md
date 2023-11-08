flowchart TD
A{First Time User}
A -->|Yes| B[View Intro]
B --> C[Choose Pet]
C --> D[Name Pet]
D --> E[Tutorial]
A -->|No| F{Is Hungry?}
E --> F{Is Hungry?}
F --> |Yes| G[Notify]
G --> I[Main Menu]
F --> |No| I[Main Menu]
I --> J{Choose Action}
J --> |Minigame| K[Play minigame]
J --> |Feed| L[Feed pet]
J --> |Customize| M[Customize pet]
