
import { useState } from "react";
import "../styles/WabaConnect.css";

function WabaConnect() {
  const [wabaNumber, setWabaNumber] = useState("");

  const handleConnect = (e) => {
    e.preventDefault();

    // TODO: Connect Celitix verification API here
    // after creating our backend.

    alert("WABA verification API is not connected yet.");
  };

  return (
    <div className="waba-connect-page">
      <div className="waba-connect-card">
        <div className="waba-brand">
          <span className="waba-brand-icon">T</span>
          <span>Tradebox</span>
        </div>

        <div className="waba-connect-heading">
          <h1>Connect WhatsApp Business</h1>
          <p>
            Enter your registered WhatsApp Business number
            to access your WABA dashboard.
          </p>
        </div>

        <form onSubmit={handleConnect}>
          <label htmlFor="wabaNumber">
            WhatsApp Business Number
          </label>

          <div className="waba-input-group">
            <span className="country-code">+91</span>

            <input
              id="wabaNumber"
              type="tel"
              placeholder="Enter 10-digit number"
              value={wabaNumber}
              onChange={(e) =>
                setWabaNumber(
                  e.target.value.replace(/\D/g, "").slice(0, 10)
                )
              }
              required
              pattern="[0-9]{10}"
              maxLength={10}
            />
          </div>

          <button type="submit" className="waba-connect-btn">
            Verify & Continue
          </button>
        </form>

        <p className="waba-connect-note">
          Only WhatsApp Business numbers authorized
          for your Tradebox account can be connected.
        </p>
      </div>
    </div>
  );
}

export default WabaConnect;
