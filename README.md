# Bloomtherapy

### Theme: Apocalypse

# Overview

BloomTherapy  is a web application designed to provide emotional support and mental wellness in a unique apocalyptic-themed environment. 
This application was developed to address the struggles many people face today in finding safe, judgment-free spaces to express their true feelings, set meaningful personal goals, or connect with others going through difficult times. 

# Key Feature
* Survivor’s Journal feature — 865 PAWATTI KLAIRUNG

Survivor's Journal is a personal diary feature within where users can write down their thoughts, feelings, or daily experiences. Every entry is saved to the backend, and users can come back to read, edit, or delete them anytime. 

* Bucket List System feature — 856 JARUKITT EIUSEEYOK 

A goal-tracking system that allows users to list and manage things they want to accomplish before the world ends. Users can categorize items by theme, mark them as completed with notes and track their overall progress via a visual completion bar and also add the notes for the list like “Long way to achieve” , user also able to edit the achieved day as they want. 

* Heal Heart Message feature — 821 MONGKOL SRIBURIN 

An anonymous community message board set in a warm, apocalyptic-themed forest UI, where users can post supportive messages and words of comfort for strangers. Designed to feel safe and non-judgmental, the board allows logged-in members to post using their username or guests to post as "Anonymous". Users also have the ability to edit and delete their own messages. 

* Humanity Test (Personal Test) feature — 812 CHAYANAN PANSA   

A 10-question self-reflection test that helps users discover what emotionally keeps them going in an apocalyptic world. Based on their answers, users receive a personalized survivor type result. The Protector, The Hope Keeper, or The Drifter, along with a description of their emotional core and what helps them heal. After completing the test, users can leave an anonymous message for others taking the same test and browse a public Message Board to read what others have shared, no login required.

#

### Frontend
The frontend of this project was developed using:
* React – for building the user interface
* TypeScript – for type safety and better code maintainability
* Vite – for fast frontend development and build tooling
* React Router DOM – for page routing and navigation
* Tailwind CSS – for styling and responsive UI design
* Axios – for API communication between frontend and backend
* React Hook Form + Zod – for form handling and validation
* Framer Motion – for smooth animations and transitions across the UI
* Lucide React – for scalable and consistent icons used throughout the interface

### Backend
The backend of this project was developed using:
* Node.js – JavaScript runtime environment
* Express.js – backend framework for handling APIs and server logic
* TypeScript – backend development language
* JWT (jsonwebtoken) – for authentication and authorization
* bcrypt – for password hashing and security
* CORS – for cross-origin resource sharing support
* Morgan – for request logging and debugging

### Database
The database system used in this project:
* Prisma ORM – for database management and querying
* LibSQL / SQLite – database storage used in development

#

## How to Run the Project

### For the Host Machine (Server)

**1. Open Port 3000 on Firewall (Run in PowerShell as Administrator)**
```powershell
netsh advfirewall firewall add rule name="Node 3000" dir=in action=allow protocol=TCP localport=3000
```

**2. Install dependencies**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

**3. Set up `.env` in `frontend/`**
```env
VITE_API_URL=http://localhost:3000
```

**4. Run Backend and Frontend**
```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev
```

> Do not shut down the Host machine while the team is using the app.

---

### For Other Team Members

**1. Verify the server is running**

Open a browser and go to: http://<Host Machine IP>:3000

If the server is running correctly, you should see: Server is running 🚀

**2. Install dependencies**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

**3. Set up `.env` in `frontend/`**
```env
VITE_API_URL=http://<Host Machine IP>:3000
```

**4. Run Backend and Frontend**
```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev
```

# 

## Additional Notes
* Make sure Node.js and npm are installed before running the project.
* The backend and frontend must both be running for the full system to work correctly.
* Environment variables may be required depending on local setup.
* This project was developed for educational purposes.

# 

## Group Member
1. 68130500812 CHAYANAN PANSA             
2. 68130500821 MONGKOL SRIBURIN 
3. 68130500856 JARUKITT EIUSEEYOK 
4. 68130500865 PAWATTI KLAIRUNG
