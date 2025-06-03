from typing import Union,Annotated

from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware

from app.database_details import create_db_and_tables

# from app.models.primary_category_model import *
# from app.models.secondary_category_model import *
# from app.models.transaction_model import *
from app.routers import primary_category, secondary_category, transaction

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)
app.include_router(primary_category.router)
app.include_router(secondary_category.router)
app.include_router(transaction.router)
for route in app.routes:
    print(route.path, route.methods)
@app.on_event("startup")
async def on_startup():
    print("Creating Tables",flush=True)
    create_db_and_tables()

@app.get("/")
def read_root():
    for route in app.routes:
        print(route.path, route.methods,flush = True)
    return {"Hello": "World"}

# @app.post("/create_prim_cat")
# async def create_primary_category(data:PrimaryCategoryBase):
#     print(data,flush = True)
#     return {"Hello": "reached"}
