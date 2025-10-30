# ScriptGuru


# Team Collaboration Board

A modern, full-stack Team Collaboration Board application built with React, Node.js, Express and MongoDB. This project provides a clean, intuitive Kanban-style interface for organizing tasks across different boards and statuses.


## Features

-   **Board Management**:
    -   Create new boards to categorize your projects or workflows.
    -   View a list of all available boards in the sidebar.
    -   Delete boards, which also removes all associated tasks.
-   **Task Management (CRUD)**:
    -   **Create**: Add new tasks with a title, description, status, priority, assignee, and due date.
    -   **Read**: View all tasks organized into "To Do", "In Progress", and "Done" columns.
    -   **Update**: Edit any detail of an existing task through a modal form.
    -   **Delete**: Remove tasks you no longer need.
-   **Task Status Updates**: Easily change a task's status directly from the task card.
-   **Task Prioritization**: Assign "Low", "Medium", or "High" priority to tasks, indicated by color-coded tags.
-   **Responsive UI**: A clean and modern user interface built with Tailwind CSS.

## Tech Stack

-   **Frontend**:
    -   **React**: A JavaScript library for building user interfaces.
    -   **Vite**: A blazing-fast frontend build tool.
    -   **TypeScript**: For static typing and improved developer experience.
    -   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
-   **Backend**:
    -   **Node.js**: A JavaScript runtime for the server.
    -   **Express**: A minimal and flexible Node.js web application framework.
    -   **Mongoose**: An elegant MongoDB object modeling tool for Node.js.
-   **Database**:
    -   **MongoDB**: A NoSQL document-oriented database. (MongoDB Atlas is recommended for easy setup).

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:
-   [Node.js](https://nodejs.org/en/) (v18 or later is recommended)
-   [npm](https://www.npmjs.com/) (comes bundled with Node.js)
-   Access to a MongoDB database. You can get a free one from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).

---

## Setup and Installation

Follow these steps to get your local development environment up and running.

### 1. Clone the Repository

Clone this project to your local machine:
```bash
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
```

### 2. Install Dependencies

This single command will install all the necessary packages for both the frontend and the backend.
```bash
npm install
```

### 3. Configure Environment Variables

You need to connect the server to your MongoDB database.

-   Create a new file named `.env` in the **root directory** of the project.
-   Add your MongoDB connection string to this file. You can get this string from your MongoDB Atlas dashboard.

Your `.env` file should look like this:

```
# .env

MONGODB_URI=mongodb+srv://<username>:<password>@yourcluster.mongodb.net/yourDatabaseName?retryWrites=true&w=majority
```
*Replace the placeholder with your actual connection string.*

### 4. Run the Application

Use the following command to start both the backend Express server and the frontend Vite development server concurrently:

```bash
npm run dev
```

You should see output in your terminal indicating that both servers have started:
-   **Backend Server** will be running on `http://localhost:5001`
-   **Frontend Server** will be running on `http://localhost:5173` (or another port if 5173 is busy).

Open your browser and navigate to the frontend URL to see the application in action!

---

