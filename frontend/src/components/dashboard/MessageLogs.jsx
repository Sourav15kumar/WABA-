
import { useMemo, useState } from "react";
import "../../styles/MessageLogs.css";
import ExcelJS from "exceljs";

function MessageLogs({ logs, loading = false }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const messageLogs = Array.isArray(logs) ? logs : [];

  // Filter messages by search, status and dates
  const filteredLogs = useMemo(() => {
    return messageLogs.filter((log) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        String(log.recipientNumber ?? "")
          .toLowerCase()
          .includes(query) ||
        String(log.templateName ?? "")
          .toLowerCase()
          .includes(query) ||
        String(log.customerName ?? "")
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        status === "all" ||
        String(log.status ?? "").toLowerCase() === status;

      const logDate = log.createdAt
        ? new Date(log.createdAt)
        : null;

      const validDate =
        logDate && !Number.isNaN(logDate.getTime());

      const dateKey = validDate
        ? [
            logDate.getFullYear(),
            String(logDate.getMonth() + 1).padStart(2, "0"),
            String(logDate.getDate()).padStart(2, "0"),
          ].join("-")
        : "";

      const matchesFrom =
        !fromDate || (validDate && dateKey >= fromDate);

      const matchesTo =
        !toDate || (validDate && dateKey <= toDate);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesFrom &&
        matchesTo
      );
    });
  }, [messageLogs, search, status, fromDate, toDate]);

  // Format message date
  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // Format message cost
  const formatCost = (cost) => {
    if (typeof cost !== "number") return "—";

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(cost);
  };

  // Reset all filters
  const clearFilters = () => {
    setSearch("");
    setStatus("all");
    setFromDate("");
    setToDate("");
  };

  const hasActiveFilters =
    search !== "" ||
    status !== "all" ||
    fromDate !== "" ||
    toDate !== "";


    
const handleDownloadExcel = async () => {
  if (loading || filteredLogs.length === 0) {
    return;
  }

  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Message Logs");

    worksheet.columns = [
      { header: "Date & Time", key: "date", width: 25 },
      { header: "Customer Name", key: "customer", width: 25 },
      { header: "Recipient Number", key: "recipient", width: 22 },
      { header: "Template Name", key: "template", width: 32 },
      { header: "Message Cost (INR)", key: "cost", width: 22 },
      { header: "Status", key: "status", width: 18 },
    ];

    filteredLogs.forEach((log) => {
      worksheet.addRow({
        date: formatDate(log.createdAt),
        customer: log.customerName || "",
        recipient: String(log.recipientNumber ?? ""),
        template: log.templateName || "",
        cost: typeof log.cost === "number" ? log.cost : null,
        status: log.status || "Unknown",
      });
    });

    // Style header row
    const headerRow = worksheet.getRow(1);

    headerRow.font = {
      bold: true,
      color: { argb: "FFFFFFFF" },
    };

    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF2563EB" },
    };

    headerRow.alignment = {
      vertical: "middle",
    };

    headerRow.height = 25;

    // Apply filters inside Excel
    worksheet.autoFilter = {
      from: "A1",
      to: `F${filteredLogs.length + 1}`,
    };

    // Keep column headings visible while scrolling
    worksheet.views = [
      {
        state: "frozen",
        ySplit: 1,
      },
    ];

    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `Tradebox_WABA_Message_Logs_${new Date()
      .toISOString()
      .slice(0, 10)}.xlsx`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Excel export failed:", error);
    alert("Unable to download message logs. Please try again.");
  }
};


  return (
    <section className="message-logs-section">

      {/* Message Logs Header */}
      <div className="message-logs-header">
        <div>
          <h2>Message Logs</h2>
          <p>
            Track WhatsApp messages, delivery status,
            and messaging costs.
          </p>
        </div>
      </div>

      {/* All Filters and Excel Button in One Row */}
      <div className="message-logs-filters">

        {/* Search */}
        <input
          type="search"
          className="message-search-input"
          placeholder="Search name, number or template..."
          aria-label="Search message logs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* From Date */}
        <div className="message-date-field">
          <label htmlFor="logs-from-date">
            From Date
          </label>

          <input
            id="logs-from-date"
            type="date"
            value={fromDate}
            max={toDate || undefined}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        {/* To Date */}
        <div className="message-date-field">
          <label htmlFor="logs-to-date">
            To Date
          </label>

          <input
            id="logs-to-date"
            type="date"
            value={toDate}
            min={fromDate || undefined}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        {/* Status */}
        <select
          className="message-status-filter"
          aria-label="Filter by message status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="sent">Sent</option>
          <option value="delivered">Delivered</option>
          <option value="read">Read</option>
          <option value="failed">Failed</option>
        </select>

        {/* Download Excel */}
      <button
       type="button"
       className="message-logs-export-btn"
        onClick={handleDownloadExcel}
        disabled={loading || filteredLogs.length === 0}
       title={
        filteredLogs.length === 0
        ? "No message logs available to export"
        : "Download filtered message logs"
  }
>
  Download Excel
</button>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="message-logs-clear-wrapper">
          <button
            type="button"
            className="message-logs-clear-btn"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Message Logs Table */}
      <div className="message-logs-table-wrapper">
        <table className="message-logs-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Customer / Recipient</th>
              <th>Template Name</th>
              <th>Message Cost</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="5"
                  className="message-logs-empty"
                >
                  Loading message logs...
                </td>
              </tr>
            ) : filteredLogs.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="message-logs-empty"
                >
                  {messageLogs.length === 0
                    ? "No message logs available yet."
                    : "No messages match your filters."}
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td>
                    {formatDate(log.createdAt)}
                  </td>

                  <td>
                    <div className="message-recipient">
                      <strong>
                        {log.customerName || "—"}
                      </strong>

                      <span>
                        {log.recipientNumber || "—"}
                      </span>
                    </div>
                  </td>

                  <td>
                    {log.templateName || "—"}
                  </td>

                  <td>
                    {formatCost(log.cost)}
                  </td>

                  <td>
                    <span
                      className={`message-status status-${String(
                        log.status || "unknown"
                      ).toLowerCase()}`}
                    >
                      {log.status || "Unknown"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="message-logs-footer">
        Showing {loading ? 0 : filteredLogs.length} of{" "}
        {messageLogs.length} messages
      </div>

    </section>
  );
}

export default MessageLogs;
