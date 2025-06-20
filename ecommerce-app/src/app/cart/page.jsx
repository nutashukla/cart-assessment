'use client';

import { Button } from '../../components/ui/button';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, loading } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) return <div className="p-6">Loading your cart...</div>;
  if (cart.length === 0) return <div className="p-6">Your cart is empty.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">Product</th>
            <th className="text-center p-3">Quantity</th>
            <th className="text-right p-3">Total</th>
            <th className="p-3">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id} className="border-b last:border-none">
              <td className="flex items-center gap-4 p-3">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <span className="font-semibold">{item.name}</span>
              </td>
              <td className="text-center p-3">{item.quantity}</td>
              <td className="text-right p-3">{(item.price * item.quantity).toFixed(2)}</td>
              <td className="text-center p-3">
                <Button className="bg-red-900" size="sm" onClick={() => removeFromCart(item.id)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right font-bold text-xl mt-6">Total: {total.toFixed(2)}</div>
    </div>
  );
}
