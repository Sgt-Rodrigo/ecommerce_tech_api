# E-commerce Backend API

A robust e-commerce backend API built with NestJS, TypeORM, and PostgreSQL. This API provides essential features needed for a modern e-commerce platform including user authentication, product management, and image handling with Cloudinary.

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Admin, User)
  - Secure password hashing with bcrypt
  
- **Product Management**
  - CRUD operations for products
  - Category management
  - Image upload with Cloudinary
  - Product seeding functionality

- **User Management**
  - User profiles
  - Admin user management
  - Role-based permissions

## 🛠️ Tech Stack

- **NestJS** - Progressive Node.js framework
- **TypeORM** - ORM for TypeScript and JavaScript
- **PostgreSQL** - Primary database
- **Axios** - HTTP client for external API calls
- **bcrypt** - Password hashing
- **class-validator** - DTOs validation
- **Cloudinary** - Cloud storage for images

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v13 or higher)
- Cloudinary account
- npm or yarn

## ⚙️ Installation

1. Clone the repository:
```bash
git clone https://github.com/Sgt-Rodrigo/ecommerce_tech_api
cd ecommerce-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=ecommerce

# JWT
JWT_SECRET=your_jwt_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Run database migrations:
```bash
npm run typeorm:run-migrations
```

5. Start the development server:
```bash
npm run start:dev
```

## 🔍 API Endpoints

### Authentication

```typescript
POST /auth/signin - User login
POST /auth/signup - Register a new user
```

### Users

```typescript
GET /users - Get all users
GET /users/admin - Get admin users
GET /users/{id} - Get user by ID
PUT /users/{id} - Update user
DELETE /users/{id} - Delete user
```

### Products

```typescript
POST /products - Create new product
GET /products - Get all products
POST /products/seeder - Seed product data
POST /products/files/uploadImage/{id} - Upload product image
GET /products/{id} - Get product by ID
PUT /products/{id} - Update product
DELETE /products/{id} - Delete product
```

### Categories

```typescript
POST /categories/seeder - Seed category data
```

### Orders

```typescript
POST /orders - Create new order
GET /orders/{id} - Get order by ID
PATCH /orders/{id} - Update order
DELETE /orders/{id} - Delete order
```


## 🔒 Security

- All endpoints (except auth) require JWT authentication
- Passwords are hashed using bcrypt
- Input validation using class-validator
- Role-based access control


## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|-----------|
| DATABASE_HOST | PostgreSQL host | Yes |
| DATABASE_PORT | PostgreSQL port | Yes |
| DATABASE_USERNAME | PostgreSQL username | Yes |
| DATABASE_PASSWORD | PostgreSQL password | Yes |
| DATABASE_NAME | PostgreSQL database name | Yes |
| JWT_SECRET | Secret for JWT tokens | Yes |
| JWT_EXPIRATION | JWT token expiration | Yes |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name | Yes |
| CLOUDINARY_API_KEY | Cloudinary API key | Yes |
| CLOUDINARY_API_SECRET | Cloudinary API secret | Yes |


## 📘 API Documentation Access

Once the server is running, you can access the Swagger documentation at:
```
http://localhost:3000/api/docs
```


## 👥 Authors

- Rodrigo Fernandez - Initial work - [Sgt-Rodrigo](https://github.com/Sgt-Rodrigo)


