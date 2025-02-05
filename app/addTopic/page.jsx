"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddExpense() {
    const [amount, setAmount] = useState("");
    const [label, setLabel] = useState("");
    const [credit, setCredit] = useState(null); // Boolean state for credit

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!amount || amount <= 0 || !label || credit === null) {
            alert("All fields are mandatory, and amount must be greater than zero.");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/topics", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount, label, credit }),
            });

            if (res.ok) {
                router.push("/");
            } else {
                throw new Error("Failed to create an expense");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
                type="number"
                placeholder="Expense Amount"
                className="border border-slate-500 px-8 py-2"
                onChange={(e) => setAmount(Number(e.target.value))}
                value={amount}
            />
            <input
                type="text"
                placeholder="Expense Label"
                className="border border-slate-500 px-8 py-2"
                onChange={(e) => setLabel(e.target.value)}
                value={label}
            />
            <div className="flex gap-3">
                <label>
                    <input
                        type="radio"
                        name="credit"
                        value="true"
                        onChange={() => setCredit(true)}
                        checked={credit === true}
                    />
                    Credit
                </label>
                <label>
                    <input
                        type="radio"
                        name="credit"
                        value="false"
                        onChange={() => setCredit(false)}
                        checked={credit === false}
                    />
                    Debit
                </label>
            </div>
            <button type="submit" className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
                Add Expense
            </button>
        </form>
    );
}
