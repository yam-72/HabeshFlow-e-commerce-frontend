import { createContext, useContext, useState, useReducer } from "react";

const AppContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const existing = state.find((i) => i.id === action.item.id);
      if (existing) return state.map((i) => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...state, { ...action.item, qty: 1 }];
    case "REMOVE":
      return state.filter((i) => i.id !== action.id);
    case "UPDATE_QTY":
      return state.map((i) => i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i);
    case "CLEAR":
      return [];
    default:
      return state;
  }
};

export function AppProvider({ children }) {
  const [user, setUser] = useState({ name: "Abebu Tadesse", role: "buyer", avatar: "AT" });
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [wishlist, setWishlist] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Your order #1042 has shipped!", time: "2m ago", read: false },
    { id: 2, text: "New message from Selam Store", time: "15m ago", read: false },
    { id: 3, text: "Flash sale: 40% off electronics", time: "1h ago", read: true },
  ]);

  const toggleWishlist = (item) => {
    setWishlist((prev) =>
      prev.find((i) => i.id === item.id) ? prev.filter((i) => i.id !== item.id) : [...prev, item]
    );
  };

  const markAllRead = () => setNotifications((n) => n.map((x) => ({ ...x, read: true })));

  return (
    <AppContext.Provider value={{
      user, setUser,
      cart, dispatch,
      wishlist, toggleWishlist,
      darkMode, setDarkMode,
      notifications, markAllRead,
      cartCount: cart.reduce((sum, i) => sum + i.qty, 0),
      wishlistCount: wishlist.length,
      unreadCount: notifications.filter((n) => !n.read).length,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
