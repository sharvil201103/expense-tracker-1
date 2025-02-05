import connectMongoDB from "@/libs/mongodb";
import Expense from "@/models/topic"; // Renamed from Topic to Expense
import TotalAmount from "@/models/totalAmount";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newAmount: amount, newLabel: label, newCredit: credit } = await request.json();

    if (!amount || !label || credit === undefined) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await connectMongoDB();

    // Find the existing expense
    const existingExpense = await Expense.findById(id);
    if (!existingExpense) {
        return NextResponse.json({ message: "Expense not found" }, { status: 404 });
    }

    // Update total amount accordingly
    let totalAmount = await TotalAmount.findOne();
    if (totalAmount) {
        // Reverse the effect of the old expense
        totalAmount.amount -= existingExpense.credit ? existingExpense.amount : -existingExpense.amount;
        // Apply the effect of the updated expense
        totalAmount.amount += credit ? amount : -amount;
        await totalAmount.save();
    }

    // Update the expense
    await Expense.findByIdAndUpdate(id, { amount, label, credit });

    return NextResponse.json({ message: "Expense updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    
    await connectMongoDB();
    const expense = await Expense.findOne({ _id: id });

    if (!expense) {
        return NextResponse.json({ message: "Expense not found" }, { status: 404 });
    }

    return NextResponse.json({ expense }, { status: 200 });
}
