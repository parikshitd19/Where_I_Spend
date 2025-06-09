from typing import Optional, List, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship
from .primary_category_model import PrimaryCategoryRead

if TYPE_CHECKING:
    from .primary_category_model import PrimaryCategory
    from .transaction_model import Transaction

class SecondaryCategoryBase(SQLModel):
    name: str
    description: Optional[str] = None
    primary_category_id: int = Field(default=None, foreign_key="primarycategory.id")


class SecondaryCategoryCreate(SecondaryCategoryBase):
    pass

class SecondaryCategoryRead(SecondaryCategoryBase):
    id: int
    primary_category: Optional[PrimaryCategoryRead] = None

class SecondaryCategoryUpdate(SQLModel):
    name: Optional[str] = None
    description: Optional[str] = None
    primary_category_id: Optional[int] = None

class SecondaryCategory(SecondaryCategoryBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    primary_category: Optional["PrimaryCategory"] = Relationship(back_populates="secondary_categories")    
    transactions: List["Transaction"] = Relationship(back_populates="secondary_category")
