
import { useState } from "react";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsCards from "../components/dashboard/StatsCards";
import WalletModal from "../components/dashboard/WalletModal";
import ManageTemplates from "../components/dashboard/ManageTemplates";
import MessageLogs from "../components/dashboard/MessageLogs";

import "../styles/WabaDashboard.css";

function WabaDashboard() {
  const [walletModalType, setWalletModalType] = useState(null);

  const openRechargeModal = () => {
    setWalletModalType("recharge");
  };

  const openWithdrawModal = () => {
    setWalletModalType("withdraw");
  };

  const closeWalletModal = () => {
    setWalletModalType(null);
  };

  return (
    <div className="waba-dashboard">
      <DashboardHeader />

      <main className="dashboard-content">
        <div className="dashboard-page-heading">
          <div>
            <span className="dashboard-eyebrow">
              WHATSAPP BUSINESS / OVERVIEW
            </span>

            <h1>Dashboard Overview</h1>

            <p>
              Monitor your WhatsApp messaging activity,
              wallet balance, and delivery performance.
            </p>
          </div>

          
        </div>

        {/* Wallet and Message Statistics */}
        <StatsCards
          onRecharge={openRechargeModal}
          onWithdraw={openWithdrawModal}
        />

        
        {/* WhatsApp Template Management */}
         <ManageTemplates />


       {/* WhatsApp Message Logs */}
      <MessageLogs />
      </main>

      {/* Recharge / Withdraw Popup */}
      {walletModalType && (
        <WalletModal
          type={walletModalType}
          onClose={closeWalletModal}
        />
      )}
    </div>
  );
}

export default WabaDashboard;
