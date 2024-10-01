/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useEffect } from "react"
import { getEstId, getErId } from "../Auth/authToken";
import { getMasterList, uploadEmployer, erRegister, erUpdate } from "../../api/services";
import Swal from 'sweetalert2';
import moment from 'moment-timezone';
import React, { useRef } from 'react';
const master = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, set_totalPages] = useState(1);

  // Get current items based on the current page
  const [currentItems, set_currentItems] = useState([]);
  const modalRef = useRef(null);


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
  const [checkedDSC, setCheckedDSC] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks, no-unused-vars


  const [dsc_on_name, set_dsc_on_name] = useState('');
  const [dsc_expire, set_dsc_expire] = useState('');
  const [dsc_mobile, set_dsc_mobile] = useState('');
  const [dsc_designation, set_dsc_designation] = useState('');
  const [ErDesignation, set_designation] = useState('');
  const [city, setCity] = useState('');

  // const [employeeData, setEmployeeData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await getAll();
    };

    fetchData();

  }, []);

  const getAll = async () => {
    // api call
    const params = {
      "limit": itemsPerPage,
      "offset": currentPage
    }
    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await getMasterList(params);
      if (response.status == true) {
        // setEmployeeData(response.data);

        // set_totalPages(Math.ceil(response.data.length / itemsPerPage));

        // // Get current items based on the current page
        // set_startIndex((currentPage - 1) * itemsPerPage);
        set_totalPages(Math.ceil(response.count / itemsPerPage));
        set_currentItems(response.data);

      }


    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
      setLoading(false);
    }
  };


  const uplaodBulkEmployer = async () => {
    if (!file) {
      alert('Please choose a file first.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      const data = await uploadEmployer(formData);
      if (data.status === true) {
        Swal.fire({
          position: 'top-right',
          icon: 'success',
          toast: true,
          title: data.message,
          showConfirmButton: false,
          showCloseButton: true,
          timer: 1500,
        });


      } else {
        Swal.fire({
          title: 'Error',
          text: data.message + " : " + data.data,
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps


    } catch (error) {
      console.error('Login error ', error);
      setError(error);
    }
  }

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
        "ee_eps_rate": EpsRate,
        "er_diff_rate": ErRate,
        "acc1_rate": Acc1,
        "acc2_rate": Acc2,
        "acc10_rate": Acc10,
        "acc21_rate": Acc21,
        "acc22_rate": Acc22,
        "rate": rate,
        "dsc_status": checkedDSC
      }

      await erRegister(params);


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
        "ee_eps_rate": EpsRate,
        "er_diff_rate": ErRate,
        "acc1_rate": Acc1,
        "acc2_rate": Acc2,
        "acc10_rate": Acc10,
        "acc21_rate": Acc21,
        "acc22_rate": Acc22,
        "rate": rate,
        "dsc_status": checkedDSC
      }

      await erUpdate(ErId, params);

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

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getAll();

  };



  const closeModal = () => {
    const modalElement = modalRef.current;
    if (modalElement) {
      // eslint-disable-next-line no-undef
      const modal = new bootstrap.Modal(modalElement);
      modal.hide();
    }
  };

  const openModal = () => {
    const modalElement = modalRef.current;
    console.log(modalElement)
    if (modalElement) {
      // eslint-disable-next-line no-undef
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  };
  return (
    <div>

      <div className="main-container">
        <div className='main-title'>
          <h3>Master List</h3>
        </div>
        <section className="section">
          <br />
          <div className="row">
            <div className="col-sm-2">
              <button
                type="file"
                className="btn btn-outline-primary btn-block rounded-4" data-toggle="modal" data-target=".bd-example-modal-xl"> Add Employer</button>
            </div>
            <div className="col-sm-2">
              <button
                type="file"
                className="btn btn-outline-primary btn-block rounded-4" data-toggle="modal" data-target="#importReturn"
              >
                Import
              </button>
            </div>
            <div className="col-sm-2">
              <button
                type="file"
                className="btn btn-outline-primary btn-block rounded-4" data-toggle="modal" data-target="#importReturn"
              >
                Export
              </button>
            </div>

          </div>

          <div className="table-responsive mt-2">
            <table className="table table-striped table-sm table-hover text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employer Name</th>
                  <th>EST Id</th>
                  <th>DSC Status</th>
                  <th>DSC Expire Date</th>
                  <th>Total Emp</th>
                  <th>Last Month Emp</th>
                  <th>Total Challan</th>
                  <th>Total Bill Amount</th>
                  <th>Received Bill Amount</th>
                  <th>Balance Bill Amount</th>

                </tr>
              </thead>
              <tbody>
                {currentItems.map((employee, index) => (
                  <tr key={employee.id}>
                    <th >{index + 1}</th>
                    <td>{employee.est_name}</td>
                    <td>{employee.est_epf_id}</td>
                    <td>{employee.dsc_status ? "Active" : "InActive"}</td>
                    <td >{moment(employee.dsc_date).format('YYYY-MM-DD')}</td>
                    <td>{employee.empcount}</td>
                    <td>{employee.lastmonthemp}</td>
                    <td>{employee.totalchallan}</td>
                    <td>{employee.totalbill}</td>
                    <td>{employee.recievedamount}</td>
                    <td>{employee.balanceamount}</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="pagination">
            <button className="btn btn-primary rounded-4"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                style={{ margin: '0 2px', backgroundColor: currentPage === index + 1 ? '#1e60aa' : 'white', border: '0px' }}
              >
                {index + 1}
              </button>
            ))}
            <button className="btn btn-primary rounded-4"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>

          <div className="modal fade" id="importReturn" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Uplaod FIles</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="col-md-12">
                    <input className="form-control" type="file" id="formFile" accept=".xlsx, .xls" onChange={handleFileChange} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" onClick={uplaodBulkEmployer}>Upload</button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal fade bd-example-modal-xl" tabIndex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <form>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title text-left">
                        Employer Registration
                      </h5>

                      <div className="row">
                        <div className="form-group col-sm  ">
                          <label htmlFor="inputText">EPF No</label>
                          <input type="text" className="form-control rounded-4" required onChange={(e) => setEstEpfId(e.target.value)} value={EstEpfId} />
                        </div>
                        <div className="form-group col-sm">
                          <label htmlFor="inputEmail">ESIC No</label>
                          <input type="text" className="form-control rounded-4" required onChange={(e) => setEstEsicId(e.target.value)} value={EstEsicId} />
                        </div>

                        <div className="form-group col-sm">
                          <label htmlFor="inputEmail">Establishment Type</label>
                          <input type="text" className="form-control rounded-4" required onChange={(e) => setEstType(e.target.value)} value={EstType} />
                        </div>
                        <div className="form-group col-sm">
                          <label htmlFor="inputText">Date of Coverage</label>
                          <input type="date" className="form-control rounded-4" required onChange={(e) => setDoc(e.target.value)} value={estDoc} />
                        </div>
                      </div>

                      <div className="row">
                        <div className="form-group col-md">
                          <label htmlFor="inputPassword">Establishment Name</label>
                          <input type="text" className="form-control rounded-4" required onChange={(e) => setEstName(e.target.value)} value={EstName} />
                        </div>
                        <div className="form-group col-md">
                          <label htmlFor="inputEmail">Employer Namee</label>
                          <input type="text" className="form-control rounded-4" required onChange={(e) => setErName(e.target.value)} value={ErName} />
                        </div>
                        <div className="form-group col-md">
                          <label htmlFor="inputEmail">Designation</label>
                          <input type="text" className="form-control rounded-4" required onChange={(e) => set_designation(e.target.value)} value={ErDesignation} />
                        </div>
                        <div className="form-group col-md">
                          <label htmlFor="inputEmail">City</label>
                          <input type="text" className="form-control rounded-4" required onChange={(e) => setCity(e.target.value)} value={city} />
                        </div>
                      </div>

                      <div className="row">
                        <div className="form-group col-md">
                          <label htmlFor="inputText">Email id</label>
                          <input type="email" className="form-control rounded-4" required onChange={(e) => setEmail(e.target.value)} value={Email} />
                        </div>
                        <div className="form-group col-md">
                          <label htmlFor="inputPassword">Contact Number</label>
                          <input type="text" className="form-control rounded-4" required onChange={(e) => setMobile(e.target.value)} value={Mobile} />
                        </div>
                        <div className="form-group col-md">
                          <label htmlFor="inputPassword">Address</label>
                          <input type="text" className="form-control rounded-4" required onChange={(e) => setAddress(e.target.value)} value={Address} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-body">
                      <div className='row'>
                        <div className="form-group col-sm">
                          <h5 className="card-title text-left">
                            Authorized Digital Signature
                          </h5>
                        </div>
                        <div className="form-group col-sm-1">
                          <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckPf" checked={checkedDSC} onChange={handleChange} />
                          </div>
                        </div>
                      </div>
                      {checkedDSC && (
                        <div className="row">

                          <div className="form-group col-sm">
                            <label htmlFor="inputText">Name On DSC </label>
                            <input type="text" className="form-control rounded-4" required onChange={(e) => set_dsc_on_name(e.target.value)} value={dsc_on_name} />
                          </div>
                          <div className="form-group col-sm">
                            <label htmlFor="inputEmail">Designation</label>
                            <input type="text" className="form-control rounded-4" required onChange={(e) => set_dsc_designation(e.target.value)} value={dsc_designation} />
                          </div>
                          <div className="form-group col-sm">
                            <label htmlFor="inputEmail">Expire Date</label>
                            <input type="date" className="form-control rounded-4" required onChange={(e) => set_dsc_expire(e.target.value)} value={dsc_expire} />
                          </div>
                          <div className="form-group col-sm">
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
                        <div className="form-group col-sm">
                          <label htmlFor="inputText">Rate</label>
                          <input type="text" className="form-control rounded-4" required onChange={(e) => setRate(e.target.value)} value={rate} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm">
                      {!isUpdate ? (
                        <button type="button" className="btn btn-outline-secondary rounded-4" onClick={saveErDetails}>
                          Save
                        </button>
                      ) : (
                        <button type="button" className="btn btn-outline-secondary rounded-4" onClick={updateErDetails}>
                          Update
                        </button>
                      )}
                    </div>
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

export default master;
