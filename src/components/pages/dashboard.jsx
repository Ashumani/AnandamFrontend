
import "./dashboard.css"

import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill }
  from 'react-icons/bs'
import { BarChart, PieChart, Pie, AreaChart, Area, Bar, ComposedChart, ScatterChart, Scatter, ZAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line }
  from 'recharts';
import { getCardsCount } from "../api/services";
import { useState, useEffect } from "react"


const dashboard = () => {

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      'name': 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    }
  ];

  const data1 = [{ name: "A", value: 100 }, { name: "B", value: 200 }, { name: "C", value: 300 }, { name: "D", value: 400 }]
  const data2 = [{ name: "A", value: 200 }, { name: "B", value: 300 }, { name: "C", value: 400 }, { name: "D", value: 500 }]

  const [cardResponse, setCardResponse] = useState('')

  const [totalepf, settotalepf] = useState('')
  const [epfchallancreated, setepfchallancreated] = useState('')
  const [totalesic, settotalesic] = useState('')
  const [esicchallancreated, setesicchallancreated] = useState('')
  const [totaldsc, settotaldsc] = useState('')
  const [expiredsc, setexpiredsc] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      await getAll();
    };

    fetchData();

  }, []);

  const getAll = async () => {
    // api call

    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await getCardsCount();
      if (response.status == true) {
        settotalepf(response.data[0].totalepf)
        setepfchallancreated(response.data[0].epfchallancreated)
        settotalesic(response.data[0].totalesic)
        setesicchallancreated(response.data[0].esicchallancreated)
        settotaldsc(response.data[0].totaldsc)
        setexpiredsc(response.data[0].expiredsc)
      }


    } catch (error) {
      console.error('Error fetching data:', error);
      // setError('Error fetching data. Please try again.');
      // setLoading(false);
    }
  };

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
            <h1>{totalepf}</h1>
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

        <div className='charts'>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
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
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart width={730} height={250} data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid stroke="#f5f5f5" />
              <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
              <Bar dataKey="pv" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="uv" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>

        </div>

        <div className='charts'>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={730} height={250}>
              <Pie data={data1} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
              <Pie data={data2} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
            </PieChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height="100%">
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
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>

        </div>

        <div className='charts'>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart width={730} height={250} data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
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
              <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
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