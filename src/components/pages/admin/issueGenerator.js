export const generateMemberIssues = (data) => {
    const issues = [];

    if (!data) return issues;

    const transactions = data.transactions || [];
    const kycDetails = data.kyc_details || [];
    const serviceHistory = data.service_history_details || [];

    // ==========================
    // KYC Issues
    // ==========================

    const unverifiedKyc = kycDetails.filter(
        kyc => kyc.status?.toLowerCase() !== "approved"
    );

    if (unverifiedKyc.length > 0) {
        issues.push({
            type: "KYC",
            severity: "HIGH",
            message: `${unverifiedKyc.length} KYC issue(s) found`
        });

        unverifiedKyc.forEach(kyc => {
            issues.push({
                type: "KYC",
                severity: "HIGH",
                message: `${kyc.document_type} KYC is ${kyc.status}`
            });
        });
    }

    // ==========================
    // Name Mismatch
    // ==========================

    if (data.profile?.name) {

        const profileName = data.profile.name
            .replace(/\s+/g, " ")
            .trim()
            .toUpperCase();

        kycDetails.forEach(kyc => {

            const kycName = (kyc.name_as_per_document || "")
                .replace(/\s+/g, " ")
                .trim()
                .toUpperCase();

            if (kycName && kycName !== profileName) {

                issues.push({
                    type: "KYC",
                    severity: "MEDIUM",
                    message: `Name mismatch in ${kyc.document_type}`
                });

            }

        });

    }

    // ==========================
    // Date Of Exit Missing
    // ==========================

    const doeMissing = serviceHistory.filter(
        emp =>
            emp.service_status === "Open" &&
            emp.doe_epf === "-" &&
            emp.doe_eps === "-"
    );

    if (doeMissing.length > 1) {

        issues.push({
            type: "SERVICE_HISTORY",
            severity: "HIGH",
            message: `Date of Exit is missing for ${doeMissing.length} employers`
        });

    }

    // ==========================
    // More than one active employer
    // ==========================

    const activeEmployer = serviceHistory.filter(
        emp => emp.service_status === "Open"
    );

    if (activeEmployer.length > 1) {

        issues.push({
            type: "SERVICE_HISTORY",
            severity: "HIGH",
            message: `${activeEmployer.length} Active Employers found`
        });

    }

    // ==========================
    // DOJ Missing
    // ==========================

    serviceHistory.forEach(emp => {

        if (!emp.doj_epf || emp.doj_epf === "-") {

            issues.push({
                type: "SERVICE_HISTORY",
                severity: "HIGH",
                message: `DOJ EPF missing (${emp.member_id})`
            });

        }

        if (!emp.doj_eps || emp.doj_eps === "-") {

            issues.push({
                type: "SERVICE_HISTORY",
                severity: "HIGH",
                message: `DOJ EPS missing (${emp.member_id})`
            });

        }

    });

    // ==========================
    // Closed Service but DOE Missing
    // ==========================

    serviceHistory.forEach(emp => {

        if (
            emp.service_status === "Closed" &&
            (emp.doe_epf === "-" || !emp.doe_epf)
        ) {

            issues.push({
                type: "SERVICE_HISTORY",
                severity: "HIGH",
                message: `DOE EPF missing (${emp.member_id})`
            });

        }

        if (
            emp.service_status === "Closed" &&
            (emp.doe_eps === "-" || !emp.doe_eps)
        ) {

            issues.push({
                type: "SERVICE_HISTORY",
                severity: "HIGH",
                message: `DOE EPS missing (${emp.member_id})`
            });

        }

    });

    // ==========================
    // Open Service with DOE Present
    // ==========================

    serviceHistory.forEach(emp => {

        if (
            emp.service_status === "Open" &&
            emp.doe_epf !== "-" &&
            emp.doe_epf
        ) {

            issues.push({
                type: "SERVICE_HISTORY",
                severity: "MEDIUM",
                message: `Employer ${emp.member_id} is Open but DOE exists`
            });

        }

    });

    // ==========================
    // Duplicate Wage Month
    // ==========================

    const monthMap = {};

    transactions.forEach(txn => {

        monthMap[txn.wage_month] =
            (monthMap[txn.wage_month] || 0) + 1;

    });

    Object.entries(monthMap).forEach(([month, count]) => {

        if (count > 1) {

            issues.push({
                type: "EPF_RETURN",
                severity: "HIGH",
                message: `${month} has ${count} contribution records`
            });

        }

    });

    // ==========================
    // Pension Contribution Zero
    // ==========================

    transactions.forEach(txn => {

        const pension = Number(
            txn.pension_contribution.replace(/[₹,]/g, "")
        );

        if (pension === 0) {

            issues.push({
                type: "EPF_RETURN",
                severity: "MEDIUM",
                message: `Pension contribution is ₹0 for ${txn.wage_month}`
            });

        }

    });

    // ==========================
    // Employer PF Zero
    // ==========================

    transactions.forEach(txn => {

        const employer = Number(
            txn.employer_pf.replace(/[₹,]/g, "")
        );

        if (employer === 0) {

            issues.push({
                type: "EPF_RETURN",
                severity: "HIGH",
                message: `Employer PF contribution is ₹0 for ${txn.wage_month}`
            });

        }

    });

    // ==========================
    // No Transactions
    // ==========================

    if (transactions.length === 0) {

        issues.push({
            type: "EPF_RETURN",
            severity: "HIGH",
            message: "No EPF contribution found."
        });

    }

    // ==========================
    // PF Balance Check
    // ==========================

    serviceHistory.forEach(emp => {

        if (
            emp.service_status === "Closed" &&
            emp.pf_balance === "Yes Claim"
        ) {

            issues.push({
                type: "CLAIM",
                severity: "MEDIUM",
                message: `Closed account (${emp.member_id}) still has PF Balance`
            });

        }

    });

    // ==========================
    // Missing Reason of Leaving
    // ==========================

    serviceHistory.forEach(emp => {

        if (
            emp.service_status === "Closed" &&
            emp.reason_of_leaving.includes("EPF: -")
        ) {

            issues.push({
                type: "SERVICE_HISTORY",
                severity: "LOW",
                message: `Reason of Leaving missing (${emp.member_id})`
            });

        }

    });

    // ==========================
    // SUCCESS
    // ==========================

    if (issues.length === 0) {

        issues.push({
            type: "SUCCESS",
            severity: "SUCCESS",
            message: "No issues found."
        });

    }

    return issues;
};