# CivicComplaint

**Report. Track. Improve.** CivicComplaint connects residents, municipal administrators, and field workers around local civic issues.

## Problem Statement

Residents may not know where to report neighborhood issues or how to follow up after submitting a report. Municipal teams also need a clear way to review reports, assign responsibility, and share progress.

## Solution

CivicComplaint provides a shared complaint workflow: citizens submit and track issues, administrators coordinate departments and workers, and field workers update task progress. Complaint records are persisted through a REST API and MongoDB.

## Key Features

- Citizen complaint submission and tracking
- Admin complaint management and assignment
- Worker task management
- Status and priority updates
- Department and worker assignment
- Activity and timeline history
- MongoDB persistence through the backend API
- Responsive, professional civic-tech UI

## User Roles

- **Citizen:** Reports local issues and follows complaint progress.
- **Admin:** Reviews complaints, sets priority and status, and assigns departments and workers.
- **Worker:** Views assigned tasks and updates work through completion.

## System Architecture

```text
React + Vite frontend
        │ REST / JSON
        ▼
Express / Node.js backend
        │ MongoDB Node.js driver
        ▼
MongoDB Atlas
```

The frontend uses the backend REST API for complaint data. Demo authentication currently runs in the frontend and is not a production access-control boundary.

## Tech Stack

- **Frontend:** React, JavaScript, Vite, plain CSS
- **Backend:** Node.js, Express, JavaScript
- **Database:** MongoDB Atlas
- **Database client:** Official MongoDB Node.js driver
- **Supporting packages:** dotenv, cors

## Project Structure

```text
CivicComplaint/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   └── complaints.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── pages/
│   │   └── services/
│   ├── .env.example
│   └── package.json
└── README.md
```

## API Endpoints

All endpoints are served beneath `/api`.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Check that the API is running |
| GET | `/api/complaints` | List complaints, newest first |
| GET | `/api/complaints/:id` | Retrieve a complaint by its human-readable ID |
| POST | `/api/complaints` | Create a complaint |
| PATCH | `/api/complaints/:id` | Update supported complaint fields |
| DELETE | `/api/complaints/:id` | Delete a complaint |

Complaint creation requires `title`, `category`, `description`, `location`, `citizenName`, and `citizenEmail`. New records receive a `Submitted` status and `Medium` priority by default. Status changes add a timestamped activity entry.

## Local Setup

Prerequisites: Node.js and npm, plus a MongoDB Atlas database and connection string.

### Backend

In PowerShell:

```powershell
cd D:\Hackthon\CivicComplaint\backend
npm.cmd install
Copy-Item .env.example .env
```

Edit `backend/.env` locally: set `MONGODB_URI` to your Atlas connection string and keep `PORT=5000`. Do not commit `.env` or share its credentials.

Start the API:

```powershell
npm.cmd run dev
```

The health endpoint is available at `http://localhost:5000/api/health`.

### Frontend

In a second PowerShell window:

```powershell
cd D:\Hackthon\CivicComplaint\frontend
npm.cmd install
Copy-Item .env.example .env
npm.cmd run dev
```

The frontend API base URL defaults to `http://localhost:5000/api`; `frontend/.env` can override it with `VITE_API_BASE_URL`. To create a production build, run `npm.cmd run build`. To run lint checks, run `npm.cmd run lint`.

## Demo Credentials

These are development/demo credentials for the frontend-only demo authentication. Do not use them for a deployed or production system.

| Role | Email | Password |
| --- | --- | --- |
| Citizen | `citizen@civiccomplaint.com` | `Citizen@123` |
| Admin | `admin@civiccomplaint.com` | `Admin@123` |
| Worker | `worker@civiccomplaint.com` | `Worker@123` |

## Current Limitations

- Authentication is frontend demo authentication using `localStorage`; the backend does not authenticate or authorize users.
- Photo submission currently stores file metadata; binary image upload is not implemented.

## Future Improvements

- Real authentication and JWT-based authorization
- Cloud image storage and binary upload support
- Notifications for complaint and assignment updates
- Real map and location integration
- Expanded operational analytics

## Hackathon Demo Flow

1. Sign in as a citizen and submit a complaint.
2. Open the new complaint’s tracking page and review its status and activity.
3. Sign in as an admin, assign a department and worker, and update the status.
4. Sign in as the assigned worker and advance the task through completion.
5. Return to the citizen tracking page to review the persisted status and activity history.

## License

No license has been specified for this project yet.
