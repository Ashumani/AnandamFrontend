
import "./userProfile.css"

import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill }
  from 'react-icons/bs'
import { BarChart, PieChart, Pie, AreaChart, Area, Bar, ComposedChart, ScatterChart, Scatter, ZAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, LabelList, Cell }
  from 'recharts';
import { getBillGraph, getCardsCount, getGraph, getUser, getUserGraph, getYearsAndMonth } from "../../api/services";
import { useState, useEffect } from "react"
import moment from "moment";
import { getEstId } from "../Auth/authToken";


const userProfile = () => {
  const [data, setData] = useState([])
  const [data1, setData1] = useState([])
  // const data1 = [{ name: "A", value: 100 }, { name: "B", value: 200 }, { name: "C", value: 300 }, { name: "D", value: 400 }]
  const data2 = [{ name: "A", value: 200 }, { name: "B", value: 300 }, { name: "C", value: 400 }, { name: "D", value: 500 }]



  const [returnsYear, setReturnsYear] = useState('')
  const [cardResponse, setCardResponse] = useState('')

  const [totalclient, settotalclient] = useState('')
  const [totalepf, settotalepf] = useState('')
  const [epfchallancreated, setepfchallancreated] = useState('')
  const [totalesic, settotalesic] = useState('')
  const [esicchallancreated, setesicchallancreated] = useState('')
  const [totaldsc, settotaldsc] = useState('')
  const [expiredsc, setexpiredsc] = useState('')
  const [userGraphData, setUserGraphData] = useState([]);
  const [userData, setUserData] = useState([]);


  const fromMonth = 3
  const toMonth = 4
  const fromYear = moment().year() - 1
  const toYear = moment().year()
  const [selectedYear, setSelectedYear] = useState(fromYear);

  const [chartData, setChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  const [name, set_name] = useState('');
  const [mobilenumber, set_mobilenumber] = useState('');
  const [email_id, set_email_id] = useState('');
  const [panNo, set_panNo] = useState('');
  const [gstNo, set_gstNo] = useState('');
  const [country, set_country] = useState('');
  const [username, set_username] = useState('');
  const [password, set_password] = useState('');
  const [date_of_join, set_date_of_join] = useState('');




  useEffect(() => {
    const fetchData = async () => {
      await getYears();
      await getusers();
      await getUserGraphDetails(fromMonth, toMonth, fromYear, toYear)

    };

    fetchData();

  }, []);

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
      settotalepf(response.total[1].value)
      settotalesic(response.total[2].value)
      settotalclient(response.data_epf.length)


    } catch (error) {
      console.error('Error fetching data:', error);
      // setError('Error fetching data. Please try again.');
      // setLoading(false);
    }
  };


  const getusers = async () => {
    // api call

    try {

      const response = await getUser();
      setUserData(response);
      set_name(response.name);
      set_mobilenumber(response.mobilenumber);
      set_email_id(response.email_id);
      set_panNo(response.panNo);
      set_gstNo(response.gstNo);
      set_country(response.country);
      set_username(response.name);
      set_password(response.name);
      set_date_of_join(response.createdAt)


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
  return (
    <div>
      <main className='main-container' style={{ "marginTop": "50px", "fontSize": "15px", "color": "black" }}>
        <div className='userprofile-main-title'>
          <h3>User Insights</h3>
        </div>
        <div className="row">
          <div className='userprofile-main-cards'>
            <div className='cardCustom cardprop1'>
              <div className='card-inner'>
                <h5>User</h5>
                <BsFillArchiveFill className='card_icon' />
              </div>
              <h1>{totalclient}</h1>
            </div>
            <div className='cardCustom cardprop2'>
              <div className='card-inner'>
                <h5>EPF</h5>
                <BsFillGrid3X3GapFill className='card_icon' />
              </div>
              <h1>{totalepf}</h1>
            </div>
            <div className='cardCustom cardprop3'>
              <div className='card-inner'>
                <h5>ESIC</h5>
                <BsPeopleFill className='card_icon' />
              </div>
              <h1>{totalesic}</h1>
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
              className="form-select rounded-4 dropdown-content"
              aria-label="Default select example" value={selectedYear} onChange={handleYearChange}
            >
              {returnsYear && returnsYear.yearTo.map((returnYear) => (
                // eslint-disable-next-line react/jsx-key
                <option value={returnYear.startYear}>{returnYear.between}</option>
              ))}
            </select>
          </div>

        </div>

        <div className="row">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-left">
                User Details
              </h5>

              <div className="row">
                <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                  <label htmlFor="inputText">First Name</label>
                  <input type="text" className="form-control rounded-4" required onChange={(e) => handleYearChange(e.target.value)} value={name} />
                </div>
                <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                  <label htmlFor="inputEmail">Last Name</label>
                  <input type="text" className="form-control rounded-4" required onChange={(e) => handleYearChange(e.target.value)} value={name} />
                </div>

                <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                  <label htmlFor="inputEmail">Email</label>
                  <input type="text" className="form-control rounded-4" required onChange={(e) => handleYearChange(e.target.value)} value={email_id} />
                </div>
                <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                  <label htmlFor="inputText">Mobile</label>
                  <input type="text" className="form-control rounded-4" required onChange={(e) => handleYearChange(e.target.value)} value={mobilenumber} />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                  <label htmlFor="inputText">PAN</label>
                  <input type="text" className="form-control rounded-4" required onChange={(e) => handleYearChange(e.target.value)} value={panNo} />
                </div>
                <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                  <label htmlFor="inputEmail">User Name</label>
                  <input type="text" className="form-control rounded-4" required onChange={(e) => handleYearChange(e.target.value)} value={username} />
                </div>

                <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                  <label htmlFor="inputEmail">Password</label>
                  <input type="text" className="form-control rounded-4" required onChange={(e) => handleYearChange(e.target.value)} value={password} />
                </div>
                <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                  <label htmlFor="inputText">Date of Joining</label>
                  <input type="date" className="form-control rounded-4" required onChange={(e) => handleYearChange(e.target.value)} value={date_of_join} />
                </div>
              </div>




            </div>
          </div>
        </div>

      </main>
    </div>
  )
}

export default userProfile