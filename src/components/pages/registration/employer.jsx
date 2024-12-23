/* eslint-disable react-hooks/rules-of-hooks */

import { erRegister, erUpdate, getErRegister, uploadEmployer } from '../../api/services';
import { useState, useEffect } from "react"
import { getEstId } from "../Auth/authToken";
import Swal from 'sweetalert2';
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
  const [rate, setRate] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [checkedDSC, setCheckedDSC] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks, no-unused-vars

  const [er_esic, set_er_esic] = useState('');
  const [ee_esic, set_ee_esic] = useState('');
  const [dsc_on_name, set_dsc_on_name] = useState('');
  const [dsc_expire, set_dsc_expire] = useState('');
  const [dsc_mobile, set_dsc_mobile] = useState('');
  const [dsc_designation, set_dsc_designation] = useState('');
  const [ErDesignation, set_designation] = useState('');
  const [city, setCity] = useState('');


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
        "er_designation": ErDesignation,
        "name_on_dsc": dsc_on_name,
        "dsc_designation": dsc_designation,
        "dsc_date": dsc_expire,
        "dsc_mobile_number": dsc_mobile,
        "er_city": city,
        "ee_epf_rate": EpfRate,
        "er_eps_rate": EpsRate,
        "er_diff_rate": ErRate,
        "acc1_rate": Acc1,
        "acc2_rate": Acc2,
        "acc10_rate": Acc10,
        "acc21_rate": Acc21,
        "acc22_rate": Acc22,
        "rate": rate,
        "dsc_status": checkedDSC,
        "er_esic": er_esic,
        "ee_esic": ee_esic
      }

      const data = await erRegister(params);

      if (data.status === true) {
        Swal.fire({
          title: data.message,
          icon: 'success',
          confirmButtonText: 'Okay'
        });

      } else {
        Swal.fire({
          position: 'top-right',
          icon: 'error',
          toast: true,
          title: data.message,
          showConfirmButton: false,
          showCloseButton: true,
          timer: 1500,
        });
      }


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
        "er_designation": ErDesignation,
        "name_on_dsc": dsc_on_name,
        "dsc_designation": dsc_designation,
        "dsc_date": dsc_expire,
        "dsc_mobile_number": dsc_mobile,
        "er_city": city,
        "ee_epf_rate": EpfRate,
        "er_eps_rate": EpsRate,
        "er_diff_rate": ErRate,
        "acc1_rate": Acc1,
        "acc2_rate": Acc2,
        "acc10_rate": Acc10,
        "acc21_rate": Acc21,
        "acc22_rate": Acc22,
        "rate": rate,
        "dsc_status": checkedDSC,
        "er_esic": er_esic,
        "ee_esic": ee_esic
      }



      const data = await erUpdate(ErId, params);
      if (data.status === true) {
        Swal.fire({
          title: data.message,
          icon: 'success',
          confirmButtonText: 'Okay'
        });

      } else {
        Swal.fire({
          position: 'top-right',
          icon: 'error',
          toast: true,
          title: data.message,
          showConfirmButton: false,
          showCloseButton: true,
          timer: 1500,
        });
      }




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
        set_dsc_on_name(response.data.name_on_dsc)
        setCity(response.data.er_city)
        set_dsc_designation(response.data.dsc_designation)
        set_dsc_expire(response.data.dsc_date)
        set_dsc_mobile(response.data.dsc_mobile_number)
        set_designation(response.data.er_designation)
        setAcc1(response.data.acc1_rate)
        setAcc2(response.data.acc2_rate)
        setAcc10(response.data.acc10_rate)
        setAcc21(response.data.acc21_rate)
        setAcc22(response.data.acc22_rate)
        setRate(response.data.rate)
        setErId(response.data.id)
        setCheckedDSC(response.data.dsc_status)
        set_er_esic(response.data.er_esic)
        set_ee_esic(response.data.ee_esic)
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



  const handleChange = (event) => {

    if (event.target.id == "flexSwitchCheckPf") {
      setCheckedDSC(event.target.checked);

    }
  };

  return (
    <div>


      <div className="main-container">
        {/* <div className='main-title'>
          <h3>EMPLOYEER REGISTRATION</h3>
        </div> */}
        <section className="section">

          <div className="row">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-left">
                  Employer Registration
                </h5>

                <div className="row">
                  <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                    <label htmlFor="inputText">EPF No</label>
                    <input type="text" className="form-control rounded-4" required onChange={(e) => setEstEpfId(e.target.value)} value={EstEpfId} />
                  </div>
                  <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                    <label htmlFor="inputEmail">ESIC No</label>
                    <input type="text" className="form-control rounded-4" required onChange={(e) => setEstEsicId(e.target.value)} value={EstEsicId} />
                  </div>

                  <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                    <label htmlFor="inputEmail">Establishment Type</label>
                    <input type="text" className="form-control rounded-4" required onChange={(e) => setEstType(e.target.value)} value={EstType} />
                  </div>
                  <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                    <label htmlFor="inputText">Date of Coverage</label>
                    <input type="date" className="form-control rounded-4" required onChange={(e) => setDoc(e.target.value)} value={estDoc} />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                    <label htmlFor="inputPassword">Establishment Name</label>
                    <input type="text" className="form-control rounded-4" required onChange={(e) => setEstName(e.target.value)} value={EstName} />
                  </div>
                  <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                    <label htmlFor="inputEmail">Employer Namee</label>
                    <input type="text" className="form-control rounded-4" required onChange={(e) => setErName(e.target.value)} value={ErName} />
                  </div>
                  <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                    <label htmlFor="inputEmail">Designation</label>
                    <input type="text" className="form-control rounded-4" required onChange={(e) => set_designation(e.target.value)} value={ErDesignation} />
                  </div>
                  <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                    <label htmlFor="inputEmail">City</label>
                    <input type="text" className="form-control rounded-4" required onChange={(e) => setCity(e.target.value)} value={city} />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                    <label htmlFor="inputText">Email id</label>
                    <input type="email" className="form-control rounded-4" required onChange={(e) => setEmail(e.target.value)} value={Email} />
                  </div>
                  <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                    <label htmlFor="inputPassword">Contact Number</label>
                    <input type="text" className="form-control rounded-4" required onChange={(e) => setMobile(e.target.value)} value={Mobile} />
                  </div>
                  <div className="col-sm-3 col-md-3 col-lg-6 col-3">
                    <label htmlFor="inputPassword">Address</label>
                    <input type="text" className="form-control rounded-4" required onChange={(e) => setAddress(e.target.value)} value={Address} />
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className='row'>
                  <div className="col-sm">
                    <h5 className="card-title text-left">
                      Authorized Digital Signature
                    </h5>
                  </div>
                  <div className="col-sm-1">
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckPf" checked={checkedDSC} onChange={handleChange} />
                    </div>
                  </div>
                </div>
                {checkedDSC && (
                  <div className="row">

                    <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                      <label htmlFor="inputText">Name On DSC </label>
                      <input type="text" className="form-control rounded-4" required onChange={(e) => set_dsc_on_name(e.target.value)} value={dsc_on_name} />
                    </div>
                    <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                      <label htmlFor="inputEmail">Designation</label>
                      <input type="text" className="form-control rounded-4" required onChange={(e) => set_dsc_designation(e.target.value)} value={dsc_designation} />
                    </div>
                    <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                      <label htmlFor="inputEmail">Expire Date</label>
                      <input type="date" className="form-control rounded-4" required onChange={(e) => set_dsc_expire(e.target.value)} value={dsc_expire} />
                    </div>
                    <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                      <label htmlFor="inputText">Mobile</label>
                      <input type="text" className="form-control rounded-4" required onChange={(e) => set_dsc_mobile(e.target.value)} value={dsc_mobile} />
                    </div>

                  </div>)}
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-left">
                  Retruns Parameter
                </h5>
                <h5 className="card-title text-left">
                  EPF
                </h5>
                <div className="row">
                  <div className="form-group col-sm">
                    <label htmlFor="inputText">EPF </label>
                    <input type="text" className="form-control rounded-4" required onChange={(e) => setEpfRate(e.target.value)} value={EpfRate} />
                  </div>
                  <div className="form-group col-sm">
                    <label htmlFor="inputEmail">EPS</label>
                    <input type="text" className="form-control rounded-4" required onChange={(e) => setEpsRate(e.target.value)} value={EpsRate} />
                  </div>
                  <div className="form-group col-sm">
                    <label htmlFor="inputEmail">ER</label>
                    <input type="text" className="form-control rounded-4" required onChange={(e) => setErRate(e.target.value)} value={ErRate} />
                  </div>
                  <div className="form-group col-sm">
                    <label htmlFor="inputText">Account 1</label>
                    <input type="text" className="form-control rounded-4" required onChange={(e) => setAcc1(e.target.value)} value={Acc1} />
                  </div>
                  <div className="form-group col-sm">
                    <label htmlFor="inputText">Account 2</label>
                    <input type="text" className="form-control rounded-4" required onChange={(e) => setAcc2(e.target.value)} value={Acc2} />
                  </div>
                  <div className="form-group col-sm">
                    <label htmlFor="inputText">Account 10</label>
                    <input type="text" className="form-control rounded-4" required onChange={(e) => setAcc10(e.target.value)} value={Acc10} />
                  </div>
                  <div className="form-group col-sm">
                    <label htmlFor="inputText">Account 21</label>
                    <input type="text" className="form-control rounded-4" required onChange={(e) => setAcc21(e.target.value)} value={Acc21} />
                  </div>
                  <div className="form-group col-sm">
                    <label htmlFor="inputText">Account 22</label>
                    <input type="text" className="form-control rounded-4" required onChange={(e) => setAcc22(e.target.value)} value={Acc22} />
                  </div>
                  <hr style={{ width: '99%' }} />
                  <h5 className="card-title text-left">
                    ESIC
                  </h5>
                  <div className="form-group col-sm-2">
                    <label htmlFor="inputText">ER Share</label>
                    <input type="text" className="form-control rounded-4" required onChange={(e) => set_er_esic(e.target.value)} value={er_esic} />
                  </div>
                  <div className="form-group col-sm-2">
                    <label htmlFor="inputText">EE Share</label>
                    <input type="text" className="form-control rounded-4" required onChange={(e) => set_ee_esic(e.target.value)} value={ee_esic} />
                  </div>
                  <hr style={{ width: '99%' }} />
                  <h5 className="card-title text-left">
                    Bill Rate
                  </h5>
                  <div className="form-group col-sm-2">
                    <label htmlFor="inputText">Rate</label>
                    <input type="text" className="form-control rounded-4" required onChange={(e) => setRate(e.target.value)} value={rate} />
                  </div>

                  <hr style={{ width: '99%' }} />
                  <h5 className="card-title text-left">
                    Pay Roll Parameter
                  </h5>
                  <div className="form-group col-sm-2">
                    <label htmlFor="inputText">Rate</label>
                    <input type="text" className="form-control rounded-4" required onChange={(e) => setRate(e.target.value)} value={rate} />
                  </div>
                </div>

                <div className="row">
                <hr style={{ width: '99%' }} />
                  <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                    {!isUpdate ? (
                      <button type="button" className="btn btn-outline-secondary rounded-4" onClick={saveErDetails}>
                        Save
                      </button>
                    ) : (
                      <button type="button" className="btn btn-outline-secondary rounded-4" onClick={updateErDetails}>
                        Update
                      </button>
                    )}</div>
                </div>
              </div>
            </div>

          </div>

        </section>
      </div>
    </div>
  );
};

export default employer;
