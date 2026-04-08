import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import vadaImage from "./assets/vada.jpg";
import dosaImage from "./assets/dosa.jpg";
import idlyImage from "./assets/idly.jpg";
import friedRiceImage from "./assets/friedrice.jpg";
import vegNoodlesImage from "./assets/vegnoodles.jpg";
import chickenNoodlesImage from "./assets/chickennoodles.jpg";
import paneerButterMasalaImage from "./assets/pannerbuttermasala.jpg";
import naanImage from "./assets/Naan.jpg";
import briyaniImage from "./assets/briyani.jpg";
import parotaImage from "./assets/parota.jpg";

export default function Menu() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const foodItems = [
    {
      id: 1,
      name: "Vada",
      price: 25,
      image: vadaImage,
    },
    {
      id: 2,
      name: "Dosa",
      price: 75,
      image: dosaImage,
    },
    {
      id: 3,
      name: "Idly",
      price: 30,
      image: idlyImage,
    },
    {
      id: 4,
      name: "Fried Rice",
      price: 130,
      image: friedRiceImage,
    },
    {
      id: 5,
      name: "Veg Noodles",
      price: 150,
      image: vegNoodlesImage,
    },
    {
      id: 6,
      name: "Chicken Noodles",
      price: 180,
      image: chickenNoodlesImage,
    },
    {
      id: 7,
      name: "Paneer Butter Masala",
      price: 250,
      image: paneerButterMasalaImage,
    },
    {
      id: 8,
      name: "Naan",
      price: 40,
      image: naanImage,
    },
    {
      id: 9,
      name: "Briyani",
      price: 200,
      image: briyaniImage,
    },
    {
      id: 10,
      name: "Parota",
      price: 30,
      image: parotaImage,
    },
  ];

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const getQty = (id) => {
    const item = cart.find((i) => i.id === id);
    return item ? item.qty : 0;
  };

  const increaseQty = (item) => {
    let updated = [...cart];
    const existing = updated.find((i) => i.id === item.id);

    if (existing) {
      existing.qty += 1;
    } else {
      updated.push({ ...item, qty: 1 });
    }

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const decreaseQty = (id) => {
    let updated = cart.map((item) =>
      item.id === id ? { ...item, qty: item.qty - 1 } : item
    );

    updated = updated.filter((item) => item.qty > 0);

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
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
          <li><Link to="/bill">Bill</Link></li>
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
          <h2>Menu</h2>

          {foodItems.map((item) => {
            const qty = getQty(item.id);

            return (
              <div key={item.id} className="card menu-item">
              <img src={item.image} alt={item.name} className="menu-image" />

              <div className="menu-info">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </div>

                {qty === 0 ? (
                  <button onClick={() => increaseQty(item)} className="btn">
                    Add to Cart
                  </button>
                ) : (
                  <div className="menu-controls">
                    <button onClick={() => decreaseQty(item.id)} className="btn">
                      -
                    </button>

                    <span>{qty}</span>

                    <button onClick={() => increaseQty(item)} className="btn">
                      +
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
       <footer className="footer">
        <p>© 2026 Dream Restaurant. All rights reserved.</p>
      </footer>
    </>
  );
}