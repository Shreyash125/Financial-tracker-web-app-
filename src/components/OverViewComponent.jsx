import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  align-items: center;
  font-size: 16px;
  width:424px;
`;

const ExpenseContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 20px;
`;

const ExpenseBox = styled.div`
  border-radius: 4px;
  border: 1px solid #e6e8e9;
  padding: 15px 20px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 135px;
  & span {
    color: ${(props) => (props.isIncome ? "green" : "red")};
    font-weight: bold;
    font-size: 20px;
  }
`;

const BalanceBox = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-weight: bold;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #e6e8e9;
  margin-bottom: 20px;
  background: #f9f9f9; /* Optional: Background color for better contrast */
  & span {
    color: ${(props) => (props.balance < 0 ? "red" : "#0d1d2c")};
    opacity: 80%;
    font-weight: bold;
    font-size: 20px;
  }
`;

const AddTransaction = styled.div`
  font-size: 15px;
  background: #0d1d2c;
  display: flex;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  flex-direction: row;
  border-radius: 4px;
  font-weight: bold;
`;

const AddTransactionContainer = styled.div`
  font-size: 15px;
  display: ${(props) => (props.isAddTxnVisible ? "flex" : "none")};
  color: #0d1d2c;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid #e6e8e9;
  width: 100%;
  align-items: center;
  padding: 15px 20px;
  margin: 10px 20px;
  gap: 10px;
  & input {
    width: 90%;
    outline: none;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid #e6e8e9;
  }
`;

const RadioBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin: 10px 0;
  & input {
    width: unset;
    margin: 0 10px;
  }
`;

const AddTransactionView = ({ isAddTxnVisible, addTransaction }) => {
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("EXPENSE");
  const [date, setDate] = useState("");

  return (
    <AddTransactionContainer isAddTxnVisible={isAddTxnVisible}>
      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <input
        placeholder="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <RadioBox>
        <input
          type="radio"
          id="expense"
          name="type"
          value="EXPENSE"
          checked={type === "EXPENSE"}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="expense">Expense</label>
        <input
          type="radio"
          id="income"
          name="type"
          value="INCOME"
          checked={type === "INCOME"}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="income">Income</label>
      </RadioBox>
      <AddTransaction
        onClick={() => {
          addTransaction({
            id: Date.now(),
            amount: Number(amount),
            desc,
            type,
            date,
          });
          setAmount("");
          setDesc("");
          setDate("");
        }}
      >
        Add Transaction
      </AddTransaction>
    </AddTransactionContainer>
  );
};

const OverViewComponent = ({ income, expense, addTransaction }) => {
  const [isAddTxnVisible, toggleAddTxn] = useState(false);
  const balance = income - expense;

  return (
    <Container>
      <BalanceBox balance={balance}>
        Balance: <span>₹{balance}</span>
        <AddTransaction onClick={() => toggleAddTxn((prev) => !prev)}>
          {isAddTxnVisible ? "CANCEL" : "ADD"}
        </AddTransaction>
      </BalanceBox>
      {isAddTxnVisible && (
        <AddTransactionView
          isAddTxnVisible={isAddTxnVisible}
          addTransaction={(payload) => {
            addTransaction(payload);
            toggleAddTxn(false);
          }}
        />
      )}
      <ExpenseContainer>
        <ExpenseBox>
          Expense<span>₹{expense}</span>
        </ExpenseBox>
        <ExpenseBox isIncome={true}>
          Income<span>₹{income}</span>
        </ExpenseBox>
      </ExpenseContainer>
    </Container>
  );
};

export default OverViewComponent;
