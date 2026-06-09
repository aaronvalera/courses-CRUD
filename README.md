# Courses CRUD API

This project is a RESTful API built with **Node.js** and **Express** that allows you to manage data(Mathematics and Programming courses) using standard HTTP methods (GET, POST, PUT, PATCH, DELETE).

---

## Prerequisites

Before getting started, make sure you have the following installed:
* [Node.js](https://nodejs.org/) (Version 14 or higher)
* NPM (Installed automatically with Node)
* [Git](https://git-scm.com/)

---

## Installation and Setup

Follow these steps to run the server locally:

1. **Clone the repository:**

Click on the green **"code"** button on this GitHub repo, copy the https method:
![Clone repo image](./assets/img/clone-repo.png)

After that, copy the following code in your terminal:

**bash/powershell**

    ```git clone <repository-url>
    cd <folder-name>
    ```

2. **Install the necessary dependencies**

    ```bash/powershell
    npm install
    ```
3. **Start the Server**

    ```bash/powershell
    node index.js
    ```
---

## Available Endpoints

### Programming Module

**Root**: http://localhost:3000/api/courses/programming

| Method | Endpoint | Description | Requisites & Outputs |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Returns the full list of programming courses. | **Success:** `200 OK` |
| **GET** | `/?sort=views` | Returns the full list of programming courses sorted by views from least to most. | **Success:** `200 OK` |
| **GET** | `/:language` | Filters courses by language (example. `javascript`). Allows sorting. | 
| **GET** | `/:language/:level` | Filter courses by language and difficulty level (example. `beginner`). | **Error:** `404` if there are no matches. |
| **POST** | `/` | Registers a new course in the database. | **Body:** JSON with the properties of the course. **Error:** `400` if the ID is repeated. |
| **PUT** | `/:id` | Replaces an existing course in its entirety. | **Body:** entire JSON. **Error:** `404` if the ID is not found. |
| **PATCH** | `/:id` | Modifies specific properties of a course. | **Body:** JSON with properties to update. **Error:** `404` if the ID is not found. |
| **DELETE** | `/:id` | Removes a course from the database based on its ID. | **Error:** `404` if the ID is not found. |

### Mathematics Module

**Root:** http://localhost:3000/api/courses/mathematics

| Method | Endpoint | Description | Requisites & Outputs |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Returns the full list of mathematics courses. | **Success:** `200 OK` |
| **GET** | `/?sort=views` | Returns the full list of mathematics courses sorted by views from least to most. | **Success:** `200 OK` |
| **GET** | `/:subject` | Filters courses by language (example. `javascript`). Allows sorting. |
| **GET** | `/:subject/:level` | Filter courses by language and difficulty level (example. `beginner`). | **Error:** `404` if there are no matches. |
| **POST** | `/` | Registers a new course in the database. | **Body:** JSON with the properties of the course. **Error:** `400` if the ID is not found. |
| **PUT** | `/:id` | Replaces an existing course in its entirety. | **Body:** entire JSON. **Error:** `404` if the ID is not found. |
| **PATCH** | `/:id` | Modifies specific properties of a course. | **Body:** JSON with properties to update. **Error:** `404` if the ID is not found. |
| **DELETE** | `/:id` | Removes a course from the database based on its ID. | **Error:** `404` if the ID is not found. |

---

## 📖 Client Request Examples

### GET (Filter by language with sorting)
`GET http://localhost:3000/api/courses/programming?sort=views`

### POST (Create course)
`POST http://localhost:3000/api/courses/programming`
```json
{
  "id": 8,
  "title": "Learn TailwindCSS",
  "language": "css",
  "views": 25000,
  "level": "beginner"
}