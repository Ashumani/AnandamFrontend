/* eslint-disable react-hooks/rules-of-hooks */

import { erRegister, erUpdate, getErRegister } from '../../api/services';
import { useState, useEffect } from "react"
import { getEstId } from "../Auth/authToken";
// import { useNavigate } from "react-router-dom";

const employer = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const navigate = useNavigate();

  const [ErId, setErId] = useState('');
  const [EstEpfId, setEstEpfId] = useState('');
  const [EstEsicId, setEstEsicId] = useState('');
  const [EstType, setEstType] = useState('');
  const [estDoc, setDoc] = useState('');
  const [EstName, setEstName] = useState('');
  const [ErName, setErName] = useState('');
  const [Email, setEmail] = useState('');
  const [Mobile, setMobile] = useState('');
  const [Address, setAddress] = useState('');
  const [EpfRate, setEpfRate] = useState('');
  const [EpsRate, setEpsRate] = useState('');
  const [ErRate, setErRate] = useState('');
  const [Acc1, setAcc1] = useState('');
  const [Acc2, setAcc2] = useState('');
  const [Acc10, setAcc10] = useState('');
  const [Acc21, setAcc21] = useState('');
  const [Acc22, setAcc22] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks, no-unused-vars

  const saveErDetails = async () => {
    // api call
    try {

      const params = {
        "est_name": EstName,
        "est_epf_id": EstEpfId,
        "est_esic_id": EstEsicId,
        "est_type": EstType,
        "er_name": ErName,
        "est_doc": estDoc,
        "er_mobile_number": Mobile,
        "er_email_id": Email,
        "est_address": Address,
        "ee_epf_rate": EpfRate,
        "ee_eps_rate": EpsRate,
        "er_diff_rate": ErRate,
        "acc1_rate": Acc1,
        "acc2_rate": Acc2,
        "acc10_rate": Acc10,
        "acc21_rate": Acc21,
        "acc22_rate": Acc22
      }

      const userData = await erRegister(params);

      console.log('Data Save', userData)
    } catch (error) {
      console.error('Login error ', error);
      setError(error);
    }
  };

    const updateErDetails = async () => {
    // api call
    try {

      const params = {
        "est_name": EstName,
        "est_epf_id": EstEpfId,
        "est_esic_id": EstEsicId,
        "est_type": EstType,
        "er_name": ErName,
        "est_doc": estDoc,
        "er_mobile_number": Mobile,
        "er_email_id": Email,
        "est_address": Address,
        "ee_epf_rate": EpfRate,
        "ee_eps_rate": EpsRate,
        "er_diff_rate": ErRate,
        "acc1_rate": Acc1,
        "acc2_rate": Acc2,
        "acc10_rate": Acc10,
        "acc21_rate": Acc21,
        "acc22_rate": Acc22
      }

       await erUpdate(ErId,params);

    } catch (error) {
      console.error('Login error ', error);
      setError(error);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      const params = {
        "est_epf_id": getEstId()
      }
      try {
        // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
        const response = await getErRegister(params);
        // console.log(" jvdhvsdckskcsdcv ",JSON.stringify(response));
        setEstEpfId(response.data.est_epf_id)
        setEstEsicId(response.data.est_esic_id)
        setEstType(response.data.est_type)
        setDoc(response.data.est_doc)
        setEstName(response.data.est_name)
        setErName(response.data.er_name)
        setEmail(response.data.er_email_id)
        setMobile(response.data.er_mobile_number)
        setAddress(response.data.est_address)
        setEpfRate(response.data.ee_epf_rate)
        setEpsRate(response.data.er_eps_rate)
        setErRate(response.data.er_diff_rate)
        setAcc1(response.data.acc1_rate)
        setAcc2(response.data.acc2_rate)
        setAcc10(response.data.acc10_rate)
        setAcc21(response.data.acc21_rate)
        setAcc22(response.data.acc22_rate)
        setErId(response.data.id)
        setLoading(false);
        setIsUpdate(true)
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
        setLoading(false);
        setIsUpdate(false)
      }
    };

    fetchData();
  }, []);



  return (
    <div>


      <div className="main-container">
        {/* <div className='main-title'>
          <h3>EMPLOYEER REGISTRATION</h3>
        </div> */}
        <section className="section">

          <form>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center">
                  Employer Registration
                </h5>

                <div className="form-row">
                  <div className="form-group col-md-3 ">
                    <label htmlFor="inputText">EPF No</label>
                    <input type="text" className="form-control" required onChange={(e) => setEstEpfId(e.target.value)} value={EstEpfId} />
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="inputEmail">ESIC No</label>
                    <input type="text" className="form-control" required onChange={(e) => setEstEsicId(e.target.value)} value={EstEsicId} />
                  </div>

                  <div className="form-group col-md-3">
                    <label htmlFor="inputEmail">Establishment Type</label>
                    <input type="text" className="form-control" required onChange={(e) => setEstType(e.target.value)} value={EstType} />
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="inputText">Date of Coverage</label>
                    <input type="date" className="form-control" required onChange={(e) => setDoc(e.target.value)} value={estDoc} />
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-md">
                    <label htmlFor="inputPassword">Establishment Name</label>
                    <input type="text" className="form-control" required onChange={(e) => setEstName(e.target.value)} value={EstName} />
                  </div>
                  <div className="form-group col-md">
                    <label htmlFor="inputEmail">Employer Namee</label>
                    <input type="text" className="form-control" required onChange={(e) => setErName(e.target.value)} value={ErName} />
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-md">
                    <label htmlFor="inputText">Email id</label>
                    <input type="email" className="form-control" required onChange={(e) => setEmail(e.target.value)} value={Email} />
                  </div>
                  <div className="form-group col-md">
                    <label htmlFor="inputPassword">Contact Number</label>
                    <input type="text" className="form-control" required onChange={(e) => setMobile(e.target.value)} value={Mobile} />
                  </div>
                  <div className="form-group col-md">
                    <label htmlFor="inputPassword">Address</label>
                    <input type="text" className="form-control" required onChange={(e) => setAddress(e.target.value)} value={Address} />
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center">
                  Retruns Parameter
                </h5>
                <div className="row">
                  <div className="form-group col-sm">
                    <label htmlFor="inputText">EPF </label>
                    <input type="text" className="form-control" required onChange={(e) => setEpfRate(e.target.value)} value={EpfRate} />
                  </div>
                  <div className="form-group col-sm">
                    <label htmlFor="inputEmail">EPS</label>
                    <input type="text" className="form-control" required onChange={(e) => setEpsRate(e.target.value)} value={EpsRate} />
                  </div>
                  <div className="form-group col-sm">
                    <label htmlFor="inputEmail">ER</label>
                    <input type="text" className="form-control" required onChange={(e) => setErRate(e.target.value)} value={ErRate} />
                  </div>
                  <div className="form-group col-sm">
                    <label htmlFor="inputText">Account 1</label>
                    <input type="text" className="form-control" required onChange={(e) => setAcc1(e.target.value)} value={Acc1} />
                  </div>
                  <div className="form-group col-sm">
                    <label htmlFor="inputText">Account 2</label>
                    <input type="text" className="form-control" required onChange={(e) => setAcc2(e.target.value)} value={Acc2} />
                  </div>
                  <div className="form-group col-sm">
                    <label htmlFor="inputText">Account 10</label>
                    <input type="text" className="form-control" required onChange={(e) => setAcc10(e.target.value)} value={Acc10} />
                  </div>
                  <div className="form-group col-sm">
                    <label htmlFor="inputText">Account 21</label>
                    <input type="text" className="form-control" required onChange={(e) => setAcc21(e.target.value)} value={Acc21} />
                  </div>
                  <div className="form-group col-sm">
                    <label htmlFor="inputText">Account 22</label>
                    <input type="text" className="form-control" required onChange={(e) => setAcc22(e.target.value)} value={Acc22} />
                  </div>
                </div>
              </div>
            </div>
            {!isUpdate ? (
              <button type="submit" className="btn btn-outline-secondary" onClick={saveErDetails}>
                Save
              </button>
            ) : (
              <button type="submit" className="btn btn-outline-secondary" onClick={updateErDetails}>
                Update
              </button>
            )}
          </form>

        </section>
      </div>
    </div>
  );
};

export default employer;
