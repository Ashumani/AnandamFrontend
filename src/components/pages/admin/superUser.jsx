/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useEffect } from "react"
import { getEstId, getErId } from "../Auth/authToken";
import { deleteRecords } from "../../api/services";
import Swal from 'sweetalert2';
import moment from 'moment-timezone';
import React, { useRef } from 'react';
const superUser = () => {

  const [isCheckedmonthly, set_isCheckedmonthly] = useState(false)
  const [isCheckedesic, set_isCheckedesic] = useState(false)
  const [isCheckedsummary, set_isCheckedsummary] = useState(false)
  const [isCheckedsalary, set_isCheckedsalary] = useState(false)
  const [isCheckedemployee, set_isCheckedemployee] = useState(false)
  const [isCheckedemployer, set_isCheckedemployer] = useState(false)

  const deleterecords = async () => {
    // api call
    const params = {
      "monthly": isCheckedmonthly,
      "esic": isCheckedesic,
      "summary": isCheckedsummary,
      "salary": isCheckedsalary,
      "employee": isCheckedemployee,
      "employer": isCheckedemployer,
    }
    try {
      const response = await deleteRecords(params);
      if (response.status == true) {
        Swal.fire({
          title: response.message + " : " + response.data,
          icon: 'success',
          confirmButtonText: 'Okay'
        });

        set_isCheckedmonthly(false)
        set_isCheckedesic(false)
        set_isCheckedsummary(false)
        set_isCheckedsalary(false)
        set_isCheckedemployee(false)
        set_isCheckedemployer(false)
      } else {
        Swal.fire({
          title: response.message,
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      }


    } catch (error) {
      console.error('Error fetching data:', error);

    }

  };

  const handleCheckboxChange = (event) => {
    if (event.target.name === 'monthly') {
      set_isCheckedmonthly(event.target.checked)
    } else if (event.target.name === 'esic') {
      set_isCheckedesic(event.target.checked)
    } else if (event.target.name === 'summary') {
      set_isCheckedsummary(event.target.checked)
    } else if (event.target.name === 'salary') {
      set_isCheckedsalary(event.target.checked)
    } else if (event.target.name === 'employee') {
      set_isCheckedemployee(event.target.checked)
    } else if (event.target.name === 'employerr') {
      set_isCheckedemployer(event.target.checked)
    }


  };


  return (
    <div>

      <div className="main-container">
        <div className='main-title mt-4'>
          <h3 className='mt-4'> Delete Records</h3>
        </div>
        <section className="section">
          <br />

          <div className="row mt-4">
            <div className="col-sm-1">
              <input className="form-check-input" type="checkbox" id="monthly" name="monthly" checked={isCheckedmonthly} onChange={handleCheckboxChange} />
              <label className="form-check-label text-dark">Monthly</label>
            </div>
            <div className="col-sm-1">
              <input className="form-check-input" type="checkbox" id="esic" name="esic" checked={isCheckedesic} onChange={handleCheckboxChange} />
              <label className="form-check-label text-dark">Esic</label>
            </div>
            <div className="col-sm-1">
              <input className="form-check-input" type="checkbox" id="summary" name="summary" checked={isCheckedsummary} onChange={handleCheckboxChange} />
              <label className="form-check-label text-dark">Summary</label>
            </div>
            <div className="col-sm-1">
              <input className="form-check-input" type="checkbox" id="salary" name="salary" checked={isCheckedsalary} onChange={handleCheckboxChange} />
              <label className="form-check-label text-dark">salary</label>
            </div>
            <div className="col-sm-1">
              <input className="form-check-input" type="checkbox" id="employee" name="employee" checked={isCheckedemployee} onChange={handleCheckboxChange} />
              <label className="form-check-label text-dark">Employee</label>
            </div>
            <div className="col-sm-1">
              <input className="form-check-input" type="checkbox" id="employer" name="employer" checked={isCheckedemployer} onChange={handleCheckboxChange} />
              <label className="form-check-label text-dark">Employer</label>
            </div>
            <div className="col-sm-2">
              <button
                type="file"
                className="btn btn-outline-danger  rounded-4" onClick={deleterecords} > Delete</button>
            </div>

          </div>





        </section>
      </div>
    </div>
  );
};

export default superUser;
