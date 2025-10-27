import React from "react";

const COLORS = {
  NAVBAR_BG: "#6A7D9B",
  ACCENT_DARK: "#4F0509",
  ACCENT_BUTTON: "#2c4166", // button color
  PAGE_BG: "#FFFFFF",        // page background white
  CARD_BORDER: "#4F0509",   
  CARD_BG:   "#FFFFFF",     
  LOGO_TEXT: "#610c1e",
  TEXT: "#415982",
  BORDER: "#CCCCCC",
};

const Dashboard: React.FC = () => {
  return (
    <div
      style={{
        border: `2px solid ${COLORS.BORDER}`,  // outer border for dashboard
        borderRadius: "15px",
        margin: "20px",          // space from browser edges
        padding: "20px",         // space between border and content
        backgroundColor: COLORS.PAGE_BG,
        minHeight: "calc(100vh - 40px)",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* --- Navbar --- */}
      <header
        style={{
          backgroundColor: COLORS.NAVBAR_BG,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 30px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          borderRadius: "10px",
        }}
      >
        {/* Left: Logo + Menu */}
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <img
            src="Invenza.png"
            alt="Invenza Logo"
            style={{ height: "45px", borderRadius: "8px", objectFit: "contain" }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "https://placehold.co/100x40/FFFFFF/610c1e?text=INVENZA";
            }}
          />

          {/* Menu List */}
          <nav>
            <ul
              style={{
                display: "flex",
                listStyle: "none",
                gap: "25px",
                margin: 0,
                padding: 0,
              }}
            >
              {["Dashboard", "Products", "Customers", "Reports", "Settings"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontWeight: 600,
                      fontSize: "15px",
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Right: Search + Logout */}
        <div style={{ display: "flex", alignItems: "center", gap: "25px", marginLeft: "50px" }}>
          <input
            type="text"
            placeholder="Search..."
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              border: `1px solid ${COLORS.BORDER}`,
              outline: "none",
              width: "180px",
              fontSize: "14px",
            }}
          />
          <button
            style={{
              backgroundColor: COLORS.ACCENT_BUTTON,
              color: "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Search
          </button>
          <a
            href="/"
            style={{
              backgroundColor: "#B01045", // red background as per your palette
              color: "white",
              padding: "8px 16px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Logout
          </a>
        </div>
      </header>

      {/* --- Main Content Card --- */}
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "40px",
        }}
      >
        <div
          style={{
            backgroundColor: COLORS.CARD_BG,
            border: `1px solid ${COLORS.BORDER}`,
            borderRadius: "20px",
            padding: "40px",
            minWidth: "400px",
            textAlign: "center",
            boxShadow: "0 0 10px rgba(0,0,0,0.15)",
          }}
        >
          <h1 style={{ fontSize: "28px", marginBottom: "10px", color: COLORS.TEXT }}>
            Welcome to the Invenza Dashboard!
          </h1>
          <p style={{ fontSize: "16px", opacity: 0.9, color: COLORS.TEXT }}>
            Manage your products, customers, and reports from here.
          </p>
          <button
            style={{
              marginTop: "20px",
              backgroundColor: COLORS.ACCENT_BUTTON,
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Add New Product
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
