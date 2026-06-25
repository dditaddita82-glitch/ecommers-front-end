import { Cart } from "@/models/Cart";
import { CartItem } from "@/models/CartItem";

// app/api/cart/item/route.ts
export async function POST(req: Request) {
  const session = await requireAuth();
  await connectDB();

  const { product_id, quantity } = await req.json();

  const cart = await Cart.findOne({ user_id: session.user.id });
  const product = await Product.findById(product_id);

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 400 });
  }

  const existing = await CartItem.findOne({
    cart_id: cart._id,
    product_id,
  });

  if (existing) {
    existing.quantity += quantity;
    await existing.save();
    return NextResponse.json(existing);
  }

  const item = await CartItem.create({
    cart_id: cart._id,
    product_id,
    quantity,
    price_each: product.price,
  });

  return NextResponse.json(item, { status: 201 });
}
