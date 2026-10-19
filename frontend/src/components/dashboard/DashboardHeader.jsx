
import "../../styles/DashboardHeader.css";
import whatsappLogo from "../../assets/whatsapp-logo.png";

function DashboardHeader({ wabaNumber }) {
  return (
    <header className="dashboard-header">
      <div className="dashboard-header-brand">
        <img
          src={whatsappLogo}
          alt="WhatsApp Logo"
          className="dashboard-whatsapp-logo"
        />

        <div>
          <h2>WABA Dashboard</h2>
          <span>WhatsApp Business Management</span>
        </div>
      </div>

      <div className="dashboard-header-right">
        <div className="dashboard-number-info">
          <span className="dashboard-number-label">
            Connected WABA Number
          </span>

          <strong>
            {wabaNumber || "Not verified"}
          </strong>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;

