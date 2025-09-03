# Stage 1: Build the React frontend
FROM oven/bun:1-alpine AS frontend-builder

WORKDIR /app/frontend

COPY apps/frontend/package.json apps/frontend/bun.lock ./
RUN bun install

COPY apps/frontend/ .
RUN bun run build

# Stage 2: Build the FastAPI backend
FROM python:3.13-alpine AS backend-builder

WORKDIR /app

# Install Python dependencies
COPY apps/backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend application code
COPY apps/backend/src ./src

# Copy the built frontend static files from the frontend-builder stage
COPY --from=frontend-builder /app/frontend/dist ./src/static


# Stage 3: Final runtime image
FROM python:3.13-alpine AS runtime

WORKDIR /app

# Set environment to production
ENV ENVIRONMENT=production

# Copy Python dependencies from backend-builder
COPY --from=backend-builder /usr/local/lib/python3.13/site-packages /usr/local/lib/python3.13/site-packages
COPY --from=backend-builder /usr/local/bin /usr/local/bin

# Copy the application code and static files from backend-builder
COPY --from=backend-builder /app .

# Expose the port FastAPI runs on
EXPOSE 8000

# Command to run the FastAPI application with Uvicorn
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]