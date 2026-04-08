import { Link } from "react-router-dom";
import vada from "./assets/vada.jpg";
import idly from "./assets/idly.jpg";
import dosa from "./assets/dosa.jpg";

function Home() {
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/auth";
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
          <li><button onClick={handleLogout} className="btn">Logout</button></li>
        </ul>
      </nav>

      <section className="hero">
        <h1>Delicious Food Delivered To You</h1>
        <p>Savor the finest flavors crafted with fresh ingredients and culinary passion</p>

        <Link to="/menu">
          <button className="btn btn-large">Explore Menu</button>
        </Link>
      </section>

      <section className="page-container">
        <section className="features">
          <h2>Why Choose Us</h2>

          <div className="feature-grid">
            <div className="feature-card">
              <h3>Fast Delivery</h3>
              <p>Get your food delivered hot and fresh within 30 minutes</p>
            </div>

            <div className="feature-card">
              <h3>Expert Chefs</h3>
              <p>Prepared by professional chefs with years of experience</p>
            </div>

            <div className="feature-card">
              <h3>Premium Quality</h3>
              <p>Only the finest ingredients and freshest products used</p>
            </div>
          </div>
        </section>
      </section>

      <section className="food-gallery">
        <h2>Featured Dishes</h2>
        
        <div className="food-gallery-grid">
          <div className="food-item">
            <img src={vada} alt="vada" className="food-image" />
            <h3>Crispy vada</h3>
          </div>

          <div className="food-item">
            <img src={idly} alt="Idly" className="food-image" />
            <h3>Soft Idly</h3>
          </div>

          <div className="food-item">
            <img src={dosa} alt="Dosa" className="food-image" />
            <h3>Paneer Dosa</h3>
          </div>
        </div>

        <div className="page-container" style={{ textAlign: "center", marginTop: "60px" }}>
          <Link to="/menu">
            <button className="btn btn-large">View Full Menu</button>
          </Link>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 Dream Restaurant. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Home;