import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProductById } from "../data/products";
import { getCart, saveCart } from "../utils/storage";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => getCart());

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  function addToCart(productId, qty = 1) {
    setCart((prev) => {
      const existing = prev.find((line) => line.productId === productId);
      if (existing) {
        return prev.map((line) =>
          line.productId === productId ? { ...line, qty: line.qty + qty } : line
        );
      }
      return [...prev, { productId, qty }];
    });
  }

  function updateQty(productId, qty) {
    setCart((prev) => {
      if (qty <= 0) return prev.filter((line) => line.productId !== productId);
      return prev.map((line) => (line.productId === productId ? { ...line, qty } : line));
    });
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((line) => line.productId !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  const lines = useMemo(
    () =>
      cart
        .map((line) => {
          const product = getProductById(line.productId);
          if (!product) return null;
          return { ...line, product, lineTotal: product.price * line.qty };
        })
        .filter(Boolean),
    [cart]
  );

  const itemCount = useMemo(() => lines.reduce((sum, line) => sum + line.qty, 0), [lines]);
  const total = useMemo(() => lines.reduce((sum, line) => sum + line.lineTotal, 0), [lines]);

  const value = { lines, itemCount, total, addToCart, updateQty, removeFromCart, clearCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside a CartProvider");
  return ctx;
}
