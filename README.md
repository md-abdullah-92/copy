# 🌾 Agribazaar Project 🌾
Welcome to **Agribazaar**, a platform for connecting farmers and buyers! 
<img src="https://github.com/md-abdullah-92/sust_unknowns_agribazaar/blob/master/Frontend/public/assets/logo.png" alt="star" style="height: 200px; width: 200px; "/> 

## Project Overview
AgriBazzar is a platform which connects farmers directly with buyers, ensuring fair compensation and eliminating intermediaries. It aims to stabilize market prices and improve farmers' economic well-being.

### Key Features:
1. **Self-Registration for Agents, Farmers, and Buyers:**  
   Agents, farmers, and buyers can register, manage their profiles, products, and track orders independently.

2. **Direct Sales for Farmers:**  
   Farmers can sell products directly to buyers, leading to better profits for farmers and lower costs for buyers.

3. **Feedback System and Transactions:**  
   Buyers can leave reviews and ratings after transactions. Detailed receipts are generated for every transaction, promoting transparency.

4. **AI-Powered Assistance:**  
   AgriBazaar integrates AI to assist farmers and buyers.

5. **Direct Communication:**  
   Agents and buyers can communicate with each other, similar to popular messaging apps like Messenger, to discuss product details and negotiate deals.

6. **Home Delivery and Order Tracking:**  
   Farmers can provide home delivery services, and buyers can track their orders in real-time.

🌐 **Live Demo**:  
[![Agribazaar](https://img.shields.io/badge/Agribazaar-Visit%20Now-brightgreen?style=for-the-badge&logo=vercel)](https://agribazaar.vercel.app/)

Feel free to explore the [live version](https://agribazaar.vercel.app/) and contribute to the project!


💻 **Tech Stack**:

| Feature                    | Framework / Tool                                                                 |
|----------------------------|---------------------------------------------------------------------------------|
| **Frontend**                | [Next.js](https://nextjs.org/) with TypeScript for fast server-side rendering.   |
| **Backend**                 | [Java Spring Boot](https://spring.io/projects/spring-boot/), WebSocket, Spring Cloud Netflix Eureka, Spring Cloud Gateway, Spring Security, Spring Mail |
| **Database & Storage**      | [MongoDB](https://www.mongodb.com/), [Firebase Storage](https://firebase.google.com/) (to store images) |
| **CSS Framework & Design**  | [Tailwind CSS](https://tailwindcss.com/), Design tool: [Canva](https://www.canva.com/) |
| **Creativity-based Features** | [GPT-3.5-turbo](https://azure.microsoft.com/en-us/services/openai/) from Azure OpenAI |
| **Payment Gateway**         | [Stripe](https://stripe.com/) for secure online payments.                       |
| **Authentication**          | JWT-based authentication for secure login and role-based access.                |
|**cloud Deployment**          | Vercel(frontend),Railway(Backend)

## Scalable Features
AgriBazaar’s architecture is designed for scalability, ensuring that it can accommodate the growing number of users and data. The system employs microservices for various functions, ensuring efficient handling of increased user loads and feature expansion.

## Community Building
The platform also focuses on fostering a community by providing a space for networking, where users can connect, share ideas, and collaborate for agricultural growth.

**Repository:**  
[GitHub Link](https://github.com/md-abdullah-92/sust_unknowns_agribazaar.git)

Agribazaar uses the following **microservices**:

- **User Service**: Manages user accounts (farmers, buyers, agents), authentication, and authorization.
- **Product Service**: Handles product uploads, ratings, tracking, and sales.
- **Messaging Service**: Facilitates chat and communication between buyers, sellers, and agents.
Each service is independently hosted and communicates via the **API Gateway**.

### API Gateway

- **Responsibilities**: Acts as the central entry point for clients (Next.js front-end) to communicate with microservices.
- Provides **routing, load balancing, security**, and **authentication**.
- Manages client requests and forwards them to the appropriate service (User, Product, or Messaging Service).
  
### Discovery Server

- **Role**: Discovers microservices dynamically and maintains a registry of available services.
- **Netflix Eureka** is used for service discovery.
- Helps microservices find each other, reducing the complexity of managing service locations.


## Installation and Configuration

1. **Clone the Project:**
   - Clone the project from the [GitHub Repository](https://github.com/md-abdullah-92/sust_unknowns_agribazaar.git).

2. **Configure Environment Variables:**
   - Navigate to the project's root directory.
   - In the "frontend" folder, update the `.env` variables with your API keys and required variables.

3. **Microservice Configuration:**
   - Go to the "microservice" folder.

4. **Frontend Setup:**
   - Open a terminal in the "frontend" folder.
   - Install project dependencies with:
     ```
     npm install
     ```
   - Start the frontend development server with:
     ```
     npm run dev
     ```

5. **Backend Setup:**
   - Install dependencies for the backend from the `pom.xml` file.
   - Run the main files of all modules. Consider using tools like IntelliJ for building and running the system.




 
# 🌟 SUST_UNKNOWNS

| **Name**                         | **University** | **Session** | **LinkedIn**                                                                                                               | **GitHub**                                                               |
|-----------------------------------|----------------|-------------|----------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------|
| **Md Abdullah Al Mahadi Apurbo**  | SUST CSE       | 2020-21     | [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin&style=for-the-badge)](https://www.linkedin.com/in/abdullah-al-mahadi-apurbo-88261b292//) | [![GitHub](https://img.shields.io/badge/GitHub-black?logo=github&style=for-the-badge)](https://github.com/md-abdullah-92)  |
| **Nobel Ahmad Badhon**            | SUST CSE       | 2020-21     | [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin&style=for-the-badge)](https://www.linkedin.com/in/badhon-ahmad-5a5894225/)               | [![GitHub](https://img.shields.io/badge/GitHub-black?logo=github&style=for-the-badge)](https://github.com/BadhonAhmad)     |

---


