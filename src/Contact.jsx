import { Link } from "react-router-dom";

function Contact() {
  const Logout = () => {
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
          <li><button className="btn" onClick={Logout}>Logout</button></li>
        </ul>
      </nav>

      <section className="page-section">
        <div className="page-container">
          <h1>Contact Us</h1>

          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message"></textarea>

            <button className="btn">Send Message</button>
          </form>
         
        </div>
      </section>
       <footer className="footer">
        <p>© 2026 Dream Restaurant. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Contact;