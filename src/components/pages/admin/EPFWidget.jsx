// src/components/pages/admin/EPFWidget.jsx
import React, { useState } from 'react';

const EPF_STEPS = {
  UAN_INITIALIZATION: 1,
  CREDENTIALS_AUTH: 2,
  OTP_CONFIRMATION: 3,
  DASHBOARD_PREVIEW: 4
};

export default function EPFWidget() {
  const [uan, setUan] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [otp, setOtp] = useState('');

  const [currentStep, setCurrentStep] = useState(EPF_STEPS.UAN_INITIALIZATION);
  const [captchaImgUrl, setCaptchaImgUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [result, setResult] = useState(null);

  const BACKEND_URL = 'http://localhost:4001';

  // Step 1: Open session space and load Captcha Image Stream
  const handleStartSession = async (e) => {
    e.preventDefault();
    if (uan.length !== 12) {
      setErrorMessage('Please feed an active 12-digit structural UAN input.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch(`${BACKEND_URL}/member/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uan })
      });
      const data = await res.json();

      if (data.status === 'CAPTCHA_READY') {
        setCaptchaImgUrl(`${BACKEND_URL}${data.captchaUrl}?t=${new Date().getTime()}`);
        setCurrentStep(EPF_STEPS.CREDENTIALS_AUTH);
      } else {
        setErrorMessage(data.message || 'Error configuring backend automation targets.');
      }
    } catch (err) {
      setErrorMessage('Network error interacting with Express core service pipeline.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Push Captcha text strings along with password configurations
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch(`${BACKEND_URL}/member/submit-auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uan, password, captcha })
      });
      const data = await res.json();

      if (data.status === 'SUCCESS') {
        setCurrentStep(EPF_STEPS.OTP_CONFIRMATION);
      } else {
        setErrorMessage(data.message || 'Credential mismatch verification failed on EPFO server.');
      }
    } catch (err) {
      setErrorMessage('Network error executing validation routines.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Clear the 2FA layer using the text message parameters received
  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch(`${BACKEND_URL}/member/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uan, otp })
      });
      const data = await res.json();

      if (data.status === 'SUCCESS') {
        setResult(data);
        setCurrentStep(EPF_STEPS.DASHBOARD_PREVIEW);
      } else {
        setErrorMessage(data.message || 'Incorrect verification OTP context.');
      }
    } catch (err) {
      setErrorMessage('Network exception mapping profile transaction layers.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setUan('');
    setPassword('');
    setCaptcha('');
    setOtp('');
    setResult(null);
    setErrorMessage('');
    setCaptchaImgUrl('');
    setCurrentStep(EPF_STEPS.UAN_INITIALIZATION);
  };

  return (
    <div>

      <div className="main-container" style={{ "marginTop": "50px", "fontSize": "15px", "color": "black" }}>
        <div className='main-title'>
          <h3>UAN Passbook Agent</h3>
        </div>
        <section className="section">
          <div style={styles.container}>
            <div style={styles.card}>
              <div style={styles.headerBox}>
                <h2 style={styles.title}>EPF Unified Member Audit</h2>
                <p style={styles.subtitle}>Secure real-time data verification interface</p>
              </div>

              {errorMessage && (
                <div style={styles.errorAlert}>
                  <strong>Verification Warning:</strong> {errorMessage}
                </div>
              )}

              {/* VIEW 1: Session Initiation block */}
              {currentStep === EPF_STEPS.UAN_INITIALIZATION && (
                <form onSubmit={handleStartSession} style={styles.form}>
                  <div>
                    <label style={styles.label}>Universal Account Number (UAN)</label>
                    <input
                      type="text"
                      maxLength="12"
                      placeholder="Enter 12-digit account code"
                      value={uan}
                      onChange={(e) => setUan(e.target.value.replace(/\D/g, ''))}
                      style={styles.input}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <button type="submit" style={styles.button} disabled={isLoading}>
                    {isLoading ? 'Spawning Session Frame...' : 'Initialize Scraper Context'}
                  </button>
                </form>
              )}

              {/* VIEW 2: Password & Captcha Entry layout */}
              {currentStep === EPF_STEPS.CREDENTIALS_AUTH && (
                <form onSubmit={handleAuthSubmit} style={styles.form}>
                  <div>
                    <label style={styles.label}>EPF Portal Password Target</label>
                    <input
                      type="password"
                      placeholder="Enter unified access password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={styles.input}
                      disabled={isLoading}
                      required
                    />
                  </div>

                  <div style={styles.captchaContainer}>
                    <label style={styles.label}>EPFO Portal Security Check CAPTCHA</label>
                    {captchaImgUrl ? (
                      <div style={styles.imageBox}>
                        <img src={captchaImgUrl} alt="EPFO Live Code Verification" style={styles.captchaImg} />
                      </div>
                    ) : (
                      <p style={styles.loadingText}>Fetching captcha resource file links...</p>
                    )}
                    <input
                      type="text"
                      placeholder="Enter alphanumeric character array matches"
                      value={captcha}
                      onChange={(e) => setCaptcha(e.target.value.trim())}
                      style={styles.input}
                      disabled={isLoading}
                      required
                    />
                  </div>

                  <button type="submit" style={styles.buttonPrimary} disabled={isLoading}>
                    {isLoading ? 'Verifying parameters with endpoint gateways...' : 'Authenticate & Push OTP'}
                  </button>
                  <button type="button" onClick={handleReset} style={styles.buttonSecondary}>Go Back</button>
                </form>
              )}

              {/* VIEW 3: OTP Interface Input */}
              {currentStep === EPF_STEPS.OTP_CONFIRMATION && (
                <form onSubmit={handleOtpVerify} style={styles.form}>
                  <div style={styles.infoAlert}>
                    Security check passed. Forward validation code matching metrics mapped onto UAN: <strong>{uan}</strong>
                  </div>
                  <div>
                    <label style={styles.label}>Enter Member 6-Digit OTP</label>
                    <input
                      type="text"
                      maxLength="8"
                      placeholder="Enter security digits"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.trim())}
                      style={styles.input}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <button type="submit" style={styles.buttonPrimary} disabled={isLoading}>
                    {isLoading ? 'Streaming balance profiles...' : 'Verify Token & Finalize'}
                  </button>
                </form>
              )}

              {/* VIEW 4: Ledger Report Display */}
              {currentStep === EPF_STEPS.DASHBOARD_PREVIEW && result && (
                <div style={styles.resultsWrapper}>
                  <div style={styles.profileSection}>
                    <h3 style={{ margin: '0 0 8px 0', color: '#111827' }}>Account Audit: {result.member_name}</h3>
                    <div style={styles.balanceHighlight}>
                      <span style={styles.balanceLabel}>Current Live Balance Index</span>
                      <span style={styles.balanceValue}>₹ {result.total_balance}</span>
                    </div>
                  </div>

                  <h4 style={styles.tableTitle}>Detected Enterprise Assignments</h4>
                  <div style={styles.tableResponsive}>
                    <table style={styles.table}>
                      <thead>
                        <tr>
                          <th style={styles.th}>Corporate Enterprise Establishment Name</th>
                          <th style={styles.th}>Date of Joining</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.employment_history && result.employment_history.map((record, index) => (
                          <tr key={index} style={index % 2 === 0 ? {} : styles.tableRowAlt}>
                            <td style={styles.td}>{record.establishment_name}</td>
                            <td style={styles.td}>{record.date_of_joining}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <button onClick={handleReset} style={styles.button}>Audit Another Profile</button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>

  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', padding: '24px 16px', fontFamily: 'system-ui, -apple-system, sans-serif' },
  card: { width: '100%', maxWidth: '520px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', padding: '28px', boxSizing: 'border-box' },
  headerBox: { borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', marginBottom: '24px' },
  title: { fontSize: '22px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0' },
  subtitle: { fontSize: '14px', color: '#6b7280', margin: 0 },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  label: { display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' },
  input: { padding: '10px 14px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '15px', width: '100%', boxSizing: 'border-box', outline: 'none' },
  button: { padding: '12px 24px', backgroundColor: '#1f2937', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', width: '100%' },
  buttonPrimary: { padding: '12px 24px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', width: '100%' },
  buttonSecondary: { padding: '10px 24px', backgroundColor: 'transparent', color: '#4b5563', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', width: '100%', marginTop: '4px' },
  errorAlert: { padding: '12px 16px', backgroundColor: '#fef2f2', borderLeft: '4px solid #ef4444', borderRadius: '4px', color: '#991b1b', fontSize: '14px', marginBottom: '20px' },
  infoAlert: { padding: '12px 16px', backgroundColor: '#eff6ff', borderRadius: '6px', color: '#1e40af', fontSize: '14px', lineHeight: '1.5' },
  captchaContainer: { display: 'flex', flexDirection: 'column', gap: '8px' },
  imageBox: { backgroundColor: '#f3f4f6', padding: '8px', borderRadius: '6px', display: 'inline-block', textAlign: 'center', border: '1px dashed #d1d5db' },
  captchaImg: { height: '45px', objectFit: 'contain', display: 'block', margin: '0 auto' },
  loadingText: { fontSize: '12px', color: '#9ca3af', fontStyle: 'italic' },
  resultsWrapper: { display: 'flex', flexDirection: 'column', gap: '20px' },
  profileSection: { backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' },
  balanceHighlight: { display: 'flex', flexDirection: 'column', marginTop: '10px', padding: '12px', backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e5e7eb' },
  balanceLabel: { fontSize: '11px', textTransform: 'uppercase', color: '#6b7280', fontWeight: '700' },
  balanceValue: { fontSize: '26px', fontWeight: '800', color: '#16a34a', marginTop: '2px' },
  tableTitle: { fontSize: '15px', fontWeight: '700', color: '#374151' },
  tableResponsive: { overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' },
  th: { backgroundColor: '#f9fafb', padding: '10px 14px', color: '#4b5563', borderBottom: '1px solid #e5e7eb' },
  td: { padding: '12px 14px', borderBottom: '1px solid #e5e7eb', color: '#111827' },
  tableRowAlt: { backgroundColor: '#f9fafb' }
};