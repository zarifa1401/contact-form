\# Full-Stack Contact Form API

This project implements a complete frontend contact form and a Node.js/Express backend API to handle form submissions. It supports `GET` and `POST` methods, client/server-side validation, and stores data locally in a `contacts.json` file.

---

## 🚀 How to Run Locally

### 1. Install Dependencies

Ensure you have Node.js installed, then run:

```bash
npm install express cors
```

### 2. Start the Server

```bash
node server.js
```

The server will start on `http://localhost:3000`.

### 3. View the Frontend

Open `http://localhost:3000` in your browser to see and interact with the form.

---

## 🛠 API Documentation & Testing Examples

### 1. Submit a Contact — `POST /api/contacts`

Accepts a JSON payload and validates that `name`, `email`, and `message` are present.

**Using `fetch` (Frontend):**

```javascript
fetch('http://localhost:3000/api/contacts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "John Doe",
    email: "john@example.com",
    subject: "API Test",
    message: "This is a test message."
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

**Using `curl` (Terminal):**

```bash
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","subject":"API Test","message":"This is a test message."}'
```

---

### 2. Get All Contacts — `GET /api/contacts`

Retrieves all submitted contacts from the `contacts.json` file.

**Using `fetch` (Frontend):**

```javascript
fetch('http://localhost:3000/api/contacts')
  .then(res => res.json())
  .then(data => console.log(data));
```

**Using `curl` (Terminal):**

```bash
curl http://localhost:3000/api/contacts
```