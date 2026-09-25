/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useRef, useState } from "react";
import moment from "moment-timezone";
import Swal from "sweetalert2";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  register,
  getAll,
  getById,
  getUserHistory,
  historyMonthWise,
} from "../../api/services";


const Blogs = () => {

  // =========================================================
  // PAGINATION
  // =========================================================

  const itemsPerPage = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);


  // =========================================================
  // MODAL
  // =========================================================

  const modalRef = useRef(null);


  // =========================================================
  // USER FORM
  // =========================================================

  const [name, set_name] = useState("");
  const [mobilenumber, set_mobilenumber] = useState("");
  const [email_id, set_email_id] = useState("");
  const [panNo, set_panNo] = useState("");
  const [gstNo, set_gstNo] = useState("");
  const [country, set_country] = useState("");
  const [username, set_username] = useState("");
  const [password, set_password] = useState("");
  const [role, set_role] = useState("");
  const [state_id, set_state_id] = useState("");


  // =========================================================
  // DATA
  // =========================================================

  const [user_data, set_user_data] = useState([]);
  const [user_data_month_wise, set_user_data_month_wise] =
    useState([]);


  // =========================================================
  // UI
  // =========================================================

  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedUser, setSelectedUser] = useState("all");


  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {

    const fetchData = async () => {

      await getAllUser(1);
      await getHistory();
      await getHistoryMonthWise();

      setLoading(false);
    };

    fetchData();

  }, []);


  // =========================================================
  // GET ALL USERS
  // =========================================================

  const getAllUser = async (page = 1) => {

    try {

      const response = await getAll(page);

      if (response.status === true) {

        setTotalPages(
          Math.ceil(response.count / itemsPerPage)
        );

        setCurrentItems(response.data || []);
      }

    } catch (error) {

      console.error("Error fetching users:", error);

      setError(
        "Error fetching users. Please try again."
      );

      setLoading(false);
    }
  };


  // =========================================================
  // GET USER BY ID
  // =========================================================

  const getUserById = async (id) => {

    try {

      const response = await getById(id);

      if (response.status === true) {

        setTotalPages(
          Math.ceil(response.count / itemsPerPage)
        );

        setCurrentItems(response.data || []);
      }

    } catch (error) {

      console.error("Error fetching user:", error);

      setError(
        "Error fetching user. Please try again."
      );

      setLoading(false);
    }
  };


  // =========================================================
  // CURRENT MONTH HISTORY
  // =========================================================

  const getHistory = async () => {

    try {

      const response = await getUserHistory();

      if (response.status === true) {

        set_user_data(response.data || []);
      }

    } catch (error) {

      console.error(
        "Error fetching history:",
        error
      );

      setError(
        "Error fetching history. Please try again."
      );

      setLoading(false);
    }
  };


  // =========================================================
  // MONTH-WISE HISTORY
  // =========================================================

  const getHistoryMonthWise = async () => {

    try {

      const response = await historyMonthWise();

      if (response.status === true) {

        set_user_data_month_wise(
          response.data || []
        );
      }

    } catch (error) {

      console.error(
        "Error fetching month-wise history:",
        error
      );

      setError(
        "Error fetching month-wise history. Please try again."
      );

      setLoading(false);
    }
  };


  // =========================================================
  // ADD USER
  // =========================================================

  const addUser = async () => {

    try {

      const params = {
        name: name,
        mobilenumber: mobilenumber,
        email_id: email_id,
        panNo: panNo,
        gstNo: "1234567",
        country: "India",
        username: username,
        password: password,
        role: 1,
        state_id: "21",
        city_id: "22",
        punch_status: false,
      };


      const response = await register(params);


      if (response.status === true) {

        Swal.fire({
          title: response.message,
          icon: "success",
          confirmButtonText: "Okay",
        });

        closeModal();

        await getAllUser(1);

      } else {

        Swal.fire({
          title: response.message,
          icon: "error",
          confirmButtonText: "Okay",
        });
      }

    } catch (error) {

      console.error(
        "Error adding user:",
        error
      );

      setError(
        "Error adding user. Please try again."
      );
    }
  };


  // =========================================================
  // PAGINATION
  // =========================================================

  const handlePageChange = (pageNumber) => {

    setCurrentPage(pageNumber);

    getAllUser(pageNumber);
  };


  // =========================================================
  // MODAL
  // =========================================================

  const closeModal = () => {

    const modal =
      document.getElementById("employerModel");

    if (!modal) return;

    const bootstrapModal =
      window.bootstrap?.Modal?.getInstance(modal);

    if (bootstrapModal) {

      bootstrapModal.hide();
    }
  };


  const openModal = () => {

    const modal =
      document.getElementById("employerModel");

    if (!modal) return;

    const bootstrapModal =
      new window.bootstrap.Modal(modal);

    bootstrapModal.show();
  };


  // =========================================================
  // UNIQUE USERS FOR MONTH-WISE FILTER
  // =========================================================

  const historyUsers = [
    ...new Map(
      user_data_month_wise
        .filter(item => item.user_id)
        .map(item => [
          String(item.user_id),
          {
            user_id: item.user_id,
            user_name: item.user_name,
          },
        ])
    ).values(),
  ];


  // =========================================================
  // MONTH-WISE CHART DATA
  // =========================================================

  const getMonthWiseChartData = () => {

    // -------------------------------------------------------
    // SELECTED USER
    // -------------------------------------------------------

    if (selectedUser !== "all") {

      return user_data_month_wise

        .filter(
          item =>
            String(item.user_id) ===
            String(selectedUser)
        )

        .map(item => ({
          ...item,

          monthLabel: item.month,

          monthly_count:
            Number(item.monthly_count) || 0,

          esic_count:
            Number(item.esic_count) || 0,

          bill_count:
            Number(item.bill_count) || 0,

          total_count:
            Number(item.total_count) || 0,
        }))

        .sort(
          (a, b) =>
            new Date(a.month_date) -
            new Date(b.month_date)
        );
    }


    // -------------------------------------------------------
    // ALL USERS
    // -------------------------------------------------------

    const monthMap = {};


    user_data_month_wise.forEach(item => {

      const key = item.month;


      if (!monthMap[key]) {

        monthMap[key] = {

          monthLabel: item.month,

          month_date:
            item.month_date,

          monthly_count: 0,

          esic_count: 0,

          bill_count: 0,

          total_count: 0,
        };
      }


      monthMap[key].monthly_count +=
        Number(item.monthly_count) || 0;


      monthMap[key].esic_count +=
        Number(item.esic_count) || 0;


      monthMap[key].bill_count +=
        Number(item.bill_count) || 0;


      monthMap[key].total_count +=
        Number(item.total_count) || 0;

    });


    return Object.values(monthMap).sort(
      (a, b) =>
        new Date(a.month_date) -
        new Date(b.month_date)
    );
  };


  const monthWiseChartData =
    getMonthWiseChartData();


  // =========================================================
  // TOTALS
  // =========================================================

  const totalMonthly =
    monthWiseChartData.reduce(
      (sum, item) =>
        sum +
        Number(item.monthly_count || 0),
      0
    );


  const totalEsic =
    monthWiseChartData.reduce(
      (sum, item) =>
        sum +
        Number(item.esic_count || 0),
      0
    );


  const totalBills =
    monthWiseChartData.reduce(
      (sum, item) =>
        sum +
        Number(item.bill_count || 0),
      0
    );


  const totalActivity =
    totalMonthly +
    totalEsic +
    totalBills;


  // =========================================================
  // RETURN
  // =========================================================

  return (

    <div>

      <div
        className="main-container"
        style={{
          marginTop: "50px",
          fontSize: "15px",
          color: "black",
        }}
      >


        {/* ===================================================
            PAGE TITLE
        =================================================== */}

        <div className="main-title">

          <h3>
            Users
          </h3>

        </div>


        <section className="section">

          <br />


          {/* =================================================
              ADD USER BUTTON
          ================================================= */}

          <div className="row mb-3">

            <div className="col-sm-2">

              <button
                type="button"
                className="btn btn-outline-primary btn-block rounded-4"
                onClick={openModal}
              >
                Add User
              </button>

            </div>

          </div>


          {/* =================================================
              CURRENT MONTH CHART
          ================================================= */}

          <div
            style={{
              width: "100%",
              background: "#fff",
              borderRadius: "16px",
              padding: "24px",
              boxShadow:
                "0 3px 15px rgba(0,0,0,0.08)",
            }}
          >

            <div
              style={{
                marginBottom: "15px",
              }}
            >

              <h5
                style={{
                  margin: 0,
                  fontWeight: "600",
                  color: "#333",
                }}
              >
                Current Month User Activity
              </h5>

              <small
                style={{
                  color: "#888",
                }}
              >
                Monthly, ESIC and Bill activity
              </small>

            </div>


            <ResponsiveContainer
              width="100%"
              height={350}
            >

              {user_data &&
              user_data.length > 0 ? (

                <BarChart
                  data={user_data}
                  margin={{
                    top: 25,
                    right: 20,
                    left: 10,
                    bottom: 50,
                  }}
                  barGap={5}
                  barCategoryGap="25%"
                >

                  <defs>

                    <linearGradient
                      id="monthlyGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >

                      <stop
                        offset="0%"
                        stopColor="#4facfe"
                      />

                      <stop
                        offset="100%"
                        stopColor="#00c6ff"
                      />

                    </linearGradient>


                    <linearGradient
                      id="esicGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >

                      <stop
                        offset="0%"
                        stopColor="#f6d365"
                      />

                      <stop
                        offset="100%"
                        stopColor="#fda085"
                      />

                    </linearGradient>


                    <linearGradient
                      id="billGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >

                      <stop
                        offset="0%"
                        stopColor="#84fab0"
                      />

                      <stop
                        offset="100%"
                        stopColor="#3ccf91"
                      />

                    </linearGradient>

                  </defs>


                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e9ecef"
                  />


                  <XAxis
                    dataKey="user_name"
                    tick={{
                      fontSize: 12,
                      fill: "#666",
                    }}
                    axisLine={false}
                    tickLine={false}
                    interval={0}
                    angle={-25}
                    textAnchor="end"
                    height={70}
                  />


                  <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fill: "#777",
                    }}
                  />


                  <Tooltip
                    cursor={{
                      fill:
                        "rgba(0,0,0,0.04)",
                    }}
                    contentStyle={{
                      borderRadius: "10px",
                      border: "none",
                      boxShadow:
                        "0 4px 15px rgba(0,0,0,0.12)",
                    }}
                  />


                  <Legend
                    verticalAlign="top"
                    align="right"
                    height={40}
                    iconType="circle"
                    wrapperStyle={{
                      fontSize: "13px",
                    }}
                  />


                  <Bar
                    dataKey="monthly_count"
                    name="Monthly"
                    fill="url(#monthlyGradient)"
                    radius={[6, 6, 0, 0]}
                  >

                    <LabelList
                      dataKey="monthly_count"
                      position="top"
                    />

                  </Bar>


                  <Bar
                    dataKey="esic_count"
                    name="ESIC Challan"
                    fill="url(#esicGradient)"
                    radius={[6, 6, 0, 0]}
                  >

                    <LabelList
                      dataKey="esic_count"
                      position="top"
                    />

                  </Bar>


                  <Bar
                    dataKey="bill_count"
                    name="Bills"
                    fill="url(#billGradient)"
                    radius={[6, 6, 0, 0]}
                  >

                    <LabelList
                      dataKey="bill_count"
                      position="top"
                    />

                  </Bar>

                </BarChart>

              ) : (

                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#999",
                  }}
                >
                  No Data Available
                </div>

              )}

            </ResponsiveContainer>

          </div>


          {/* =================================================
              LAST 12 MONTHS
          ================================================= */}

          <div
            style={{
              width: "100%",
              background: "#fff",
              borderRadius: "16px",
              padding: "24px",
              marginTop: "25px",
              boxShadow:
                "0 3px 15px rgba(0,0,0,0.08)",
            }}
          >


            {/* HEADER */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "15px",
                marginBottom: "20px",
              }}
            >

              <div>

                <h5
                  style={{
                    margin: 0,
                    fontWeight: "600",
                    color: "#222",
                  }}
                >
                  User Activity - Last 12 Months
                </h5>

                <small
                  style={{
                    color: "#888",
                  }}
                >
                  Monthly, ESIC and Bill activity
                </small>

              </div>


              {/* USER FILTER */}

              <div
                style={{
                  minWidth: "220px",
                }}
              >

                <select
                  className="form-select"
                  value={selectedUser}
                  onChange={e =>
                    setSelectedUser(
                      e.target.value
                    )
                  }
                  style={{
                    borderRadius: "10px",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >

                  <option value="all">
                    All Users
                  </option>


                  {historyUsers.map(user => (

                    <option
                      key={user.user_id}
                      value={user.user_id}
                    >
                      {user.user_name} (
                      {user.user_id})
                    </option>

                  ))}

                </select>

              </div>

            </div>


            {/* =================================================
                SUMMARY CARDS
            ================================================= */}

            <div className="row mb-4">


              <div className="col-md-3 col-sm-6 mb-2">

                <div
                  style={{
                    padding: "15px",
                    borderRadius: "12px",
                    background: "#eef8ff",
                    border:
                      "1px solid #d9efff",
                  }}
                >

                  <div
                    style={{
                      fontSize: "13px",
                      color: "#777",
                    }}
                  >
                    Monthly
                  </div>

                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      color: "#2699e6",
                    }}
                  >
                    {totalMonthly}
                  </div>

                </div>

              </div>


              <div className="col-md-3 col-sm-6 mb-2">

                <div
                  style={{
                    padding: "15px",
                    borderRadius: "12px",
                    background: "#fff8e8",
                    border:
                      "1px solid #ffe8b0",
                  }}
                >

                  <div
                    style={{
                      fontSize: "13px",
                      color: "#777",
                    }}
                  >
                    ESIC Challan
                  </div>

                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      color: "#e6a52c",
                    }}
                  >
                    {totalEsic}
                  </div>

                </div>

              </div>


              <div className="col-md-3 col-sm-6 mb-2">

                <div
                  style={{
                    padding: "15px",
                    borderRadius: "12px",
                    background: "#edfff4",
                    border:
                      "1px solid #cdf3dc",
                  }}
                >

                  <div
                    style={{
                      fontSize: "13px",
                      color: "#777",
                    }}
                  >
                    Bills
                  </div>

                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      color: "#32b978",
                    }}
                  >
                    {totalBills}
                  </div>

                </div>

              </div>


              <div className="col-md-3 col-sm-6 mb-2">

                <div
                  style={{
                    padding: "15px",
                    borderRadius: "12px",
                    background: "#f4f0ff",
                    border:
                      "1px solid #e1d7ff",
                  }}
                >

                  <div
                    style={{
                      fontSize: "13px",
                      color: "#777",
                    }}
                  >
                    Total Activity
                  </div>

                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      color: "#7257d5",
                    }}
                  >
                    {totalActivity}
                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
                MONTHLY CHART
            ================================================= */}

            {monthWiseChartData.length > 0 ? (

              <ResponsiveContainer
                width="100%"
                height={420}
              >

                <BarChart
                  data={monthWiseChartData}
                  margin={{
                    top: 35,
                    right: 25,
                    left: 5,
                    bottom: 20,
                  }}
                  barGap={6}
                  barCategoryGap="25%"
                >

                  <defs>

                    <linearGradient
                      id="historyMonthlyGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >

                      <stop
                        offset="0%"
                        stopColor="#4facfe"
                      />

                      <stop
                        offset="100%"
                        stopColor="#00c6ff"
                      />

                    </linearGradient>


                    <linearGradient
                      id="historyEsicGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >

                      <stop
                        offset="0%"
                        stopColor="#f6d365"
                      />

                      <stop
                        offset="100%"
                        stopColor="#fda085"
                      />

                    </linearGradient>


                    <linearGradient
                      id="historyBillGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >

                      <stop
                        offset="0%"
                        stopColor="#84fab0"
                      />

                      <stop
                        offset="100%"
                        stopColor="#3ccf91"
                      />

                    </linearGradient>

                  </defs>


                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#eeeeee"
                  />


                  <XAxis
                    dataKey="monthLabel"
                    axisLine={false}
                    tickLine={false}
                    interval={0}
                    tick={{
                      fontSize: 12,
                      fill: "#666",
                    }}
                  />


                  <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fill: "#777",
                    }}
                  />


                  <Tooltip
                    cursor={{
                      fill:
                        "rgba(0,0,0,0.03)",
                    }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      padding: "12px",
                      boxShadow:
                        "0 5px 20px rgba(0,0,0,0.15)",
                    }}
                    labelStyle={{
                      fontWeight: "600",
                      color: "#333",
                      marginBottom: "8px",
                    }}
                  />


                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconType="circle"
                    height={45}
                    wrapperStyle={{
                      fontSize: "13px",
                    }}
                  />


                  <Bar
                    dataKey="monthly_count"
                    name="Monthly"
                    fill="url(#historyMonthlyGradient)"
                    radius={[7, 7, 0, 0]}
                    maxBarSize={40}
                  >

                    <LabelList
                      dataKey="monthly_count"
                      position="top"
                    />

                  </Bar>


                  <Bar
                    dataKey="esic_count"
                    name="ESIC Challan"
                    fill="url(#historyEsicGradient)"
                    radius={[7, 7, 0, 0]}
                    maxBarSize={40}
                  >

                    <LabelList
                      dataKey="esic_count"
                      position="top"
                    />

                  </Bar>


                  <Bar
                    dataKey="bill_count"
                    name="Bills"
                    fill="url(#historyBillGradient)"
                    radius={[7, 7, 0, 0]}
                    maxBarSize={40}
                  >

                    <LabelList
                      dataKey="bill_count"
                      position="top"
                    />

                  </Bar>

                </BarChart>

              </ResponsiveContainer>

            ) : (

              <div
                style={{
                  height: "300px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#aaa",
                }}
              >

                <i
                  className="bi bi-bar-chart"
                  style={{
                    fontSize: "40px",
                    marginBottom: "10px",
                  }}
                />

                <div>
                  No activity data available
                </div>

              </div>

            )}

          </div>


          {/* =================================================
              USERS TABLE
          ================================================= */}

          <div
            className="table-responsive mt-4"
          >

            <table
              className="table table-striped table-sm table-hover text-center"
            >

              <thead>

                <tr>

                  <th>#</th>

                  <th>Name</th>

                  <th>Mobile No</th>

                  <th>Email Id</th>

                  <th>PAN</th>

                  <th>Username</th>

                  <th>Password</th>

                  <th>Punch</th>

                  <th>Created At</th>

                  <th>Updated At</th>

                  <th>Action</th>

                </tr>

              </thead>


              <tbody>

                {currentItems.map(
                  (user, index) => (

                    <tr key={user.id}>

                      <th>
                        {index + 1}
                      </th>

                      <td>
                        {user.name}
                      </td>

                      <td>
                        {user.mobilenumber}
                      </td>

                      <td>
                        {user.email_id}
                      </td>

                      <td>
                        {user.panNo}
                      </td>

                      <td>
                        {user.username}
                      </td>

                      <td>
                        {user.password}
                      </td>

                      <td>
                        {user.punch_status
                          ? "Active"
                          : "InActive"}
                      </td>

                      <td>
                        {moment(
                          user.createdAt
                        ).format(
                          "YYYY-MM-DD"
                        )}
                      </td>

                      <td>
                        {moment(
                          user.updatedAt
                        ).format(
                          "YYYY-MM-DD"
                        )}
                      </td>

                      <td>

                        <div
                          className="d-flex align-items-center"
                        >

                          <button
                            className="btn btn-light"
                            onClick={() =>
                              getUserById(
                                user.id
                              )
                            }
                          >
                            <i className="bi bi-eye text-info"></i>
                          </button>


                          <button
                            className="btn btn-light mx-1"
                            onClick={() =>
                              getUserById(
                                user.id
                              )
                            }
                          >
                            <i className="bi bi-pencil-fill text-info"></i>
                          </button>


                          <button
                            className="btn btn-light"
                            disabled
                          >
                            <i className="bi bi-trash text-danger"></i>
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>


          {/* =================================================
              PAGINATION
          ================================================= */}

          <div
            className="pagination d-flex align-items-center gap-1"
          >

            <button
              className="btn btn-primary rounded-4"
              disabled={
                currentPage === 1
              }
              onClick={() =>
                handlePageChange(
                  currentPage - 1
                )
              }
            >
              Previous
            </button>


            {Array.from(
              {
                length: totalPages,
              },
              (_, index) => (

                <button
                  key={index}
                  onClick={() =>
                    handlePageChange(
                      index + 1
                    )
                  }
                  style={{
                    margin: "0 2px",
                    backgroundColor:
                      currentPage ===
                      index + 1
                        ? "#1e60aa"
                        : "white",
                    color:
                      currentPage ===
                      index + 1
                        ? "white"
                        : "black",
                    border: "0",
                    borderRadius: "5px",
                    padding:
                      "6px 10px",
                  }}
                >
                  {index + 1}
                </button>

              )
            )}


            <button
              className="btn btn-primary rounded-4"
              disabled={
                currentPage ===
                totalPages
              }
              onClick={() =>
                handlePageChange(
                  currentPage + 1
                )
              }
            >
              Next
            </button>

          </div>


          {/* =================================================
              ADD USER MODAL
          ================================================= */}

          <div
            className="modal fade bd-example-modal-xl"
            id="employerModel"
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
          >

            <div className="modal-dialog modal-xl">

              <div className="modal-content">

                <form>

                  <div className="modal-header">

                    <h5 className="modal-title">
                      Add User
                    </h5>

                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >

                      <span>
                        &times;
                      </span>

                    </button>

                  </div>


                  <div
                    className="modal-body"
                    style={{
                      color: "black",
                    }}
                  >


                    <div className="row mb-3">

                      <div className="form-group col-sm">

                        <label>
                          Name
                        </label>

                        <input
                          type="text"
                          className="form-control rounded-4"
                          required
                          onChange={e =>
                            set_name(
                              e.target.value
                            )
                          }
                          value={name}
                        />

                      </div>


                      <div className="form-group col-sm">

                        <label>
                          Email Id
                        </label>

                        <input
                          type="text"
                          className="form-control rounded-4"
                          required
                          onChange={e =>
                            set_email_id(
                              e.target.value
                            )
                          }
                          value={email_id}
                        />

                      </div>


                      <div className="form-group col-sm">

                        <label>
                          Mobile
                        </label>

                        <input
                          type="text"
                          className="form-control rounded-4"
                          required
                          onChange={e =>
                            set_mobilenumber(
                              e.target.value
                            )
                          }
                          value={mobilenumber}
                        />

                      </div>

                    </div>


                    <div className="row mb-3">

                      <div className="form-group col-md">

                        <label>
                          PAN
                        </label>

                        <input
                          type="text"
                          className="form-control rounded-4"
                          onChange={e =>
                            set_panNo(
                              e.target.value
                            )
                          }
                          value={panNo}
                        />

                      </div>


                      <div className="form-group col-md">

                        <label>
                          Username
                        </label>

                        <input
                          type="text"
                          className="form-control rounded-4"
                          required
                          onChange={e =>
                            set_username(
                              e.target.value
                            )
                          }
                          value={username}
                        />

                      </div>


                      <div className="form-group col-sm">

                        <label>
                          Password
                        </label>

                        <input
                          type="password"
                          className="form-control rounded-4"
                          required
                          onChange={e =>
                            set_password(
                              e.target.value
                            )
                          }
                          value={password}
                        />

                      </div>

                    </div>

                  </div>


                  <div className="modal-footer">

                    {!isUpdate ? (

                      <button
                        type="button"
                        className="btn btn-outline-primary rounded-4"
                        onClick={addUser}
                      >
                        Save
                      </button>

                    ) : (

                      <button
                        type="button"
                        className="btn btn-outline-primary rounded-4"
                      >
                        Update
                      </button>

                    )}


                    <button
                      type="button"
                      className="btn btn-outline-danger rounded-4"
                      onClick={closeModal}
                    >
                      Close
                    </button>

                  </div>

                </form>

              </div>

            </div>

          </div>

        </section>

      </div>

    </div>

  );
};


export default Blogs;