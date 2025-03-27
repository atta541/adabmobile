# AdabResturent

AdabResturent is a restaurant management application currently under development. The project consists of a backend built with Node.js and a mobile frontend built with React Native. The system allows users to register, log in, order food, add items to the cart, verify their email, and update personal information. The admin can manage food categories and items.

## Project Structure

### Backend (`adabbackend`)
- **Framework:** Node.js
- **Database:** MongoDB
- **Directory Structure:**
  ```
  cd adabbackend\src
  ├── controllers  # Handles business logic and request processing
  ├── db           # Database configuration and connection
  ├── models       # Mongoose models defining database schemas
  ├── routes       # API endpoints for the application
  ```

### Mobile Frontend (`adabmobile`)
- **Framework:** React Native
- **Directory Structure:**
  ```
  cd adabmobile\src
  ├── components   # Reusable UI components
  ├── context      # Context API for state management
  ├── navigation   # Navigation setup for the application
  ├── screens      # Screens/views of the application
  ```

## Features
- **User Authentication**
  - Register with email verification
  - Login/logout functionality
  - Update personal information

- **Ordering System**
  - Browse food categories and items
  - Add items to cart
  - Place an order

- **Admin Dashboard**
  - Add, edit, and delete food categories
  - Add, edit, and delete food items

## Installation & Setup
### Backend
1. Navigate to the backend directory:
   ```sh
   cd adabbackend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   npm start
   ```

### Mobile Frontend
1. Navigate to the mobile app directory:
   ```sh
   cd adabresturent\adabmobile
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the application:
   ```sh
   npm start
   ```

## Status
This project is currently under development.

## Technologies Used
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** React Native
- **Authentication:** JWT, Email Verification



## License
This project is licensed under the MIT License.
