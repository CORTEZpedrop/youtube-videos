# Desafio Portal de Vídeos do Youtube

## Description

This project includes a FastAPI backend that provides a set of APIs for managing video URLs. The frontend is built with React and Material-UI to provide a user-friendly interface for interacting with the backend.

## Table of Contents

- [Installation](#installation)
- [Backend Usage](#backend-usage)
- [Frontend Usage](#frontend-usage)
- [Running Tests](#running-tests)
- [API Documentation](#api-documentation)
- [Running with Docker Compose](#running-with-docker-compose)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

### Backend

1. Clone the repository:

   ```bash
   git clone https://github.com/CORTEZpedrop/youtube-videos.git
   ```

2. Navigate to the backend directory:

   ```bash
   cd backend
   ```

3. Create a virtual environment:

   ```bash
   python -m venv venv
   ```

4. Activate the virtual environment:

   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

5. Install the dependencies:

   ```bash
   pip install -r requirements.txt
   ```

6. To start the FastAPI backend, navigate to the backend directory and run the following command:

   ```bash
   uvicorn main:app --reload
   ```

This will start the backend on http://localhost:8000.

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run the app:
   ```bash
   npm run dev
   ```

## Running Tests

To ensure the backend is functioning as expected, you can run the tests using pytest.

Make sure you are in the backend directory and have your virtual environment activated.

Run the following command:

```bash
pytest
```

This will automatically discover and run all tests in the backend.

## API Documentation

FastAPI provides interactive API documentation using Swagger UI and ReDoc.

Swagger UI: Available at http://localhost:8000/docs
ReDoc: Available at http://localhost:8000/redoc
These interfaces allow you to test the APIs directly from your browser.

## Running with Docker Compose

To simplify running both the backend and frontend, you can use Docker Compose.

Prerequisites
You need to have Docker and Docker Compose installed. You can install Docker Compose by running:

```bash
sudo apt-get install docker-compose
```

## Running the Application

Once Docker Compose is installed, navigate to the project root directory (where docker-compose.yaml is located).

Run the following command to build and start the containers:

```bash
docker-compose up --build
```

This will build the Docker images for both the backend and frontend and start them. You can access:

Frontend: http://localhost:3000
Backend: http://localhost:8000
To stop the containers, press Ctrl+C or run:

```bash
docker-compose down
```

## Features

FastAPI-based backend for managing video URLs.
React + Material-UI frontend for user interaction.
API documentation using Swagger UI and ReDoc.
Docker Compose setup for running the entire stack with ease.
Unit tests with Pytest.

License
This project is licensed under the MIT License.

Contact
For more information or questions, please contact pedrocortez.ppc@gmail.com.

### What's Included:

- **Installation instructions** for both the backend and frontend.
- **Backend usage** with FastAPI.
- Instructions on **running tests** with Pytest.
- How to access **API documentation** via Swagger UI and ReDoc.
- **Docker Compose** setup to run the project.
- Basic info on **features**, **contributing**, **license**, and **contact**.
