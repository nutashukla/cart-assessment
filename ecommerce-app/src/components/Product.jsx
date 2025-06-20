'use client';

import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';
import { products } from '../lib/product';

export default function ProductList({ search }) {
  const { addToCart } = useCart();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {filteredProducts.map((product) => (
        <Card key={product.id} className="flex flex-col justify-between">
          <CardContent>
            <div className="w-full aspect-[4/3] overflow-hidden rounded mb-4 bg-white flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <h4 className="font-bold">{product.name}</h4>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <p className="font-bold text-md">₹{product.price.toFixed(2)}</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => addToCart(product)}>
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
      {filteredProducts.length === 0 && (
        <p className="col-span-full text-center text-gray-500">No products found.</p>
      )}
    </div>
  );
}
