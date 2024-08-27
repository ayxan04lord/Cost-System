import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setInitialBalance, addEntry, removeEntry, updateEntry } from "../balanceSlice";
import "./Payment.css";

const Payment = () => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [initialBalance, setInitialBalanceInput] = useState("");
    const [editId, setEditId] = useState(null); 
    const [editName, setEditName] = useState("");
    const [editAmount, setEditAmount] = useState("");
    const initialBal = useSelector((state) => state.balance.initialBalance);
    const currentBal = useSelector((state) => state.balance.currentBalance);
    const entries = useSelector((state) => state.balance.entries);
    const dispatch = useDispatch();

    const handleSetBalance = () => {
        if (initialBalance > 0) {
            dispatch(setInitialBalance(parseFloat(initialBalance)));
            setInitialBalanceInput("");
        }
    };

    const handleAddEntry = () => {
        if (name && amount > 0) {
            dispatch(addEntry({ id: Date.now(), name, amount: parseFloat(amount) }));
            setName("");
            setAmount("");
        }
    };

    const handleRemoveEntry = (id) => {
        dispatch(removeEntry({ id }));
    };

    const handleEditEntry = (id, name, amount) => {
        setEditId(id);
        setEditName(name);
        setEditAmount(amount);
    };

    const handleUpdateEntry = () => {
        if (editName && editAmount > 0) {
            dispatch(updateEntry({ id: editId, name: editName, amount: parseFloat(editAmount) }));
            setEditId(null);
            setEditName("");
            setEditAmount("");
        }
    };

    const totalSpent = entries.reduce((acc, entry) => acc + entry.amount, 0);

    return (
        <div className="container">
            <div className="set-balance">
                <input
                    className="myInput2"
                    type="number"
                    placeholder="Set Initial Balance"
                    value={initialBalance}
                    onChange={(e) => setInitialBalanceInput(e.target.value)}
                />
                <button type="button" onClick={handleSetBalance}>
                    Set Balance
                </button>
            </div>

            <div className="profile">
                <h2>Profile</h2>
                <p>Total Balance: {initialBal.toFixed(2)}$</p>
                <p>Remaining Balance: {currentBal.toFixed(2)}$</p>
            </div>

            <div className="start">
                <h1>Sumqayit Payment</h1>
                <span>Check Your Sum</span>
            </div>

            <header>
                <input
                    className="myInput2"
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className="myInput"
                    type="number"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button type="button" onClick={handleAddEntry}>
                    ADD
                </button>
            </header>

            <table className="entriesTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry) => (
                        <tr key={entry.id}>
                            <td>{editId === entry.id ? (
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                />
                            ) : (
                                entry.name
                            )}</td>
                            <td>{editId === entry.id ? (
                                <input
                                    type="number"
                                    value={editAmount}
                                    onChange={(e) => setEditAmount(e.target.value)}
                                />
                            ) : (
                                entry.amount.toFixed(2) + "$"
                            )}</td>
                            <td>
                                {editId === entry.id ? (
                                    <>
                                        <button onClick={handleUpdateEntry}><i className="bi bi-pen"></i></button>
                                        <button onClick={() => setEditId(null)}><i className="bi bi-trash"></i></button>
                                    </>
                                ) : (
                                    <div className="">
                                        <button className="btn btn-warning" onClick={() => handleEditEntry(entry.id, entry.name, entry.amount)}><i className="bi bi-pen"></i></button>
                                        <button className="btn btn-danger" onClick={() => handleRemoveEntry(entry.id)}><i className="bi bi-trash"></i>
                                        </button>

                                    </div>

                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="summary">
                <h3>Summary</h3>
                <p>Total Spent: {totalSpent.toFixed(2)}$</p>
                <p>Remaining Balance: {currentBal.toFixed(2)}$</p>
            </div>
        </div>
    );
};

export default Payment;
