# AgriBazaar

AgriBazaar is a platform connecting agents, farmers, and buyers for the direct sale and purchase of agricultural products. It includes features such as self-registration, product management, real-time messaging, AI assistance, and more.

## Key Features

- **Self-Registration**: Agents, farmers, and buyers can self-register and manage their accounts.
- **Product Management**: Farmers can create, update, and manage products.
- **Order Tracking**: Buyers can view and track their orders, while farmers manage order fulfillment.
- **Direct Communication**: Agents and buyers can communicate in real time through a built-in messaging system.
- **AI Assistance**: AI provides suggestions and farming advice to users.
- **Home Delivery**: Farmers can offer home delivery, and buyers can track their orders.
- **Payments**: Integrated with Stripe for secure transactions.
- **Feedback System**: Buyers can leave reviews and ratings for products.

## Technology Stack

### Frontend
- **Next.js** (with TypeScript): Server-side rendering and modern React-based frontend.
- **Tailwind CSS**: For styling and responsive design.
- **Canva**: Used for designing the UI components.

### Backend
- **Java Spring Boot**: Backend logic and microservices architecture.
  - **Spring Cloud Netflix Eureka**: Service discovery.
  - **Spring Cloud Gateway**: API gateway management.
  - **Spring Security**: Secures the application with JWT-based authentication.
  - **WebSocket**: Real-time communication for messaging.
  
### Database & Storage
- **MongoDB**: NoSQL database for storing user, product, and order data.
- **Firebase Storage**: For storing images uploaded by users.

### AI-Powered Features
- **GPT-3.5-turbo (Azure OpenAI)**: Provides personalized farming tips and product recommendations.

### Payment Gateway
- **Stripe**: Secure payment processing for buyers and farmers.

### Authentication
- **JWT-based authentication**: Secure login and role-based access control.

## Getting Started

### Prerequisites
To run this project, you need to have the following installed:
- **Node.js**: For running the frontend.
- **Java**: Version 11+ for the backend.
- **MongoDB**: Make sure MongoDB is running or use MongoDB Atlas.
- **Firebase**: Set up Firebase for image storage.
- **Stripe**: Sign up for Stripe and obtain API keys.

### Installation

#### Frontend Setup
Navigate to the frontend directory, install dependencies, and run the development server:
```bash
cd frontend
npm install
npm run dev
# Backend Setup

### Navigate to the backend directory, build the Spring Boot application, and start the server:

```bash
cd backend
mvn clean install
mvn spring-boot:run
