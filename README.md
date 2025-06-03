# Where I Spend
This web app helps manage your expenses.

To deploy the app:
 - Install Docker & Docker Compose on the system
 - Inside the ```docker-compose.yaml``` specify the following in ```the postgres_db``` service
 ```
  environment:
    - POSTGRES_USER=<username>
    - POSTGRES_PASSWORD=<password>
    - POSTGRES_DB=<DB Name>
 ```

 - Inside ```frontend/app/database_details.py``` specify the following matching the value in the ```docker-compose.yaml``` 
 ```
 postgres_url=f'postgresql://<username>:<password>@<Specify-IP-Address>:5432/<DB Name>'

 ```
 - Inside the ```backend/.env``` file 
 ```
 NEXT_PUBLIC_BACKEND_URL=http://<Specify-IP-Address>:8000
 ``` 
 - Run ```./dev.sh ```