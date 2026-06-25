import { CartItem } from "@/models/CartItem";

// app/api/cart/item/[id]/route.ts
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await requireAuth();
  await connectDB();

  const { quantity } = await req.json();

  if (quantity <= 0) {
    return NextResponse.json(
      { message: "Quantity must be > 0" },
      { status: 400 },
    );
  }

  const item = await CartItem.findById(params.id);
  if (!item) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  item.quantity = quantity;
  await item.save();

  return NextResponse.json(item);
}
