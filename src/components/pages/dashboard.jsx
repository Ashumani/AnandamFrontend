
import "./dashboard.css"

import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill }
  from 'react-icons/bs'
import { BarChart, PieChart, Pie, AreaChart, Area, Bar, ComposedChart, ScatterChart, Scatter, ZAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, LabelList, Cell }
  from 'recharts';
import { getBillGraph, getCardsCount, getGraph, getUser, getUserGraph, getYearsAndMonth } from "../api/services";
import { useState, useEffect } from "react"
import moment from "moment";
import { getErId, getEstId } from "./Auth/authToken";

const dashboard = () => {

  
const [selectedCard, setSelectedCard] = useState("");



  const [data, setData] = useState([])
  const [data1, setData1] = useState([])

  const [returnsYear, setReturnsYear] = useState('')
  const [cardResponse, setCardResponse] = useState('')

  const [totalclient, settotalclient] = useState('')
  const [totalepf, settotalepf] = useState('')
  const [epfchallancreated, setepfchallancreated] = useState('')
  const [totalesic, settotalesic] = useState('')
  const [esicchallancreated, setesicchallancreated] = useState('')
  const [totaldsc, settotaldsc] = useState('')
  const [expiredsc, setexpiredsc] = useState('')

  const fromMonth = 4
  const toMonth = 3
  const fromYear = moment().year() - 1
  const toYear = moment().year()
  const [selectedYear, setSelectedYear] = useState(fromYear);

  const [userGraphData, setUserGraphData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  const employeeList = [
  {
    name: "Rahul Sharma",
    epfId: "NGNAG0064576",
    month: "May",
    year: 2026,
    status: "SUCCESS",
  },
  {
    name: "Amit Verma",
    epfId: "NGNAG0064577",
    month: "May",
    year: 2026,
    status: "FAILED",
  },
  {
    name: "Priya Singh",
    epfId: "NGNAG0064578",
    month: "May",
    year: 2026,
    status: "PENDING",
  },
];

  useEffect(() => {
    const fetchData = async () => {
      await getYears();
      await getAll();
      await getGraphDetails(fromMonth, toMonth, fromYear, toYear)
      await getBillDetailsForGraph(fromMonth, toMonth, fromYear, toYear)
      await getUserGraphDetails(fromMonth, toMonth, fromYear, toYear)

    };

    fetchData();

  }, []);

  const getAll = async () => {
    // api call

    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await getCardsCount();
      if (response.status == true) {
        settotalclient(response.data.totalClient)
        settotalepf(response.data.totalepf)
        setepfchallancreated(response.data.epfchallancreated)
        settotalesic(response.data.totalesic)
        setesicchallancreated(response.data.esicchallancreated)
        settotaldsc(response.data.totaldsc)
        setexpiredsc(response.data.expiredsc)
      }


    } catch (error) {
      console.error('Error fetching data:', error);
      // setError('Error fetching data. Please try again.');
      // setLoading(false);
    }
  };

  const getGraphDetails = async (fromMonth, toMonth, fromYear, toYear) => {
    // api call

    try {

      const params = {
        "fromMonth": fromMonth,
        "toMonth": toMonth,
        "fromYear": fromYear,
        "toYear": toYear,
        "est_id": getEstId()
      }
      const response = await getGraph(params);
      setData(response.data)


    } catch (error) {
      console.error('Error fetching data:', error);
      // setError('Error fetching data. Please try again.');
      // setLoading(false);
    }
  };

  const getUserGraphDetails = async (fromMonth, toMonth, fromYear, toYear) => {
    // api call

    try {

      const params = {
        "fromMonth": fromMonth,
        "toMonth": toMonth,
        "fromYear": fromYear,
        "toYear": toYear,
        "est_id": getEstId()
      }
      const response = await getUserGraph(params);
      setUserGraphData(response.total)


    } catch (error) {
      console.error('Error fetching data:', error);
      // setError('Error fetching data. Please try again.');
      // setLoading(false);
    }
  };

  const getBillDetailsForGraph = async (fromMonth, toMonth, fromYear, toYear) => {
    // api call

    try {

      const params = {
        "fromMonth": fromMonth,
        "toMonth": toMonth,
        "fromYear": fromYear,
        "toYear": toYear,
        "est_id": getEstId()
      }
      const response = await getBillGraph(params);
      if (response.status == true) {
        const Data = response.data.map(item => ({
          name: item.est_epf_id,
          totalbill: Number(item.totalbill),
          totalamtreceived: Number(item.totalamtreceived),

        }));
        setChartData(Data);
        setPieChartData(response.total)

      } else {
        setChartData([]);
        setPieChartData([])
      }




    } catch (error) {
      console.error('Error fetching data:', error);
      // setError('Error fetching data. Please try again.');
      // setLoading(false);
    }
  };

  const getYears = async () => {
    // api call

    try {

      const response = await getYearsAndMonth();
      setReturnsYear(response.data);
      // await getGraphDetails(fromMonth, toMonth, parseInt(response.data.yearTo[0].startYear), parseInt(response.data.yearTo[0].startYear) + 1)
      // await getBillDetailsForGraph(fromMonth, toMonth, parseInt(response.data.yearTo[0].startYear), parseInt(response.data.yearTo[0].startYear) + 1)


    } catch (error) {
      console.error('Error fetching data:', error);
      // setError('Error fetching data. Please try again.');
      // setLoading(false);
    }
  };

  const handleYearChange = async (e) => {
    setSelectedYear(e.target.value);
    await getGraphDetails(fromMonth, toMonth, parseInt(e.target.value), parseInt(e.target.value) + 1)
    await getBillDetailsForGraph(fromMonth, toMonth, parseInt(e.target.value), parseInt(e.target.value) + 1)
  };

  const colors = ['#2b6b86', '#f76e6e'];
  const handleCardClick = (cardName) => {
    setSelectedCard(cardName);

    // Call API here if required
    // getEsicDetails();
};
  return (
    <div>



      <main className='main-container' style={{ "marginTop": "50px", "fontSize": "15px", "color": "black" }}>
        <div className='main-title'>
          <h3>DASHBOARD</h3>
        </div>
        <div className="row">
          <div className='main-cards'>
            <div className='cardCustom cardprop1'>
              <div className='card-inner'>
                <h5>Clients</h5>
                <BsFillArchiveFill className='card_icon' />
              </div>
              <h1>{totalclient}</h1>
            </div>
            
            <div
              className='cardCustom cardprop2'
              style={{ cursor: "pointer" }}
              data-toggle="modal"
              data-target="#employeeStatusModal"
              onClick={() => handleCardClick("epf")}
            >
              <div className="card-inner">
                <h5>EPF</h5>
                <BsPeopleFill className="card_icon" />
              </div>

               <h1>{totalepf}/{epfchallancreated}</h1>
            </div>
            <div className='cardCustom cardprop3'>
              <div className='card-inner'>
                <h5>ESIC</h5>
                <BsPeopleFill className='card_icon' />
              </div>
              <h1>{totalesic}/{esicchallancreated}</h1>

            </div>
            <div className='cardCustom cardprop4'>
              <div className='card-inner'>
                <h5>DSC</h5>
                <BsFillBellFill className='card_icon' />
              </div>
              <h1>{totaldsc}/{expiredsc}</h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2">
            <select
              // className="form-select rounded-4 dropdown-content"
              className="form-select rounded-4"
              aria-label="Default select example" value={selectedYear} onChange={handleYearChange}
            >
              {returnsYear && returnsYear.yearTo.map((returnYear) => (
                // eslint-disable-next-line react/jsx-key
                <option value={returnYear.startYear}>{returnYear.between}</option>
              ))}
            </select>
          </div>

        </div>

        <div className="chartView">
          <div className='charts'>
            <ResponsiveContainer width="100%" height="75%">
              {data && data.length > 0 ? (<BarChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <defs>
                  <linearGradient id="colorPv" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#2b6b86', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#82ca9d', stopOpacity: 1 }} />
                  </linearGradient>
                  <linearGradient id="colorUv" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#f7c94c', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#f76e6e', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend
                  payload={[
                    { id: 'employerCount', type: 'line', color: '#2b6b86', value: 'Employer Count' },
                    // { id: 'challanCount', type: 'line', color: '#f7c94c', value: 'Challan Count' },
                    { id: 'employeeCount', type: 'line', color: '#f7c94c', value: 'Employee Count' },
                  ]}
                  verticalAlign="bottom"
                />
                <Bar dataKey="employerCount" fill="url(#colorPv)">
                  <LabelList dataKey="employerCount" position="top" />
                </Bar>
                <Bar dataKey="employeeCount" fill="url(#colorUv)">
                  <LabelList dataKey="employeeCount" position="top" />
                </Bar>
              </BarChart>) : (
                <div style={{ textAlign: 'center', padding: '20px', fontSize: '16px', color: '#999' }}>
                  No Data Available
                </div>
              )}
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height="75%">
              {data && data.length > 0 ? (<ComposedChart width={730} height={250} data={data}>
                <defs>
                  <linearGradient id="colorAmt" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#8884d8', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#d4c3e0', stopOpacity: 1 }} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#fcbdb3', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#ff6b6b', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />
                <Area type="monotone" dataKey="amt" fill="url(#colorAmt)" stroke="#8884d8" />
                <Bar dataKey="amt" barSize={20} fill="url(#colorPv)" />
                <Bar dataKey="employerCont" barSize={20} fill="url(#colorPv)" />
                <Line type="monotone" dataKey="challanCount" stroke="#ff7300" />
              </ComposedChart>
              ) : (
                <div style={{ textAlign: 'center', padding: '20px', fontSize: '16px', color: '#999' }}>
                  No Data Available
                </div>
              )}
            </ResponsiveContainer>

          </div>

          <div className='charts'>
            <ResponsiveContainer width="100%" height="75%">
              {pieChartData && pieChartData.length > 0 ? (
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              ) : (
                <div style={{ textAlign: 'center', padding: '20px', fontSize: '16px', color: '#999' }}>
                  No Data Available
                </div>
              )}
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="75%">
              {chartData.length > 0 ? (
                <BarChart
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <defs>
                    <linearGradient id="colorTotalBill" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#2b6b86', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#82ca9d', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="colorAmtReceived" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#f7c94c', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#f76e6e', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend
                    payload={[
                      { id: 'totalbill', type: 'line', color: '#2b6b86', value: 'Total Bill' },
                      { id: 'totalamtreceived', type: 'line', color: '#f7c94c', value: 'Total Amount Received' },
                    ]}
                    verticalAlign="bottom"
                  />
                  <Bar dataKey="totalbill" fill="url(#colorTotalBill)">
                    <LabelList dataKey="totalbill" position="top" />
                  </Bar>
                  <Bar dataKey="totalamtreceived" fill="url(#colorAmtReceived)">
                    <LabelList dataKey="totalamtreceived" position="top" />
                  </Bar>
                </BarChart>
              ) : (
                <div style={{ textAlign: 'center', padding: '20px', fontSize: '16px', color: '#999' }}>
                  No Data Available
                </div>
              )}
            </ResponsiveContainer>

            {/* <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#fb66c2" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer> */}

          </div>

          <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart width={730} height={250} data={userGraphData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fb66c2" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#fb66c2" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="#fb66c2" fillOpacity={1} fill="url(#colorUv)" />
                <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
              </AreaChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userGraphData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#52525dff"
                  label
                >
                  {userGraphData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </main>

      <div
  className="modal fade"
  id="employeeStatusModal"
  tabIndex="-1"
  role="dialog"
  aria-labelledby="employeeStatusModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog modal-lg" role="document">
    <div className="modal-content">

      <div className="modal-header text-white">
        <h5 className="modal-title" id="employeeStatusModalLabel">
          Employer Chalan Status
        </h5>

        <button
          type="button"
          className="close text-black"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div className="modal-body">

        <div className="table-responsive">

          <table className="table table-bordered table-hover table-striped">

            <thead className="thead-light">

              <tr>
                <th>#</th>
                <th>Name</th>
                <th>EPF ID</th>
                <th>Month</th>
                <th>Year</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {employeeList && employeeList.length > 0 ? (
                employeeList.map((emp, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{emp.name}</td>
                    <td>{emp.epfId}</td>
                    <td>{emp.month}</td>
                    <td>{emp.year}</td>
                    <td>
                      {emp.status === "SUCCESS" ? (
                        <span className="badge badge-success">
                          SUCCESS
                        </span>
                      ) : emp.status === "PENDING" ? (
                        <span className="badge badge-warning">
                          PENDING
                        </span>
                      ) : (
                        <span className="badge badge-danger">
                          FAILED
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No Records Found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
        >
          Close
        </button>
      </div>

    </div>
  </div>
</div>
    </div>
  )
}

export default dashboard