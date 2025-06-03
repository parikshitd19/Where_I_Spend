from typing import Optional, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship
from uuid import UUID, uuid4
from datetime import date
from decimal import Decimal

if TYPE_CHECKING:
    from .secondary_category_model import SecondaryCategory

class TransactionBase(SQLModel):
    amount: Optional[Decimal] = Field(default=None, max_digits=7, decimal_places=2)
    place: Optional[str] = None
    details: Optional[str] = None
    transaction_date: date
    secondary_category_id: int = Field(default=None, foreign_key="secondarycategory.id")

class TransactionCreate(TransactionBase):
    pass

class TransactionUpdate(SQLModel):
    amount: Optional[Decimal] = Field(default=None, max_digits=7, decimal_places=2)
    place: Optional[str] = None
    details: Optional[str] = None
    transaction_date: Optional[date] = None
    secondary_category_id: Optional[int] = None

class TransactionRead(TransactionBase):
    id: UUID

class Transaction(TransactionBase, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True, index=True)
    secondary_category: Optional["SecondaryCategory"] = Relationship(back_populates="transactions")
