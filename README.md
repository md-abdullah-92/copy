# AgriBazaar


## Project Overview
AgriBazaar is an AI-powered digital marketplace designed for agents, farmers, and buyers. It enables direct communication, product management, and order tracking, creating an efficient platform for agricultural transactions.

### Key Features:
1. **Self-Registration for Agents, Farmers, and Buyers:**  
   Agents, farmers, and buyers can register, manage their profiles, products, and track orders independently.

2. **Direct Sales for Farmers:**  
   Farmers can sell products directly to buyers, bypassing middlemen, leading to better profits for farmers and lower costs for buyers.

3. **Feedback System and Transactions:**  
   Buyers can leave reviews and ratings after transactions. Detailed receipts are generated for every transaction, promoting transparency.

4. **AI-Powered Assistance:**  
   AgriBazaar integrates AI to assist farmers and buyers with product information and transactional details.

5. **Direct Communication:**  
   Agents and buyers can communicate with each other, similar to popular messaging apps like Messenger, to discuss product details and negotiate deals.

6. **Home Delivery and Order Tracking:**  
   Farmers can provide home delivery services, and buyers can track their orders in real-time.

## Technologies and Tools

| Feature                    | Framework / Tool                                                                 |
|----------------------------|---------------------------------------------------------------------------------|
| **Frontend**                | [Next.js](https://nextjs.org/) with TypeScript for fast server-side rendering.   |
| **Backend**                 | [Java Spring Boot](https://spring.io/projects/spring-boot/), WebSocket, Spring Cloud Netflix Eureka, Spring Cloud Gateway, Spring Security |
| **Database & Storage**      | [MongoDB](https://www.mongodb.com/), [Firebase Storage](https://firebase.google.com/) (to store images) |
| **CSS Framework & Design**  | [Tailwind CSS](https://tailwindcss.com/), Design tool: [Canva](https://www.canva.com/) |
| **Creativity-based Features** | [GPT-3.5-turbo](https://azure.microsoft.com/en-us/services/openai/) from Azure OpenAI |
| **Payment Gateway**         | [Stripe](https://stripe.com/) for secure online payments.                       |
| **Authentication**          | JWT-based authentication for secure login and role-based access.                |

## Scalable Features
AgriBazaar’s architecture is designed for scalability, ensuring that it can accommodate the growing number of users and data. The system employs microservices for various functions, ensuring efficient handling of increased user loads and feature expansion.

## Community Building
The platform also focuses on fostering a community by providing a space for networking, where users can connect, share ideas, and collaborate for agricultural growth.

**Repository:**  
[GitHub Link](https://github.com/md-abdullah-92/sust_unknowns_agribazaar.git)




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
     yarn
     ```
   - Start the frontend development server with:
     ```
     yarn dev
     ```

5. **Backend Setup:**
   - Install dependencies for the backend from the `pom.xml` file.
   - Run the main files of all modules. Consider using tools like IntelliJ for building and running the system.




**Team:** SUST_UNKNOWNS  
**Members:**
- Abdullah Al Mahadi Apurbo  
- Nobel Ahmad Badhon  
- Session: 2020-21  
- CSE, SUST  


