# sl-express-fullstack
express, vite, react, antd, tailwind.

# Backend Entrypoints:

* /config/routes.js: all routes of the server
* /app/controllers: all controllers

# Frontend Entrypoints:

* /static/src/index.jsx: the entrypoint the whole frontend react app. the source code of /static/dist/index.js
* /static/dist/index.js: the compiled js file entrypoint, used in /app/views/index.ejs

# Quick Start:

```bash
git clone https://github.com/terencewu-shopline/sl-express-fullstack
cd sl-express-fullstack
git checkout <branch_name>

yarn
cp .env.example .env
<fill in missing ENV in .env>
docker run -d redis -p 6379:6379

yarn dev
```
