import EditTopicForm from "@/components/EditTopicForm";

const getExpenseById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
            cache: "no-store"
        })
        if (!res.ok) {
            throw new Error("Failed to fetch expense");
        }
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

export default async function EditExpense({ params }) {
    const { id } = params;
    const { expense } = await getExpenseById(id);
    const { amount, label, credit } = expense;
    return <EditTopicForm id={id} amount={amount} label={label} credit={credit} />
}
