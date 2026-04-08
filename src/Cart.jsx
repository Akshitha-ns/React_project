import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/auth";
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!isLoggedIn) {
      navigate("/auth");
    } else {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updated));
    setCart(updated);
  };

  const updateQty = (id, change) => {
    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, qty: Math.max(1, item.qty + change) }
        : item
    );

    localStorage.setItem("cart", JSON.stringify(updated));
    setCart(updated);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (!user) return null;

  return (
    <>
      <nav className="navbar">
        <h2>Dream Restaurant</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/bill">Bill</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><button onClick={handleLogout} className="btn">Logout</button></li>
        </ul>
      </nav>
      
      <section className="page-section">
        <div className="page-container">
          <div className="page-header">
            <h2 className="section-title">Your Cart</h2>
          </div>

          {cart.length === 0 ? (
            <p className="empty-text">Your cart is empty</p>
          ) : (
            <>
              <div className="cart-list">
                {cart.map((item) => (
                  <div key={item.id} className="card cart-item">
                    <div>
                      <h4>{item.name}</h4>
                      <p>₹{item.price} × {item.qty}</p>
                    </div>

                    <div className="cart-actions">
                      <button onClick={() => updateQty(item.id, -1)} className="btn">
                        -
                      </button>

                      <span>{item.qty}</span>

                      <button onClick={() => updateQty(item.id, 1)} className="btn">
                        +
                      </button>

                      <button onClick={() => removeItem(item.id)} className="btn btn-outline">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-total">
                <h2>Total: ₹{total}</h2>

                <Link to="/bill">
                  <button className="btn btn-large">
                    Proceed to Bill
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
       <footer className="footer">
        <p>© 2026 Dream Restaurant. All rights reserved.</p>
      </footer>
    </>
  );
}