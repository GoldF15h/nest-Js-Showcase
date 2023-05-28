# Project Title: NestJS Microservice Project

This project is created with NestJS and implements a microservice architecture, consisting of a main broker and various services. All requests are sent to the broker which then dispatches the data to the relevant service.

## Services

- Broker: `Port 3000`
- AuthService: `Port 3001`
- UserService: `Port 3002`
- ProductService: `Port 3003`
- OrderService: `Port 3004`

Each service runs on its own port as shown above.

## Database

We're using MongoDB as the database for this project. Make sure you have MongoDB installed and running on your machine.

## Authentication

Authentication is implemented using JWT tokens with two types of roles: `user` and `admin`. There are certain routes that can only be accessed by an `admin`.

## Testing

For testing the API, we have included a Postman collection. You can use these requests to interact with the various services.

## Python Function

This project includes a Python3 function `validate_pincode`, as part of the solution.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository.
2. Run `npm install` in the root directory to install dependencies.
3. Start each of the services (broker, authService, userService, productService, orderService) using `npm run start` inside their respective directories.
4. Import the Postman collection for testing the API.
