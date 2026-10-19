import "../../styles/ManageTemplates.css";
function ManageTemplates({ onManageTemplates }) {
  return (
    <section className="manage-templates-section">
      <div className="manage-templates-content">
        <div className="manage-templates-icon">
          <span>▤</span>
        </div>

        <div className="manage-templates-info">
          <h2>Manage WhatsApp Templates</h2>

          <p>
            View your approved WhatsApp templates,
            manage messaging services, and control
            which templates are enabled.
          </p>
        </div>
      </div>

      <button
        type="button"
        className="manage-templates-btn"
        onClick={onManageTemplates}
        disabled={!onManageTemplates}
      >
        Manage Templates
        <span aria-hidden="true">→</span>
      </button>
    </section>
  );
}

export default ManageTemplates;
