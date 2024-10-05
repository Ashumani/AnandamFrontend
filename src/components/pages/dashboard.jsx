
import "./dashboard.css"

import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill }
  from 'react-icons/bs'
import { BarChart, PieChart, Pie, AreaChart, Area, Bar, ComposedChart, ScatterChart, Scatter, ZAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, LabelList, Cell }
  from 'recharts';
import { getBillGraph, getCardsCount, getGraph, getYearsAndMonth } from "../api/services";
import { useState, useEffect } from "react"
import moment from "moment";


const dashboard = () => {

  // const data = [
  //   {
  //     name: 'Page A',
  //     uv: 4000,
  //     pv: 2400,
  //     amt: 2000,
  //   },
  //   {
  //     'name': 'Page B',
  //     uv: 3000,
  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: 'Page C',
  //     uv: 2000,
  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: 'Page D',
  //     uv: 2780,
  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: 'Page E',
  //     uv: 1890,
  //     pv: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: 'Page F',
  //     uv: 2390,
  //     pv: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: 'Page G',
  //     uv: 3490,
  //     pv: 4300,
  //     amt: 2100,
  //   }
  // ];

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

  const fromMonth = 3
  const toMonth = 4
  const fromYear = moment().year()
  const toYear = moment().year() + 1
  const [selectedYear, setSelectedYear] = useState(fromYear);

  const [chartData, setChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);




  useEffect(() => {
    const fetchData = async () => {
      await getYears();
      await getAll();
      await getGraphDetails(fromMonth, toMonth, fromYear, toYear)
      await getBillDetailsForGraph()

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
        "toYear": toYear
      }
      const response = await getGraph(params);
      setData(response.data)


    } catch (error) {
      console.error('Error fetching data:', error);
      // setError('Error fetching data. Please try again.');
      // setLoading(false);
    }
  };

  const getBillDetailsForGraph = async () => {
    // api call

    try {

      const params = {
        "fromMonth": fromMonth,
        "toMonth": toMonth,
        "fromYear": fromYear,
        "toYear": toYear
      }
      const response = await getBillGraph(params);
      const Data = response.data.map(item => ({
        name: item.est_epf_id,
        totalbill: Number(item.totalbill),
        totalamtreceived: Number(item.totalamtreceived),
        
      }));
      setChartData(Data);
      setPieChartData(response.total) 




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


    } catch (error) {
      console.error('Error fetching data:', error);
      // setError('Error fetching data. Please try again.');
      // setLoading(false);
    }
  };

  const handleYearChange = async (e) => {
    setSelectedYear(e.target.value);
    await getGraphDetails(fromMonth, toMonth, parseInt(e.target.value), parseInt(e.target.value) + 1)
  };

  const colors = ['#2b6b86', '#f76e6e'];
  return (
    <div>



      <main className='main-container'>
        <div className='main-title'>
          <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
          <div className='card cardprop1'>
            <div className='card-inner'>
              <h3>Clients</h3>
              <BsFillArchiveFill className='card_icon' />
            </div>
            <h1>{totalclient}</h1>
          </div>
          <div className='card cardprop2'>
            <div className='card-inner'>
              <h3>EPF</h3>
              <BsFillGrid3X3GapFill className='card_icon' />
            </div>
            <h1>{totalepf}/{epfchallancreated}</h1>
          </div>
          <div className='card cardprop3'>
            <div className='card-inner'>
              <h3>ESIC</h3>
              <BsPeopleFill className='card_icon' />
            </div>
            <h1>{totalesic}/{esicchallancreated}</h1>
          </div>
          <div className='card cardprop4'>
            <div className='card-inner'>
              <h3>DSC</h3>
              <BsFillBellFill className='card_icon' />
            </div>
            <h1>{totaldsc}/{expiredsc}</h1>
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
        <div className='charts'>
          <ResponsiveContainer width="100%" height="100%">
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
                  { id: 'pv', type: 'line', color: '#2b6b86', value: 'Employee Count' },
                  { id: 'uv', type: 'line', color: '#f7c94c', value: 'Challan Count' },
                ]}
                verticalAlign="top"
              />
              <Bar dataKey="pv" fill="url(#colorPv)">
                <LabelList dataKey="pv" position="top" />
              </Bar>
              <Bar dataKey="uv" fill="url(#colorUv)">
                <LabelList dataKey="uv" position="top" />
              </Bar>
            </BarChart>) : (
              <div style={{ textAlign: 'center', padding: '20px', fontSize: '16px', color: '#999' }}>
                No Data Available
              </div>
            )}
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height="100%">
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
              <Bar dataKey="pv" barSize={20} fill="url(#colorPv)" />
              <Line type="monotone" dataKey="uv" stroke="#ff7300" />
            </ComposedChart>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px', fontSize: '16px', color: '#999' }}>
                No Data Available
              </div>
            )}
          </ResponsiveContainer>

        </div>

        <div className='charts'>
          <ResponsiveContainer width="100%" height="100%">
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
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height="100%">
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
                  verticalAlign="top"
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
            <AreaChart width={730} height={250} data={data}
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

          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              width={730}
              height={250}
              margin={{
                top: 20,
                right: 20,
                bottom: 10,
                left: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="value" type="number" name="stature" unit="cm" />
              <YAxis dataKey="value" type="number" name="weight" unit="kg" />
              <ZAxis dataKey="z" type="number" range={[64, 144]} name="score" unit="km" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name="A school" data={data1} fill="#8884d8" />
              <Scatter name="B school" data={data2} fill="#82ca9d" />
            </ScatterChart>
          </ResponsiveContainer>

        </div>
      </main>
    </div>
  )
}

export default dashboard