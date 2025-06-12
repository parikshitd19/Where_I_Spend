# Where I Spend
This web app helps manage your expenses.

The app compromises of 3 components:
  - [backend](backend) : a FASTAPI application
  - [frontend](frontend) : a Next.js application 
  - [db_data](db_data) : the location for docker volume of the local Postgres DB copy.

To deploy the app:
 - Install Docker & Docker Compose on the system
 - Inside the [docker-compose.yaml](docker-compose.yaml) specify the following in ```postgres_db``` service
 ```
  environment:
    - POSTGRES_USER=<username>
    - POSTGRES_PASSWORD=<password>
    - POSTGRES_DB=<DB Name>
 ```

 - Inside [database_details.py](backend/app/database_details.py) specify the following matching the value in the [docker-compose.yaml](docker-compose.yaml)
 ```
 postgres_url=f'postgresql://<username>:<password>@<Specify-IP-Address-of-Machine>:5432/<DB Name>'

 ```
 - Using the [.env.template](frontend/.env.template) create ```.env``` file in the frontend folder and specify the values
 <!-- ```
 NEXT_PUBLIC_BACKEND_URL=http://<Specify-IP-Address-of-Machine>:8000
 ```  -->
 - Run ```./dev.sh ```