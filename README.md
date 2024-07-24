# Members Hierarchy Serve

This server application provides an API for managing and retrieving  member hierarchies. The application follows a layered architecture with controller, service, and repository layers, including error handling, validation, and caching member hirarchy.

## Technologies

- **Node.js**: JavaScript runtime environment used for building the server.
- **Express**: Web framework for Node.js to create the server and handle routing.
- **Jest**: Testing framework to write and run unit tests.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing (CORS) so client can fetch data from the browser.

## Features

- **Controller Layer**: Handles incoming HTTP requests and sends responses. validates input data if suitable.
- **Service Layer**: Contains business logic, handles error handling and validation.
- **Repository Layer**: Manages data access and interactions with data sources.
- **Error Handling**: Middleware to log errors and return 500 to the server with an general error message for security issues.
- **Caching**: Caches member hierarchy data to optimize performance.

### Prerequisites

- Node.js and npm should be installed on your machine.

### Steps

1. **Clone the repository**:

   git clone https://github.com/MiriamNussbacher/menu-server.git

   cd  menu-server

   npm install

   node app.js

Hope you enjoy the project!

