from typing import Optional, List, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from .secondary_category_model import SecondaryCategory


class PrimaryCategoryBase(SQLModel):
    name: str
    description: Optional[str] = None

class PrimaryCategoryCreate(PrimaryCategoryBase):
    pass

class PrimaryCategoryUpdate(SQLModel):
    name: Optional[str] = None
    description: Optional[str] = None

class PrimaryCategoryRead(PrimaryCategoryBase):
    id: int

class PrimaryCategory(PrimaryCategoryBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    secondary_categories: List["SecondaryCategory"] = Relationship(back_populates="primary_category")
