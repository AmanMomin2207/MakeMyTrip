# 🚲 MakeMyTrip Clone

A full-featured MakeMyTrip clone built by **Aman Momin** — complete with flight search, user authentication, payment, and booking management.

Live demo: [https://makemytrip-6.onrender.com/](https://makemytrip-6.onrender.com/)

---

## 🧰 Tech Stack

### Backend
- **Node.js** – RESTful APIs  
- **MongoDB** – NoSQL database  
<!-- - **Mongoose** – ODM for schema modeling  
- **Nodemailer** – Email confirmations  
- **Razorpay** – Integrated payment gateway -->

### Frontend
- **React.js** – UI development  
- **Tailwind CSS** – Utility-first styling  
- **Axios** – API communication  

---

## 🚀 Features

- 🔐 **Authentication** — Sign up / Log in via email or phone OTP  
- 🔍 **Flight Search** — Filter by origin, destination, dates  
- ✅ **Booking** — Select flights, make payments via Razorpay  
- 📧 **Email Confirmations** — Sent using Nodemailer  
- 💳 **Payment Handling** — Secure checkout flow  
- 📄 **User Dashboard** — View booking history and details

---

## 📁 Repository Structure

```
MakeMyTrip/
├─ src/main/java
│   ├─config/ 
│   ├─ models/
│   ├─ repositories/
│   ├─ controllers/
│   ├─ Services/
│   ├─MakemytripApplication.java
├─ makemytour/
│   ├─ src/
│   │   ├─ api/
│   │   ├─ components/
│   │   ├─ lib/
│   │   ├─ pages/
│   │   ├─ store/
│   └─ package.json
└─ HELP.md
```

---

## ⚙️ Setup & Run Locally

### 1. Clone the repo  
```bash
git clone https://github.com/AmanMomin2207/MakeMyTrip.git
cd MakeMyTrip
```

### 2. Backend setup  
```bash
cd backend
npm install
```
Create a `.env` file with:
```env
MONGO_URI=<your MongoDB connection>
PORT=5000
RAZORPAY_KEY_ID=<your razorpay key>
RAZORPAY_KEY_SECRET=<your razorpay secret>
SMTP_HOST=<smtp host>
SMTP_PORT=<smtp port>
SMTP_USER=<email user>
SMTP_PASS=<email pass>
```
Start server:
```bash
npm start
```

### 3. Frontend setup  
```bash
cd ../frontend
npm install
```
In `.env`:
```env
REACT_APP_BACKEND_URL=http://localhost:5000
```
Start app:
```bash
npm start
```

Frontend runs on `http://localhost:3000`, backend on `http://localhost:5000`.

---

## 🔧 Deployment

This app is deployed on **Render.com** (frontend + backend). Set environment variables as above in Render dashboard and connect your GitHub repo to auto-deploy updates.

---

## 🛠️ Future Enhancements

- Implement **payment refunds** and **cancellation workflows**  
- Add **hotel & holiday package** booking modules  
- Expand **user profile** with saved cards and preferences  
- Improve **UI/UX responsiveness** and **loading states**

---

## 📩 Contributing & Contact

Feel free to:
- ⭐️ Star the repo  
- Create issues or PRs with improvements  
- Reach out: **mominaman2207@gmail.com**

---

Made with 💜 by **Aman Momin**

