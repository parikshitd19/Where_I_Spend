from typing import Optional, TYPE_CHECKING
from .primary_category_model import PrimaryCategoryRead
from .secondary_category_model import SecondaryCategoryRead
from sqlmodel import SQLModel, Field, Relationship
from uuid import UUID, uuid4
from datetime import date
from decimal import Decimal

if TYPE_CHECKING:
    from .secondary_category_model import SecondaryCategory
    from .primary_category_model import PrimaryCategory

class TransactionBase(SQLModel):
    amount: Optional[Decimal] = Field(default=None, max_digits=7, decimal_places=2)
    place: Optional[str] = None
    details: Optional[str] = None
    transaction_date: date
    secondary_category_id: int = Field(default=None, foreign_key="secondarycategory.id")
    primary_category_id: int = Field(default=None, foreign_key="primarycategory.id")

class TransactionCreate(TransactionBase):
    pass

class TransactionUpdate(SQLModel):
    amount: Optional[Decimal] = Field(default=None, max_digits=7, decimal_places=2)
    place: Optional[str] = None
    details: Optional[str] = None
    transaction_date: Optional[date] = None
    secondary_category_id: Optional[int] = None
    primary_category_id: Optional[int] = None

class TransactionRead(TransactionBase):
    id: UUID
    primary_category: Optional[PrimaryCategoryRead] = None
    secondary_category: Optional[SecondaryCategoryRead] = None

class Transaction(TransactionBase, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True, index=True)
    secondary_category: Optional["SecondaryCategory"] = Relationship(back_populates="transactions")
    primary_category: Optional["PrimaryCategory"] = Relationship(back_populates="transactions")
