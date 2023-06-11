# Project Name

This is a project that combines a React frontend with an Express backend.

## Prerequisites

- Node.js (version 18 or higher)
- MongoDB (Not yet implmented)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/kakiii/cc
   ```

2. Navigate to the project directory:

   ```bash
   cd cc
   ```

3. Install dependencies for both the **server** and the **client**:

   ```bash
   npm install
   ```

4. Start the server, remember you cannot do **node index.js** inside **src** folder, it must be done outside:

   ```bash
   node server/src/index.js
   ```

   The server will start running at `http://localhost:8080`.

5. Build the React app:

   ```bash
   cd client
   npm run build
   npm run dev
   ```
**npm run dev** can reload the app without rebuilding the app
6. Access the application:

   Open your web browser and visit `http://localhost:5173` to access the application.

## Usage

- The application combines a React frontend and an Express backend.
- Follow the on-screen instructions to navigate and interact with the application.
- Choices made in the application will be recorded by the server.

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions, please open an issue or submit a pull request.

## License

[MIT](LICENSE)

```

Feel free to copy and paste this Markdown text into your README file and modify it as needed.
```
