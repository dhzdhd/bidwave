# bidwave
A realtime auction platform built on SvelteKit and Strapi

- title
- abstract
- team mem/role
- functional req, non func req  (I/P/o)
- tools and tech
- conclusion
- refs

## Setup

### Prerequisites

- Install [Node.js LTS](https://nodejs.org/en)
- Setup [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install) on Windows (skip if done)
- Install [Docker](https://www.docker.com/products/docker-desktop/)
- Install [Yarn](https://yarnpkg.com/getting-started/install) (for backend dev only)
- Install [Postgres](https://www.postgresql.org/download/) (for backend dev only)

### Backend

- After cloning the repository, `cd backend`
- Create a file named `.env`
- Populate `.env` file as per `.env-example` file (copy-paste)
- Change the following variables in `.env` file
  - DATABASE_HOST - 127.0.0.1
  - DATABASE_USERNAME - your local postgres username
  - DATABASE_PASSWORD - your local postgres password
- Run `yarn run develop`

### Backend - for frontend dev

- After cloning the repository, `cd backend`
- Create a file named `.env`
- Populate `.env` file as per `.env-example` file (copy-paste)
- Make sure Docker engine is up and running (start Docker Desktop to be sure)
- Run `docker compose up`

### Frontend

- `cd frontend`
- `npm install`
- `npm run dev`
