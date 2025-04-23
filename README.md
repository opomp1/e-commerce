# 🛒 ShopMe – E-Commerce Website

**ShopMe** is a full-stack e-commerce application where users can browse and purchase products, and administrators can monitor sales, and feature products. The app includes secure JWT-based authentication, Stripe payment integration, and a responsive UI for a seamless user experience.

---

## 🚀 Features

- 🛍️ Users can add/remove items from their cart and securely checkout using Stripe
- 📦 Admin dashboard to create, feature, or delete products
- 📈 Revenue and sales insights displayed with Recharts
- 🖼️ Product image uploads via Cloudinary
- 🔐 Secure authentication and refresh token system with Redis (Upstash)
- 🌐 Fully responsive and built with modern web technologies

---

## 🛠 Tech Stack

**Frontend**  
React, Vite, Tailwind CSS

**Backend**  
Node.js, Express.js, Mongoose, Stripe, Redis (Upstash)

**Database**  
MongoDB

**Authentication**  
JWT + Refresh Tokens

**File Uploads**  
Cloudinary

**Data Visualization**  
Recharts

---

## 📦 Installation

Make sure you have Node.js, npm, and MongoDB installed.

### 1. Clone the Repository

```bash
git clone https://github.com/opomp1/e-commerce.git
cd shopme
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Create a .env File in the Root Directory

```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string

UPSTASH_REDIS_URL=your_upstash_redis_url

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 4. Start the Backend Server

```bash
npm run dev
```

### 5. Move to the Frontend and Install Dependencies

```bash
cd frontend
npm install
```

### 6. Start the Frontend

```bash
npm run dev
```

Visit http://localhost:5173 in your browser to start shopping!

## 📸 Usage
- Sign up as a user to browse and purchase products
- Log in as an admin to manage products and view analytics
- View featured products and real-time revenue dashboards

## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License
This project is licensed under the MIT License.
