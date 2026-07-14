import React from "react";

const ConsentModal = ({ open, onAccept, onCancel }) => {
  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          🔒 Authorization Required
        </div>

        <div style={styles.body}>
          <p>
            To retrieve your EPF information, we need your authorization to
            securely log in using the credentials you provide.
          </p>

          <div style={styles.notice}>
            <strong>Consent</strong>
            <p style={{ marginTop: 8 }}>
              I authorize this application to use my <b>UAN</b> and
              <b> Password</b> during this session to retrieve my EPF
              information.
            </p>

            <p>
              ✔ My credentials are used only for the current session.
            </p>

            <p>
              ✔ My credentials are <b>not stored</b> after the session ends.
            </p>

            <p>
              ✔ I understand that I can log out at any time.
            </p>
          </div>
        </div>

        <div style={styles.footer}>
          <button
            style={styles.cancelBtn}
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            style={styles.acceptBtn}
            onClick={onAccept}
          >
            I Agree & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  modal: {
    width: "480px",
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 10px 35px rgba(0,0,0,.2)",
  },

  header: {
    padding: "16px 20px",
    fontSize: "20px",
    fontWeight: 700,
    borderBottom: "1px solid #eee",
  },

  body: {
    padding: 20,
    color: "#444",
    lineHeight: 1.6,
  },

  notice: {
    marginTop: 15,
    background: "#F8FAFC",
    border: "1px solid #CBD5E1",
    borderRadius: 8,
    padding: 15,
  },

  footer: {
    padding: 16,
    display: "flex",
    justifyContent: "flex-end",
    gap: 12,
    borderTop: "1px solid #eee",
  },

  cancelBtn: {
    padding: "10px 18px",
    border: "1px solid #CBD5E1",
    background: "#f30808",
    borderRadius: 6,
    cursor: "pointer",
  },

  acceptBtn: {
    padding: "10px 18px",
    border: "none",
    background: "#2563EB",
    color: "#fff",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
  },
};

export default ConsentModal;