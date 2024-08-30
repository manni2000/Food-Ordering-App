### Food Ordering App:
*This is Mini Food Ordering App (UI Level) aims to create a simple and intuitive
user interface for customers to browse food items, add them to the cart, and
place orders. This project targets the front-end development aspect of a food
ordering system, providing users with an engaging and responsive interface to
interact with.*

### Technologies Used:
1. **React.js**: The frontend of the application is built using React.js, a popular JavaScript library for building user interfaces.
2. **React Router**: Used for handling navigation within the application, enabling the creation of different pages and routing between them.
3. **Redux**: Utilized for state management, allowing the app to manage global state in a predictable manner.
4. **React-Redux**: Connects React components with the Redux store, enabling state management within React components.
5. **Firebase**: Used for authentication, allowing users to sign up, log in, and manage their accounts securely.
6. **Bootstrap**: A front-end framework used for designing responsive and mobile-first web pages.
7. **Reactstrap**: Bootstrap 4 components built with React, providing ready-made responsive components.
8. **CSS**: Custom styles applied to give the application its unique appearance.
9. **JavaScript (ES6+)**: The logic and interactivity within the app are handled using modern JavaScript features.

### Functionality:
  1. **User Registration and Authentication**
   - **User Registration**: The system should allow new users to sign up by providing necessary information such as name, email, and password. Validation should be performed to ensure the uniqueness of the email and the strength of the password.
   - **User Authentication**: Existing users should be able to log in using their registered email and password. The system should securely manage and store user credentials, possibly using encryption and hashing techniques. Authentication should be robust, ensuring secure access to the application.
   - **Password Recovery**: Users should be able to recover their accounts in case they forget their passwords. This feature might include sending a password reset link to the user's email.

### 2. **User Roles (Admin, Restaurant Owners, Customers)**
   - **Admin**: The admin role should have access to all functionalities within the application. This includes managing all users, overseeing restaurant owners, managing menus across restaurants, monitoring orders, and viewing system-wide analytics. Admins can also moderate or manage reviews and ratings.
   - **Restaurant Owners**: Restaurant owners should have access to functionalities that allow them to manage their own restaurants. This includes managing menus, handling orders, and viewing reviews and ratings specific to their restaurants. They should not have access to the data or functionality of other restaurant owners.
   - **Customers**: Customers should be able to browse menus, place orders, and leave reviews and ratings. They should have access to their order history, profile management, and the ability to edit or delete their reviews.

### 3. **Menu Management**
   - **Create and Update Menu Items**: Restaurant owners should be able to add new items to their menus and update existing ones. This includes specifying item details such as name, description, price, and availability.
   - **Menu Organization**: The menu should be organized categorically (e.g., Appetizers, Main Courses, Desserts). The system should allow restaurant owners to easily categorize items and update categories as needed.
   - **Menu Visibility**: Restaurant owners should be able to control the visibility of menu items, enabling or disabling items as required.

### 4. **Order Management**
   - **Order Placement**: Customers should be able to place orders by selecting items from the menu. The system should facilitate the process of selecting items, reviewing the order, and finalizing the purchase.
   - **Order Tracking**: Customers should be able to track the status of their orders in real-time. Statuses could include stages such as "Order Received," "Preparing," "Out for Delivery," and "Delivered."
   - **Order History**: Customers should have access to their order history, allowing them to view past orders, reorder items, and review order details.
   - **Order Management for Restaurant Owners**: Restaurant owners should have tools to manage incoming orders, update order statuses, and notify customers of the progress.

### 5. **Reviews and Ratings**
   - **Customer Reviews and Ratings**: Customers should be able to leave reviews and ratings for the restaurants they have ordered from. This feature should allow customers to provide feedback on individual menu items and overall service.
   - **Moderation of Reviews**: Admins and possibly restaurant owners should have the ability to moderate reviews. This includes the ability to remove inappropriate or false reviews.
   - **Displaying Reviews and Ratings**: Reviews and ratings should be visible to other customers, providing insights into the quality of the food and service. An average rating should be calculated and displayed alongside the restaurant or menu items.

**This project is made by all requirements**

### Steps to Run Locally:
1. **Clone the Repository**:
   - Open your terminal and run the following command to clone the repository:
     ```bash
     git clone https://github.com/manni2000/Food-Ordering-App.git
     ```
   - Navigate into the project directory:
     ```bash
     cd Food-Ordering-App
     ```

2. **Install Dependencies**:
   - Ensure you have `Node.js` and `npm` installed.
   - Install the required dependencies by running:
     ```bash
     npm install
     ```

3. **Set Up Firebase**:
   - Create a Firebase project in your Firebase console.
   - Enable Authentication and set up Email/Password as a sign-in method.
   
4. **Run the Application**:
   - Start the development server:
     ```bash
     npm start
     ```
   - The application will open in your default web browser. If it doesn’t, you can access it by navigating to `http://localhost:3000` in your browser.

5. **Explore the Application**:
   - You can now register, log in, browse food items, add them to your cart, and place orders.
  
## Preview:
![image](https://github.com/user-attachments/assets/8e9a1535-1d6c-41c3-acc5-432d68e74e17)

This should provide a comprehensive overview of the technologies used, functionality, and the steps needed to run the Food-Order-App locally.
