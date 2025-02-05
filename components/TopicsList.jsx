import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getExpenses = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/topics', {
            cache: "no-store"
        });
        if (!res.ok) {
            throw new Error("Failed to fetch expenses");
        }
        return res.json();
    } catch (error) {
        console.log("Error: ", error);
    }
}

export default async function ExpensesList() {
    const { expenses } = await getExpenses();
    return (
        <>
            {expenses.map((e) => (
                <div key={e._id} className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
                    <div>
                        <h2 className="font-bold text-2xl">
                            {e.label}
                        </h2>
                        <div>
                            {e.amount} {e.credit ? "Credit" : "Debit"}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <RemoveBtn id={e._id} />
                        {/* <Link href={`/editTopic/${e._id}`}>
                            <HiPencilAlt size={24} />
                        </Link> */}
                    </div>
                </div>
            ))}
        </>
    );
}
