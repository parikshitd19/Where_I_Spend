from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List

from app.models.transaction_model import (
    Transaction,
    TransactionCreate,
    TransactionRead,
    TransactionUpdate,
)
from app.database_details import get_session

router = APIRouter(prefix="/transactions", tags=["Transactions"])


@router.post("/", response_model=TransactionRead)
def create_transaction(
    transaction: TransactionCreate,
    session: Session = Depends(get_session),
):
    db_transaction = Transaction.from_orm(transaction)
    session.add(db_transaction)
    session.commit()
    session.refresh(db_transaction)
    return db_transaction


@router.get("/", response_model=List[TransactionRead])
def read_transactions(session: Session = Depends(get_session)):
    transactions = session.exec(select(Transaction)).all()
    return transactions


@router.get("/{transaction_id}", response_model=TransactionRead)
def read_transaction(transaction_id: str, session: Session = Depends(get_session)):
    transaction = session.get(Transaction, transaction_id)
    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Transaction not found"
        )
    return transaction


@router.put("/{transaction_id}", response_model=TransactionRead)
def update_transaction(
    transaction_id: str,
    transaction_update: TransactionUpdate,
    session: Session = Depends(get_session),
):
    transaction = session.get(Transaction, transaction_id)
    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Transaction not found"
        )
    update_data = transaction_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(transaction, key, value)
    session.add(transaction)
    session.commit()
    session.refresh(transaction)
    return transaction


@router.delete("/{transaction_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_transaction(transaction_id: str, session: Session = Depends(get_session)):
    transaction = session.get(Transaction, transaction_id)
    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Transaction not found"
        )
    session.delete(transaction)
    session.commit()
    return None
