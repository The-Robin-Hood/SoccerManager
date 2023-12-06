# Soccer Manager App

This application helps you manage your soccer team by providing a user-friendly interface to handle player rosters, formations, and more. 

[Demo Link](https://the-robin-hood.github.io/SoccerManager/)

## Getting Started

To set up and run the Soccer Manager App on your local machine, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/The-Robin-Hood/SoccerManager
   cd SoccerManager
   ```

2. **Install Dependencies:**

   ```bash
   pnpm install
   ```

3. **Run the App:**
   ```bash
   pnpm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

- **`src`**: Contains the source code of the application.
  - **`components`**: Reusable React components.
  - **`lib`**: Utility functions and types used across the app.
  - **`assets`**: Store static assets such as logos.
- **`public`**: Publicly accessible files.
- **`node_modules`**: Node.js dependencies.
- **`README.md`**: The file you are currently reading.
- **`tailwind.config.js`**: Configuration file for the Tailwind CSS framework.
- **`tsconfig.json`**: TypeScript configuration.
- **`package.json`**: Configuration file for npm with project dependencies and scripts.
- **`vite.config.ts`**: Configuration file for Vite, the build tool.
- **`postcss.config.js`**: Configuration file for PostCSS.
- **`pnpm-lock.yaml`**: Lock file for pnpm package manager.
- **`index.html`**: HTML entry point for the app.

## Available Scripts

- **`npm run dev`**: Run the app in development mode.
- **`npm run build`**: Build the app for production.
- **`npm run lint`**: Lint the code using ESLint.
- **`npm run preview`**: Preview the production build.

## Dependencies

- [FontAwesome](https://fontawesome.com/): Icon library for the web.
- [Radix UI](https://radix-ui.com/): Set of low-level UI primitives for React.
- [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework.
- [Zod](https://github.com/colinhacks/zod): TypeScript-first schema declaration and validation.

## Development Dependencies

- [ESLint](https://eslint.org/): Linting utility for JavaScript and TypeScript.
- [Prettier](https://prettier.io/): Code formatter.
- [TypeScript](https://www.typescriptlang.org/): Typed superset of JavaScript.
- [Vite](https://vitejs.dev/): Next-generation frontend build tool.
