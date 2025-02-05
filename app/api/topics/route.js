import connectMongoDB from "@/libs/mongodb";
import Expense from "@/models/topic"; // Renamed from Topic to Expense
import TotalAmount from "@/models/totalAmount";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { amount, label, credit } = await request.json();

    if (!amount || !label || credit === undefined) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await connectMongoDB();
    
    // Create the new expense entry
    await Expense.create({ amount, label, credit });

    // Update total amount
    let totalAmount = await TotalAmount.findOne();
    
    if (!totalAmount) {
        totalAmount = await TotalAmount.create({ amount: 0 });
    }

    // Adjust total amount based on credit
    totalAmount.amount += credit ? amount : -amount;
    await totalAmount.save();

    return NextResponse.json({ message: "Expense created" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const expenses = await Expense.find();
    
    return NextResponse.json({ expenses });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    await connectMongoDB();

    // Find the expense before deletion
    const expense = await Expense.findById(id);
    if (!expense) {
        return NextResponse.json({ message: "Expense not found" }, { status: 404 });
    }

    // Adjust the total amount before deleting the expense
    let totalAmount = await TotalAmount.findOne();
    if (totalAmount) {
        totalAmount.amount -= expense.credit ? expense.amount : -expense.amount;
        await totalAmount.save();
    }

    await Expense.findByIdAndDelete(id);

    return NextResponse.json({ message: "Expense deleted" }, { status: 200 });
}
