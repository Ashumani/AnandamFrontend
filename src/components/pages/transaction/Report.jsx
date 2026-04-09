import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import { useState, useEffect } from "react"
import { getErId, getEstId } from "../Auth/authToken";
import { getEsicReturnByMonth } from "../../api/services";


const Report = ({ onClose }) => {
    const reportRef = useRef();
    const [reportData, setReportData] = useState([])
    const [reportTotal, setReportTotal] = useState({})
  
    // const data = [
    //     { sno: 1, ip: "5136130755", name: "MD MIRAZ KORESI", days: 27, wages: 19620, cont: 148, reason: "" },
    //     { sno: 2, ip: "5136564351", name: "ARISETTI JAYA PRAKASH", days: 31, wages: 21000, cont: 158, reason: "" },
    //     { sno: 3, ip: "5136578311", name: "STEVEWAUGH DANIEL Y", days: 0, wages: 0, cont: 0, reason: "Left Service" }
    // ];


    useEffect(() => {
        
        const fetchData = async () => {
         
            await showEsicReport(10,2024)
        };

        fetchData();

    }, []);

   

    const showEsicReport = async (month, year) => {
        // api call
        try {
     
            const params = {
                "est_id": getErId(),
                "month": month,
                "year": year
            }

            const data = await getEsicReturnByMonth(params);
            setReportData(data.data)
            setReportTotal(data.total)

        } catch (error) {
            console.error('Login error ', error);
            // setError(error);
        }
    };

    const downloadPDF = () => {
        html2pdf().from(reportRef.current).save("ESIC_Report.pdf");
        if (onClose) onClose();
    };

    return (
        <div>
            <button className="btn btn-primary" onClick={downloadPDF}>Download PDF</button>
            <button className="btn btn-danger ml-2" onClick={onClose}>Close</button>

            <div ref={reportRef} style={{ padding: "20px", background: "#fff" }}>

                {/* HEADER */}
                <h3 style={{ textAlign: "center" }}>
                    Employees' State Insurance Corporation
                </h3>
                <p style={{ textAlign: "center" }}>
                    Contribution History Of 51000751460001001 for Dec2025
                </p>

                {/* SUMMARY TABLE */}
                <table border="1" width="100%" style={{ marginBottom: "20px", textAlign: "center" }}>
                    <thead>
                        <tr>
                            <th>Total IP Contribution</th>
                            <th>Total Employer Contribution</th>
                            <th>Total Contribution</th>
                            <th>Total Government Contribution</th>
                            <th>Total Monthly Wages</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{reportTotal.totalEEShare}</td>
                            <td>{reportTotal.totalERShare}</td>
                             <td>{reportTotal.totalEEShare + reportTotal.totalERShare}</td>
                            <td>{reportTotal.totalEEShare}</td>
                            <td>{reportTotal.totalgross}</td>
                        </tr>
                    </tbody>
                </table>

                {/* MAIN TABLE */}
                <table border="1" width="100%" style={{ textAlign: "center" }}>
                    <thead>
                        <tr>
                            <th>SNo</th>
                            <th>IP Number</th>
                            <th>IP Name</th>
                            <th>No. Of Days</th>
                            <th>Total Wages</th>
                            <th>IP Contribution</th>
                            <th>Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportData.map((row) => (
                            <tr key={row.ee_esic_no}>
                             <td>{row.ee_esic_no}</td>
                                <td>{row.ee_esic_no}</td>
                                <td>{row.ee_name}</td>
                                <td>{row.dayspresent}</td>
                                <td>{row.gross_wages}</td>
                                <td>{row.ee_share}</td>
                                <td>{row.reason}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* FOOTER */}
                <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
                    <span>Page 1 of 11</span>
                    <span>Printed On: 1/12/2026</span>
                </div>

            </div>
        </div>
    );
};

export default Report;