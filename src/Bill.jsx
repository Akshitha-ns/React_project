import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Bill() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setItems(cartData);
  }, []);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const printBill = () => {
    window.print();
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/auth");
  };

  return (
    <>
      
      <nav className="navbar">
        <h2>Dream Restaurant</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/bill">Bill</Link></li> {/* ✅ fixed */}
          <li><Link to="/contact">Contact</Link></li>
          <li>
            <button onClick={handleLogout} className="btn">
              Logout
            </button>
          </li>
        </ul>
      </nav>

      
      <section className="page-section">
        <div className="page-container">
          <h1>Bill Summary</h1>

          {items.length === 0 ? (
            <p className="empty-text">Your cart is empty</p>
          ) : (
            <>
              <div className="bill-list">
                {items.map((item, index) => (
                  <div key={index} className="bill-item">
                    <span>{item.name}</span>
                    <span>₹{item.price} × {item.qty}</span>
                  </div>
                ))}
              </div>

              <h2>Total: ₹{total}</h2>

              <button className="btn btn-large" onClick={printBill}>
                Print Bill
              </button>
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

export default Bill;