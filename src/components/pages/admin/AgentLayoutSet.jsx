// src/components/pages/admin/EPFWidget.jsx
import React, { useEffect, useState } from 'react';

const SYS_MODES = {
  UAN_SETUP: 1,
  CREDENTIALS_SIGN_IN: 2,
  TWO_FACTOR_OTP: 3,
  DASHBOARD_COMPLETED: 4
};

export default function EPFMember() {
  const [uan, setUan] = useState("101218648503");
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  const [stepMode, setStepMode] = useState(SYS_MODES.UAN_SETUP);
  const [inExecution, setInExecution] = useState(false);
  const [errAlert, setErrAlert] = useState('');
  const [dataset, setDataset] = useState(null);


  
  const sampleresponse ={}

  useEffect(() => {
    const fetchData = async () => {
      triggerFinalOtpVerify({})

    };

    fetchData();

  }, []);



  const GATEWAY_URL = 'http://localhost:4001';

  const triggerInitSession = async (e) => {
    e.preventDefault();
    if (uan.toString().length !== 12) {
      setErrAlert('Please declare a valid length 12-digit numeric configuration value.');
      return;
    }
    setInExecution(true);
    setErrAlert('');

    try {
      const res = await fetch(`${GATEWAY_URL}/member/initiateMember`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uan })
      });
      // const parsingData = await res.json();
      const parsingData = sampleresponse;


      if (parsingData.status === 'SUCCESS') {
        // Standard user login credential flow
        setStepMode(SYS_MODES.CREDENTIALS_SIGN_IN);
      } else if (parsingData.status === 'REDIRECTED_TO_VERIFY') {
        // Portal bypassed password form completely and is demanding verification tokens immediately
        setStepMode(SYS_MODES.TWO_FACTOR_OTP);
      } else {
        setErrAlert(parsingData.message || 'The automation daemon target execution context timed out.');
      }
    } catch (err) {
      setErrAlert('Connection failure tracing endpoint parameters.');
    } finally {
      setInExecution(false);
    }
  };

  const triggerAuthValidation = async (e) => {
    e.preventDefault();
    setInExecution(true);
    setErrAlert('');

    try {
      // CAPTCHA param removed cleanly from JSON payload body properties
      const res = await fetch(`${GATEWAY_URL}/member/submit-auth-member`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uan, password })
      });
      // const parsingData = await res.json();
      const parsingData = sampleresponse;

      if (parsingData.status === 'SUCCESS') {
        setStepMode(SYS_MODES.TWO_FACTOR_OTP);
      } else {
        setErrAlert(parsingData.message || 'Credentials invalid error flagged by EPFO directory services.');
      }
    } catch (err) {
      setErrAlert('Network handshake fault transferring access arrays.');
    } finally {
      setInExecution(false);
    }
  };

  const triggerFinalOtpVerify = async (e) => {
    // e.preventDefault();
    setInExecution(true);
    setErrAlert('');

    try {
      // const res = await fetch(`${GATEWAY_URL}/member/verifyMember`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ uan, otp })
      // });
      // const parsingData = await res.json();
      const parsingData = sampleresponse;


      if (parsingData.status === 'SUCCESS') {
        setDataset(parsingData);
        setStepMode(SYS_MODES.DASHBOARD_COMPLETED);
      } else {
        setErrAlert(parsingData.message || 'Invalid or mismatched verification OTP code.');
      }
    } catch (err) {
      setErrAlert('Network connection failure mapping output fields matrix reports.');
    } finally {
      setInExecution(false);
    }
  };

  const triggerResetEngine = () => {
    setUan('');
    setPassword('');
    setOtp('');
    setDataset(null);
    setErrAlert('');
    setStepMode(SYS_MODES.UAN_SETUP);
  };

  return (
    <div>

      <div className="main-container" style={{ "marginTop": "50px", "fontSize": "15px", "color": "black" }}>
        <div className='main-title'>
          <h3>UAN Member Agent</h3>
        </div>
        <section className="section">
          <div style={uiStyles.container}>
            <div style={getCardStyle(stepMode)}>
              <div style={uiStyles.headerBox}>
                <h2 style={uiStyles.title}>EPF Unified Portal Monitor</h2>
                <p style={uiStyles.subtitle}>Unified Member Interface Management Integration Module</p>
              </div>

             
              {/* LAYOUT PHASE 4 */}
              {stepMode === SYS_MODES.DASHBOARD_COMPLETED && dataset && (
                <div style={uiStyles.resultsWrapper}>
                  <div style={uiStyles.profileSection}>
                    <h3 style={{ margin: '0 0 4px 0', color: '#111827' }}>Verified Member Profile: {dataset.profile.name}</h3>
                    <h3 style={{ margin: '0 0 4px 0', color: '#111827' }}>UAN: {dataset.profile.uan}</h3>
                    <h3 style={{ margin: '0 0 4px 0', color: '#111827' }}>Date Of Birth: {dataset.profile.birth_date}</h3>
                    <h3 style={{ margin: '0 0 4px 0', color: '#111827' }}>Gender: {dataset.profile.gender}</h3>
                    <p style={{ margin: 0, fontSize: '13px', color: '#4b5563' }}>{dataset.total_balance}</p>
                  </div>

                  <h4 style={uiStyles.tableTitle}>Linked Service Mappings History</h4>
                  <div style={uiStyles.tableResponsive}>
                    <table style={uiStyles.table}>
                      <thead>
                        <tr>
                          <th style={uiStyles.th}>Enterprise Establishment Business Corporate Title</th>
                          <th style={uiStyles.th}>Registration Date of Joining</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataset.employment_history && dataset.employment_history.map((record, idx) => (
                          <tr key={idx} style={idx % 2 === 0 ? {} : uiStyles.tableRowAlt}>
                            <td style={uiStyles.td}>{record.establishment_name}</td>
                            <td style={uiStyles.td}>{record.date_of_joining}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* <button onClick={triggerResetEngine} style={uiStyles.button}>Audit Next Member Identifier</button> */}
                </div>
              )}

              {/* LAYOUT PHASE 4 */}
              {stepMode === SYS_MODES.DASHBOARD_COMPLETED && dataset && (
                <div style={uiStyles.resultsWrapper}>
                  {/* <div style={uiStyles.profileSection}>
              <h3 style={{ margin: '0 0 4px 0', color: '#111827' }}>Verified Member Profile: {dataset.profile.name}</h3>
              <h3 style={{ margin: '0 0 4px 0', color: '#111827' }}>UAN: {dataset.profile.uan}</h3>
              <h3 style={{ margin: '0 0 4px 0', color: '#111827' }}>Date Of Birth: {dataset.profile.birth_date}</h3>
              <h3 style={{ margin: '0 0 4px 0', color: '#111827' }}>Gender: {dataset.profile.gender}</h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#4b5563' }}>{dataset.total_balance}</p>
            </div> */}

                  <h4 style={uiStyles.tableTitle}>KYC History</h4>
                  <div style={uiStyles.tableResponsive}>
                    <table style={uiStyles.table}>
                      <thead>
                        <tr>
                          <th style={uiStyles.th}>Document Type</th>
                          <th style={uiStyles.th}>Name As Per Document</th>
                          <th style={uiStyles.th}>Empoyer Name</th>
                          <th style={uiStyles.th}>Status</th>
                          <th style={uiStyles.th}>Remark</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataset.kyc_details && dataset.kyc_details.map((record, idx) => (
                          <tr key={idx} style={idx % 2 === 0 ? {} : uiStyles.tableRowAlt}>
                            <td style={uiStyles.td}>{record.document_type}</td>
                            <td style={uiStyles.td}>{record.name_as_per_document}</td>
                            <td style={uiStyles.td}>{record.employer_name}</td>
                            <td style={uiStyles.td}>{record.status}</td>
                            <td style={uiStyles.td}>{record.remarks}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* <button onClick={triggerResetEngine} style={uiStyles.button}>Audit Next Member Identifier</button> */}
                </div>
              )}
              {/* LAYOUT PHASE 4 */}
              {stepMode === SYS_MODES.DASHBOARD_COMPLETED && dataset && (
                <div style={uiStyles.resultsWrapper}>
                  {/* <div style={uiStyles.profileSection}>
              <h3 style={{ margin: '0 0 4px 0', color: '#111827' }}>Verified Member Profile: {dataset.member_name}</h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#4b5563' }}>{dataset.total_balance}</p>
            </div> */}

                  <h4 style={uiStyles.tableTitle}>Passbook Transaction Ledger</h4>
                  <div style={uiStyles.tableResponsive}>
                    <table style={uiStyles.table}>
                      <thead>
                        <tr>
                          <th style={uiStyles.th}>Month</th>
                          <th style={uiStyles.th}>Employee PF</th>
                          <th style={uiStyles.th}>Employer PF</th>
                          <th style={uiStyles.th}>Pension Contribution</th>
                          <th style={uiStyles.th}>Member ID</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataset.transactions && dataset.transactions.map((record, idx) => (
                          <tr key={idx} style={idx % 2 === 0 ? {} : uiStyles.tableRowAlt}>
                            <td style={uiStyles.td}><strong>{record.wage_month}</strong></td>
                            <td style={{ ...uiStyles.td, color: '#10b981' }}>{record.employee_pf}</td>
                            <td style={{ ...uiStyles.td, color: '#2563eb' }}>{record.employer_pf}</td>
                            <td style={{ ...uiStyles.td, color: '#d97706' }}>{record.pension}</td>
                            <td style={{ ...uiStyles.td, fontSize: '12px', color: '#4b5563' }}>{record.member_id}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* <button onClick={triggerResetEngine} style={uiStyles.button}>Audit Next Member Identifier</button> */}
                </div>
              )}
            </div>
          </div>
        </section></div>
    </div>
  );
}

const getCardStyle = (stepMode) => ({
  width: '100%',
  // Layout 4 uses 100%, others use 540px
  maxWidth: stepMode === SYS_MODES.DASHBOARD_COMPLETED ? '100%' : '540px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  border: '1px solid #e5e7eb',
  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
  padding: '32px',
  boxSizing: 'border-box',
  margin: '0 auto' // Centers the card when max-width is constrained
});

const uiStyles = {
  container: { display: 'flex', justifyContent: 'center', padding: '32px 16px', fontFamily: 'system-ui, -apple-system, sans-serif' },
  card: { width: '100%', maxWidth: '540px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', padding: '32px', boxSizing: 'border-box' },
  headerBox: { borderBottom: '1px solid #e5e7eb', paddingBottom: '14px', marginBottom: '26px' },
  title: { fontSize: '20px', fontWeight: '800', color: '#1e3a8a', margin: '0 0 4px 0' },
  subtitle: { fontSize: '13px', color: '#6b7280', margin: 0 },
  form: { display: 'flex', flexDirection: 'column', gap: '22px' },
  label: { display: 'block', fontSize: '13px', fontWeight: '700', color: '#4b5563', marginBottom: '4px' },
  input: { padding: '11px 14px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '15px', width: '100%', boxSizing: 'border-box', outline: 'none' },
  button: { padding: '12px 24px', backgroundColor: '#1e3a8a', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', width: '100%' },
  buttonPrimary: { padding: '12px 24px', backgroundColor: '#10b981', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', width: '100%' },
  buttonSecondary: { padding: '10px 24px', backgroundColor: 'transparent', color: '#6b7280', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', width: '100%', marginTop: '2px' },
  errorAlert: { padding: '14px 16px', backgroundColor: '#fef2f2', borderLeft: '4px solid #ef4444', borderRadius: '4px', color: '#991b1b', fontSize: '13px', marginBottom: '18px', lineHeight: '1.4' },
  infoAlert: { padding: '14px 16px', backgroundColor: '#f0fdf4', borderRadius: '6px', color: '#166534', fontSize: '13px', lineHeight: '1.5', border: '1px solid #bbf7d0' },
  resultsWrapper: { display: 'flex', flexDirection: 'column', gap: '22px' },
  profileSection: { backgroundColor: '#eff6ff', padding: '16px', borderRadius: '8px', border: '1px solid #bfdbfe' },
  tableTitle: { fontSize: '14px', fontWeight: '700', color: '#374151', margin: '20px 0' },
  tableResponsive: { overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' },
  th: { backgroundColor: '#f9fafb', padding: '12px 14px', color: '#4b5563', fontWeight: '600', borderBottom: '1px solid #e5e7eb' },
  td: { padding: '12px 14px', borderBottom: '1px solid #e5e7eb', color: '#111827' },
  tableRowAlt: { backgroundColor: '#f9fafb' }
};