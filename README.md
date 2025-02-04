# **Local Classified Ads Platform**

## **Description**
The Local Classified Ads Platform is a comprehensive web application designed to connect buyers and sellers within a community. Users can easily browse, post, and manage classified ads in a user-friendly and secure environment. This platform aims to simplify local commerce by providing a centralized hub for transactions.

---

## **Features**

### **Core Features**
- **User Authentication**
  - Secure user registration, login, and logout using JWT authentication.
- **Ad Management**
  - Create, update, delete, and mark ads as sold.
  - View all posted ads in a simple and intuitive interface.
- **Browse Ads**
  - Filter ads by category, location, or price.
  - Search functionality to quickly find specific ads.
- **Responsive Design**
  - Fully optimized for mobile, tablet, and desktop devices.

### **Additional Features**
- Secure backend APIs with token-based authentication.
- Cross-Origin Resource Sharing (CORS) enabled for secure API access.
- Persistent user sessions via localStorage.

---

## **Technologies Used**

### **Frontend**
- **React.js**: For building a responsive and dynamic user interface.
- **React Router**: For routing and navigation.
- **Bootstrap**: For styling and layout.

### **Backend**
- **Flask**: Lightweight Python framework for handling server-side logic.
- **SQLite**: Database for storing user and ad data.
- **Flask-JWT-Extended**: Token-based authentication for secure user sessions.
- **Flask-CORS**: To handle cross-origin requests.

---

## **Setup and Installation**

### **Prerequisites**
- **Node.js** (v18 or later)
- **Python** (v3.9 or later)
- **npm** (Node Package Manager)

### **Backend Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/local-classified-ads.git
   cd local-classified-ads/backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the backend server:
   ```bash
   flask run
   ```

### **Frontend Setup**
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

---

## **Usage**

### **Access the Application**
1. Open your browser and navigate to ` http://127.0.0.1:5000`.
2. Register as a new user or log in with your existing account.
3. Browse, post, and manage ads effortlessly.

### **Available Pages**
- **Home Page**: Overview of the platform and quick navigation.
- **Login/Register**: User authentication pages.
- **Profile**: Manage user information and view personal ads.
- **Browse Ads**: Explore all ads available on the platform.

---

## **API Endpoints**

### **Authentication**
| Method | Endpoint             | Description                |
|--------|----------------------|----------------------------|
| POST   | `/api/register`      | Register a new user.       |
| POST   | `/api/login`         | Log in a user.             |
| DELETE | `/api/logout`        | Log out the current user.  |

### **Ads**
| Method | Endpoint        | Description                      |
|--------|-----------------|----------------------------------|
| GET    | `/api/ads`      | Retrieve all ads.               |
| POST   | `/api/ads`      | Post a new ad.                  |
| PUT    | `/api/ads/:id`  | Update an ad (by ID).           |
| DELETE | `/api/ads/:id`  | Delete an ad (by ID).           |

---


https://github.com/user-attachments/assets/d3cda278-b0ce-4b0a-b72d-26dba5c74dcf



### **Frontend **

https://github.com/user-attachments/assets/bd339924-1b15-4a47-95ef-e210034c527c
---

## **Contributing**
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git 


commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

#
