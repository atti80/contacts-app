# Contacts App

A full-stack contact management application built with Next.js, SQLite, and AWS S3.

## Live Demo

https://contacts-app-sage.vercel.app/

## Tech Stack

- **Frontend:** Next.js 16, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** SQLite (local) / Turso (Vercel deployment)
- **Image Storage:** AWS S3

## Features

- View all contacts
- Add a new contact
- Edit an existing contact
- Delete a contact
- Avatar image upload via AWS S3
- Responsive design (mobile + desktop)

## Running Locally

### Prerequisites

- Node.js v22.12+
- npm

### Setup

1. Clone the repository

   `git clone https://github.com/atti80/contacts-app`

   `cd contacts-app`

2. Install dependencies

   `npm install`

3. Create `.env.local` file in root folder. Copy and paste contents of .env.example into .env.local. Set environment variables to use local database and AWS S3 file storage. AWS credentials have been shared privately with the hiring team.

   `TURSO_DATABASE_URL=file:db/contacts.db`  
   `AWS_REGION=`  
   `AWS_ACCESS_KEY_ID=`  
   `AWS_SECRET_ACCESS_KEY=`  
   `AWS_BUCKET_NAME=`

   The app uses a SQLite database file included in the repository with sample contacts.

4. Run the development server

   `npm run dev`

5. Open http://localhost:3000
