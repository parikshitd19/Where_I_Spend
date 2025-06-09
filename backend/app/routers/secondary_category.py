from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from sqlalchemy.orm import selectinload
from typing import List

from app.models.secondary_category_model import (
    SecondaryCategory,
    SecondaryCategoryCreate,
    SecondaryCategoryRead,
    SecondaryCategoryUpdate,
)
from app.database_details import get_session

router = APIRouter(prefix="/secondary-category", tags=["Secondary Categories"])


@router.post("/", response_model=SecondaryCategoryRead)
def create_secondary_category(
    category: SecondaryCategoryCreate,
    session: Session = Depends(get_session),
):
    print(category,flush=True)
    db_category = SecondaryCategory.from_orm(category)
    session.add(db_category)
    session.commit()
    session.refresh(db_category)
    return db_category


@router.get("/", response_model=List[SecondaryCategoryRead])
def read_secondary_categories(session: Session = Depends(get_session)):
    statement = (
        select(SecondaryCategory)
        .options(selectinload(SecondaryCategory.primary_category))
    )
    results = session.exec(statement).all()
    return results
    # categories = session.exec(select(SecondaryCategory)).all()
    # return categories


@router.get("/{category_id}", response_model=SecondaryCategoryRead)
def read_secondary_category(category_id: int, session: Session = Depends(get_session)):
    # category = session.get(SecondaryCategory, category_id)
    # if not category:
    #     raise HTTPException(
    #         status_code=status.HTTP_404_NOT_FOUND, detail="Secondary category not found"
    #     )
    # return category
    statement = (
        select(SecondaryCategory)
        .where(SecondaryCategory.id == category_id)
        .options(selectinload(SecondaryCategory.primary_category))
    )
    result = session.exec(statement).first()
    if not result:
        raise HTTPException(status_code=404, detail="Secondary category not found")
    return result


@router.put("/{category_id}", response_model=SecondaryCategoryRead)
def update_secondary_category(
    category_id: int,
    category_update: SecondaryCategoryUpdate,
    session: Session = Depends(get_session),
):
    category = session.get(SecondaryCategory, category_id)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Secondary category not found"
        )
    update_data = category_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(category, key, value)
    session.add(category)
    session.commit()
    session.refresh(category)
    return category


@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_secondary_category(category_id: int, session: Session = Depends(get_session)):
    category = session.get(SecondaryCategory, category_id)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Secondary category not found"
        )
    session.delete(category)
    session.commit()
    return None
