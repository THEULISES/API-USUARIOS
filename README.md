# API Usuarios (mínimo)

- Stack: Node.js + Express (ESM)
- Endpoints:
  - GET /users
  - GET /users/:id
- Upstream: https://fakerestapi.azurewebsites.net/api/v1/Users

## Ejecutar

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Iniciar servidor:
   ```bash
   npm start
   ```
3. Probar:
   - http://localhost:3000/users
   - http://localhost:3000/users/1
