from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List

from app.models.primary_category_model import (
    PrimaryCategory,
    PrimaryCategoryCreate,
    PrimaryCategoryRead,
    PrimaryCategoryUpdate,
)
from app.database_details import get_session

router = APIRouter(prefix="/primary_category", tags=["Primary Categories"])


@router.post("/", response_model=PrimaryCategoryRead)
def create_primary_category(
    category: PrimaryCategoryCreate,
    session: Session = Depends(get_session),
):
    db_category = PrimaryCategory.from_orm(category)
    session.add(db_category)
    session.commit()
    session.refresh(db_category)
    return db_category


@router.get("/", response_model=List[PrimaryCategoryRead])
def read_primary_categories(session: Session = Depends(get_session)):
    categories = session.exec(select(PrimaryCategory)).all()
    return categories


@router.get("/{category_id}", response_model=PrimaryCategoryRead)
def read_primary_category(category_id: int, session: Session = Depends(get_session)):
    category = session.get(PrimaryCategory, category_id)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Primary category not found"
        )
    return category


@router.put("/{category_id}", response_model=PrimaryCategoryRead)
def update_primary_category(
    category_id: int,
    category_update: PrimaryCategoryUpdate,
    session: Session = Depends(get_session),
):
    category = session.get(PrimaryCategory, category_id)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Primary category not found"
        )
    category_data = category_update.dict(exclude_unset=True)
    for key, value in category_data.items():
        setattr(category, key, value)
    session.add(category)
    session.commit()
    session.refresh(category)
    return category


@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_primary_category(category_id: int, session: Session = Depends(get_session)):
    category = session.get(PrimaryCategory, category_id)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Primary category not found"
        )
    session.delete(category)
    session.commit()
    return None
