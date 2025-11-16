# Dynamic JSON Validator

A Node.js + TypeScript service that infers schemas from any JSON, converts them into a simplified, serializable format, rebuilds a Zod schema dynamically, and validates incoming data against that schema.  
Essentially, it's a tiny dynamic typing engine that behaves like a dev tool disguised as an API.

## Features

- **Automatic schema inference** using Zod.
- **Simple, serializable, human-readable schema format.**
- **Rebuilds Zod schemas** from the simple format.
- **Validates arbitrary objects** against dynamic schemas.
- **REST API endpoints** for schema inference and validation.
- **Unit and integration tests** included.
- **Dockerized** for easy deployment.
- **Environment variable support** (e.g., port configuration).

## Tech Stack

- Node.js + TypeScript
- Express
- Zod
- Jest + Supertest
- Docker
- GitHub Actions (CI)

## Installation & Usage

1. **Clone the repository**

   ```bash
   git clone https://github.com/altmoket/dynamic-json-validator.git
   cd dynamic-json-validator
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**  

   Create a `.env` file:

   ```bash
   PORT=3000
   ```

4. **Build the project**

   ```bash
   npm run build
   ```

5. **Start the server**

   ```bash
   npm start
   ```

## API Endpoints

### `POST /api/infer-schema`

Infers a schema from any JSON input.

**Request Example:**

```json
{
  "name": "Leo",
  "age": 30,
  "active": true,
  "tags": ["dev", "ts"]
}
```

**Response Example:**

```json
{
  "schema": {
    "name": "string",
    "age": "number",
    "active": "boolean",
    "tags": ["string"]
  }
}
```

### `POST /api/validate`

Validates an object against a simple schema.

**Request Example:**

```json
{
  "schema": {
    "name": "string",
    "age": "number",
    "active": "boolean",
    "tags": ["string"]
  },
  "object": {
    "name": "Leo",
    "age": 30,
    "active": true,
    "tags": ["dev", "ts"]
  }
}
```

**Successful Response:**

```json
{
  "valid": true,
  "errors": null
}
```

**Example with Validation Errors:**

```json
{
  "valid": false,
  "errors": [
    {
      "message": "Invalid input: expected number, received string",
      "path": ["age"]
    }
  ]
}
```

---

## Testing

**Run all tests:**

```bash
npm test
```

## Docker

**Build the image:**

```bash
docker build -t dynamic-json-validator .
```

**Run the container:**

```bash
docker run -p 3000:3000 --env PORT=3000 dynamic-json-validator
```

**Using Docker Compose:**

```bash
docker compose up --build
```
