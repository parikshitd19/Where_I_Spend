FROM tiangolo/uvicorn-gunicorn-fastapi:python3.10

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements.txt file into the container
COPY requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

# Copy the rest of your application code into the container
COPY . .

# Expose port 80 (or the port your FastAPI app is running on)
EXPOSE 8000

# Command to run your FastAPI application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]