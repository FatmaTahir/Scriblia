import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("scriblia_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("scriblia_cart", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart with strict stock boundary check
  const addToCart = (product, quantityToAdd = 1) => {
    setCart((prevCart) => {
      // Find maximum stock available (either explicitly saved stock property or original backend product quantity)
      const maxStock = product.stock ?? product.maxStock ?? product.quantity;

      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        const currentQty = existingItem.quantity;
        const availableStock = existingItem.stock ?? maxStock;

        // Prevent exceeding stock limit
        if (availableStock !== undefined && currentQty + quantityToAdd > availableStock) {
          const allowedAdd = availableStock - currentQty;
          if (allowedAdd <= 0) return prevCart; // Stock limit reached

          return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + allowedAdd }
              : item
          );
        }

        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      }

      // First time adding to cart: explicit preserve stock limit as 'stock' key
      return [
        ...prevCart,
        {
          ...product,
          stock: maxStock,
          quantity: Math.min(quantityToAdd, maxStock ?? quantityToAdd),
        },
      ];
    });
  };

  // Remove single item
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Clear complete cart
  const clearCart = () => {
    setCart([]);
  };

  // Increase quantity by 1 with stock ceiling check
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const maxStock = item.stock ?? item.maxStock;
          if (maxStock !== undefined && item.quantity >= maxStock) {
            return item; // Do not increment past max stock
          }
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Total price
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Total items count
  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);