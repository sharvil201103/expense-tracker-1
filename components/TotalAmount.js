"use client"
import { useEffect, useState } from "react";

const getTotalAmount = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/amount", {
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error("Failed to fetch topics");
        }
        const data = await res.json();
        // console.log()
        // return data.amounts.reduce((total, topic) => total + topic.amount, 0);
        return data.totalAmount.amount;
    } catch (error) {
        console.log("Error: ", error);
        return 0;
    }
};

export default function TotalAmount() {
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const fetchTotalAmount = async () => {
            const total = await getTotalAmount();
            console.log(total)
            setTotalAmount(total);
        };

        fetchTotalAmount();
    }, []);

    return (
        <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-center">
            <h2 className="font-bold text-2xl">Total Amount</h2>
            <div className="text-xl">{totalAmount}</div>
        </div>
    );
}
