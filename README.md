# 🎩 Vibe Commerce Mock E-Com Cart (MERN Stack)

This project is a full-stack mock e-commerce shopping cart application developed using the MERN stack (MongoDB, Express, React, Node.js) to fulfill the Vibe Commerce internship assignment requirements.

It simulates a complete e-commerce flow, handling product display, cart management (add/remove/update), total calculation, and a modal-based mock checkout process.

---

## ✨ Features and Bonus Implementation

| Category | Feature | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Core API** | CRUD Cart, Product Listing, Total Calculation, Mock Checkout. | **COMPLETE** | All five required REST API endpoints are functional. |
| **Frontend** | Responsive product grid, dynamic cart view, and modal-based checkout. | **COMPLETE** | Enhanced for **mobile-first responsiveness** using Tailwind CSS. |
| **Bonus 1** | **Fake Store API Integration** | **Implemented** | Products are fetched from the external **Fake Store API** and locally cached in MongoDB. |
| **Bonus 2** | **DB Persistence (Mock User)** | **Implemented** | The cart is linked to a persistent **Mock User ID**, demonstrating user-specific data logic. |

---

## 💻 Tech Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | React (Vite) | User Interface |
| **Styling** | **Tailwind CSS** | Utility-First Styling & Responsiveness |
| **Backend** | Node.js (Express.js) | REST API Server |
| **Database** | MongoDB (Mongoose) | Data Storage and Modeling |

---

## 🚀 Setup and Run Instructions

Please follow these steps **sequentially** to launch the application.

### Prerequisites

* Node.js (v18+)
* MongoDB instance (local or Atlas)
* Git

### Step 1: Cloning and Installation

1.  Clone the repository and navigate to the project root.
2.  Install dependencies for both projects in their respective directories (`/backend` and `/frontend`).

### Step 2: Configuration (`.env`)

1.  Create a file named **`.env`** inside the **`/backend`** folder (root of the backend).
2.  Add your MongoDB connection string and port:
    ```
    # backend/.env
    MONGO_URI="YOUR_MONGODB_CONNECTION_STRING"
    PORT=5000
    ```

### Step 3: Database Initialization (Mock User)

Run the seeder script from the **`/backend`** directory to clear collections and create the required **Mock User ID** for cart persistence.

### Step 4: Starting the Servers

1.  **Start the Backend API (in Terminal 1)** from the `/backend` directory.
2.  **Start the Frontend React App (in Terminal 2)** from the `/frontend` directory.

The application should now be accessible at `http://localhost:5173`.

---

## ⚙️ Backend Endpoints (REST API)

The API is served from `http://localhost:5000/api`.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/products` | Fetches products from the external Fake Store API (or local cache). |
| `GET` | `/cart` | Retrieves the persistent cart contents and calculated total for the Mock User. |
| `POST` | `/cart` | Adds a new item or updates `{productId, qty}`. |
| `DELETE` | `/cart/:id` | Removes an item by its product ID. |
| `POST` | `/cart/checkout` | Validates, calculates final total, returns mock receipt, and clears the cart. |

---

## 📷 Screenshots



<img width="1916" height="963" alt="image" src="https://github.com/user-attachments/assets/3ad7a5a8-4dcb-41b7-8b18-db7b0e7893eb" />

<img width="1919" height="900" alt="image" src="https://github.com/user-attachments/assets/7b5d4f98-675f-4d6c-b07f-d6ee959a8aa4" />

<img width="1919" height="890" alt="image" src="https://github.com/user-attachments/assets/9c5dedd9-762c-457f-9780-eb26e6f18118" />

<img width="1919" height="901" alt="image" src="https://github.com/user-attachments/assets/22dcbedb-39be-4c44-9d5a-eda96fbbcde9" />

<img width="1919" height="899" alt="image" src="https://github.com/user-attachments/assets/1a27f9b0-4b2e-4dab-8d03-3a90a4e3b557" />







---
