// app/api/cart/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAuth } from "@/lib/auth-helper";
import { Cart } from "@/models/Cart";
import { CartItem } from "@/models/CartItem";

export async function GET() {
  const session = await requireAuth();
  await connectDB();

  let cart = await Cart.findOne({ user_id: session.user.id });
  if (!cart) {
    cart = await Cart.create({ user_id: session.user.id });
  }

  const items = await CartItem.find({ cart_id: cart._id }).populate(
    "product_id",
    "name price stock weight",
  );

  return NextResponse.json({ cart, items });
}
