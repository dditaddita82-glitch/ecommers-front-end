import { Cart } from "@/models/Cart";
import { CartItem } from "@/models/CartItem";

// app/api/cart/clear/route.ts
export async function DELETE() {
  const session = await requireAuth();
  await connectDB();

  const cart = await Cart.findOne({ user_id: session.user.id });
  if (cart) {
    await CartItem.deleteMany({ cart_id: cart._id });
  }

  return NextResponse.json({ success: true });
}
