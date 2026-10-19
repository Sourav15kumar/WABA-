
import "../../styles/StatsCards.css";

function StatsCards({ stats, onRecharge, onWithdraw }) {
  const walletBalance = stats?.walletBalance;
  const totalMessages = stats?.totalMessages;
  const failedMessages = stats?.failedMessages;

  const formatCurrency = (amount) => {
    if (typeof amount !== "number") {
      return "—";
    }

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const formatCount = (count) => {
    return typeof count === "number"
      ? count.toLocaleString("en-IN")
      : "—";
  };

  return (
    <section className="dashboard-stats">

      {/* WABA Wallet Card */}
      <div className="stat-card wallet-stat">
        <div className="stat-card-top">
          <span className="stat-label">
            WABA Wallet Balance
          </span>
          <span className="stat-icon">₹</span>
        </div>

        <h2>{formatCurrency(walletBalance)}</h2>
        <p>Available messaging balance</p>

        <div className="wallet-actions">
          <button
            type="button"
            className="wallet-btn recharge-btn"
            onClick={onRecharge}
            disabled={!onRecharge}
          >
             Recharge
          </button>

          <button
            type="button"
            className="wallet-btn withdraw-btn"
            onClick={onWithdraw}
            disabled={!onWithdraw}
          >
            Withdraw
          </button>
        </div>
      </div>

      {/* Total Messages Card */}
      <div className="stat-card">
        <div className="stat-card-top">
          <span className="stat-label">
            Total Messages
          </span>
          <span className="stat-icon">↗</span>
        </div>

        <h2>{formatCount(totalMessages)}</h2>
        <p>Total outgoing messages</p>
      </div>

      {/* Failed Messages Card */}
      <div className="stat-card">
        <div className="stat-card-top">
          <span className="stat-label">
            Failed Messages
          </span>
          <span className="stat-icon">!</span>
        </div>

        <h2>{formatCount(failedMessages)}</h2>
        <p>Messages that failed delivery</p>
      </div>

    </section>
  );
}

export default StatsCards;
