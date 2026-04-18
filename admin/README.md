# Admin Panel - DragUI

A complete admin dashboard for managing components with authentication.

## Features

- **Admin Login/Register**: Secure authentication with ID and password
- **Component Management**: Create, view, and delete components
- **File Upload**: Upload component files
- **Token-Based Auth**: JWT authentication for API security

## Setup

### Backend

1. **Install dependencies**:
```bash
cd server
npm install
```

2. **Install bcryptjs** (for password hashing):
```bash
npm install bcryptjs
```

3. **Update .env**:
```
MONGO_URI=mongodb://localhost:27017/dragui
JWT_SECRET=your_secret_key_here
```

4. **Start server**:
```bash
npm start
```

Server runs on `http://localhost:5000`

### Frontend (Admin Dashboard)

1. **Install dependencies**:
```bash
cd admin
npm install
```

2. **Start development server**:
```bash
npm run dev
```

Admin dashboard runs on `http://localhost:3001`

## API Endpoints

### Authentication

- `POST /api/admin-auth/register` - Register new admin
  ```json
  {
    "adminId": "admin1",
    "password": "password123",
    "email": "admin@example.com"
  }
  ```

- `POST /api/admin-auth/login` - Login admin
  ```json
  {
    "adminId": "admin1",
    "password": "password123"
  }
  ```

- `GET /api/admin-auth/profile` - Get admin profile (requires token)

### Component Management

- `POST /api/admin/component` - Create component (requires token)
  - Multipart form data with name, type, category, props, and files

- `GET /api/admin/components` - Get all components (requires token)

- `DELETE /api/admin/component/:id` - Delete component (requires token)

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Default Credentials (First Admin)

You'll need to register the first admin through the admin panel or API.

## File Structure

```
admin/
├── src/
│   ├── components/
│   │   ├── AdminLogin.jsx
│   │   ├── AdminLogin.css
│   │   ├── AdminDashboard.jsx
│   │   └── AdminDashboard.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Development Notes

- The admin dashboard stores the JWT token in localStorage
- Tokens expire after 7 days
- Component files are uploaded to the server's upload directory
- All admin operations are protected and require valid authentication
