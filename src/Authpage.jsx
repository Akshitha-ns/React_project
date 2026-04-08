import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Authpage() {
  const navigate = useNavigate();

  const [tab, setTab] = useState("login");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) navigate("/");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (tab === "login") {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (
          storedUser &&
          storedUser.email === form.email &&
          storedUser.password === form.password
        ) {
          localStorage.setItem("isLoggedIn", "true");
          alert("Login successful!");
          navigate("/");
        } else {
          alert("Invalid email or password");
        }
      } else {
        localStorage.setItem("user", JSON.stringify(form));
        alert("Account created successfully!");
        setTab("login");
      }

      setLoading(false);
    }, 800);
  };

  return (
    <div className="auth-page">
      <div className="page-container">
        <div className="auth-hero">
          <h1>Welcome to Dream Restaurant</h1>
          <p>Sign in or create an account to start ordering delicious meals.</p>
        </div>

        <div className="auth-card">

          
          <div className="auth-tabs">
            <button
              onClick={() => setTab("login")}
              className={tab === "login" ? "active" : "inactive"}
            >
              Login
            </button>

            <button
              onClick={() => setTab("register")}
              className={tab === "register" ? "active" : "inactive"}
            >
              Register
            </button>
          </div>

         
          <form onSubmit={handleSubmit} className="auth-form">

            {tab === "register" && (
              <input
                type="text"
                placeholder="Full Name"
                required
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            )}

            <input
              type="email"
              placeholder="Email Address"
              required
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <button type="submit" disabled={loading} className="auth-btn">
              {loading
                ? "Processing..."
                : tab === "login"
                ? "Login"
                : "Create Account"}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}