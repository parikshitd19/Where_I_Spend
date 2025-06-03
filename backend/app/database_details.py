from sqlmodel import SQLModel, create_engine, Session
import databases
from typing import Generator

postgres_url=f'postgresql://postgres:postgres123@10.110.39.56:5432/db'

engine = create_engine(postgres_url)
# database_obj = databases.Database(postgres_url)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session
