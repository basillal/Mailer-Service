# Mailer Service - Frontend

The frontend of the **Mailer Service** provides a user-friendly interface for managing email templates, adding recipients, and sending bulk emails through AWS.

---

## Key Features

- **Manage Templates**: Upload and preview email templates.
- **Recipient Management**: Add, edit, or upload recipient lists.
- **Bulk Email Sending**: Trigger bulk email campaigns with minimal effort.
- **Responsive Design**: Clean and intuitive interface for an optimal user experience.

---

## Prerequisites

Ensure the following are installed on your system:
1. **Node.js**: [Download here](https://nodejs.org/)
2. **npm**: Comes with Node.js.

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/basillal/Mailer-Service.git
cd Mailer-Service/frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Backend API
- Update the API base URL in the `environment.js` configuration file (if applicable):
  ```javascript
  export const API_URL = 'http://localhost:3000'; // Update this to match your backend URL
  ```

### 4. Start the Development Server
```bash
npm start
```

- The app will run locally at `http://localhost:3000`.

---

## Project Structure

```
frontend/
├── src/              # Source code for the React application
│   ├── components/   # Reusable UI components
│   ├── pages/        # Application pages (e.g., dashboard, email upload)
│   ├── services/     # API service handlers
├── public/           # Static assets (e.g., images, HTML file)
│   ├── index.html    # Main HTML entry point
├── package.json      # Dependencies and scripts
```

---

## Scripts

- **`npm start`**: Start the development server.
- **`npm run build`**: Build the production-ready app.
- **`npm test`**: Run tests if configured.

---

## Usage

1. Navigate to the application in your browser (`http://localhost:3000`).
2. Use the interface to:
   - Upload email templates.
   - Add or upload recipient lists.
   - Send bulk emails via the backend.

---

The **Mailer Service Frontend** is designed for simplicity and efficiency, making bulk email management effortless!
