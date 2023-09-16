# Safeboda API

The Ride-Share application is a platform that allows users to request rides, drivers to accept ride requests, and handles user authentication.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Introduction

The Ride-Share application provides a complete ride-sharing solution. It allows users to register, request rides, and drivers to accept those ride requests. The application also includes user authentication for secure access.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (version v16.17.0)
- npm or yarn installed
- TypeScript
- PostgreSQL
- Docker

## Installation

To get started, follow these steps for local installation:

1. Clone the repository:

   ```bash
   git clone git@github.com:rOluochKe/safeboda-app.git
   cd safeboda-app
   ```

2. Install dependencies:

   ```bash
   $ npm install
   ```

3. Set up your database configuration in `.env` use `.env.example` as a guide.

4. Running the app

   ```bash
   $ npm run start
   ```

To get started, follow these steps for docker installation:

1. Docker build: `docker-compose up --build`
2. Run build Docker: `docker-compose up`
3. Docker shutdown: `docker-compose down`

## Usage

The Ride-Share application provides the following features:

- All users can register and log in.
- Users can request rides.
- Drivers can toggle their availability.
- Drivers can accept ride requests.
- Users and drivers can view ride details.
- Drivers can update ride statuses.

## API Endpoints

Use the API documentation to test the application's endpoints:

- Using local setup: `http://localhost:3000/api/v1/docs#/`

or

- Using docker: `http://localhost/api/v1/docs#/`
