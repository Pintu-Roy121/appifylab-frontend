# AppifyLab Task Frontend

A Next.js frontend for the AppifyLab social feed application — registration/login, a post feed with image uploads, public/private post visibility, nested comments and replies, and a like system across posts, comments, and replies.

## Author

Pintu Roy

## Live Demo - Server / Back-End

🔗 **[https://appify-lab-task-server.vercel.app](https://appify-lab-task-server.vercel.app)**

## Live Demo - Front-End

🔗 **[https://appifylab-task-frontend-bice.vercel.app](https://appifylab-task-frontend-bice.vercel.app)**

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Axios** — API requests
- **react-icons** — icon set

## Prerequisites

- Node.js (v18 or later)
- npm
- A running instance of the [backend API](#) (see `appifylab-task-server`)

## Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd appifylab-task-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env.local` file

```env
NEXT_PUBLIC_SERVER_API_URL=http://localhost:5000
```

Point this at your backend's base URL — use `http://localhost:5000` for local development, or your deployed backend URL in production.

## Run the project

Start the development server:

```bash
npm run dev
```

The app will run at:

```
http://localhost:3000
```

Build for production:

```bash
npm run build
npm start
```

## Project Structure

```
src/ (or app/, depending on your layout)
│── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── page.tsx           # home feed
│   └── layout.tsx
│
├── components/             # PostCard, EngagementBar, CommentSection, etc.
├── api/                     # useGet / usePost hooks, axios instance
├── interfaces/              # shared TypeScript types (Post, Comment, etc.)
└── utils/                   # helpers (timeAgo, etc.)
```

## Features

- **Authentication** — registration and login forms with client-side field validation, JWT stored client-side and attached to API requests automatically
- **Protected routes** — pages redirect unauthenticated users to `/login`
- **Post feed** — posts shown newest-first, each with author, timestamp, and public/private visibility
- **Image uploads** — attach an image to a post via `FormData`, uploaded to the backend's Cloudinary pipeline
- **Likes** — like/unlike posts, comments, and replies, with an avatar stack showing who liked (capped with a "+N" overflow badge)
- **Comments & replies** — comment on posts, reply to specific comments inline, each with independent like state
- **Instant UI feedback** — optimistic updates so likes/comments reflect immediately without waiting on a full refetch
- **Responsive, Tailwind-based UI** — built to match provided design mockups (registration, login, post cards, sidebars)

## Environment Variables

| Variable                     | Description                 |
| ---------------------------- | --------------------------- |
| `NEXT_PUBLIC_SERVER_API_URL` | Base URL of the backend API |

## Available Scripts

| Script          | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Build the app for production |
| `npm start`     | Run the production build     |

## License

This project is licensed under the ISC License.
