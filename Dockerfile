# Stage 1: Combined builder for backend and frontend
FROM python:3.13-alpine AS builder

# Install dependencies including bash for the bun installer and libstdc++ for bun itself
RUN apk add --no-cache curl unzip bash libstdc++

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash

# Add Bun to the PATH for subsequent RUN commands
ENV PATH="/root/.bun/bin:$PATH"

WORKDIR /app

# Copy backend code and install Python dependencies
COPY apps/backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY apps/backend/src ./src

# Copy frontend code and install Bun dependencies
COPY apps/frontend /app/frontend
RUN cd /app/frontend && bun install

# Generate OpenAPI client and build the frontend
# This requires the backend to be running
RUN <<EOF
set -e
uvicorn src.main:app --host 0.0.0.0 --port 8000 &
sleep 5 # Give the server a moment to start
cd /app/frontend
bun run openapi-ts
bun run build
kill %1
EOF

# Stage 2: Final runtime image
FROM python:3.13-alpine AS runtime

WORKDIR /app

# Set environment to production
ENV ENVIRONMENT=production

# Copy Python dependencies from the builder stage
COPY --from=builder /usr/local/lib/python3.13/site-packages /usr/local/lib/python3.13/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# Copy the application code and the built frontend static files from the builder stage
COPY --from=builder /app/src ./src
COPY --from=builder /app/frontend/dist ./src/static

# Expose the port FastAPI runs on
EXPOSE 8000

# Command to run the FastAPI application with Uvicorn
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]