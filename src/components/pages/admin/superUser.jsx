/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useEffect } from "react"
import { getEstId, getErId } from "../Auth/authToken";
import { deleteRecords, fetchAllEmployer } from "../../api/services";
import Swal from 'sweetalert2';
import moment from 'moment-timezone';
import React, { useRef } from 'react';
import Select from 'react-select';
const superUser = () => {

  const [isCheckedmonthly, set_isCheckedmonthly] = useState(false)
  const [isCheckedesic, set_isCheckedesic] = useState(false)
  const [isCheckedsummary, set_isCheckedsummary] = useState(false)
  const [isCheckedsalary, set_isCheckedsalary] = useState(false)
  const [isCheckedemployee, set_isCheckedemployee] = useState(false)
  const [isCheckedemployer, set_isCheckedemployer] = useState(false)
  const [isCheckedbill, set_isCheckedbill] = useState(false)
  const [selectedId, setSelectedId] = useState('');
  const [items, setItems] = useState([]);
  const options = [
    { value: 'All', label: 'All' },
    ...items.map((item) => ({
      value: item.est_epf_id,
      label: `${item.est_name} - ${item.est_epf_id}`,
    })),
  ];

  useEffect(() => {
    const fetchData = async () => {

      const response = await fetchAllEmployer();
      setItems(response.data)
    };

    fetchData();

  }, []);
  const deleterecords = async () => {
    // api call
    const params = {
      "monthly": isCheckedmonthly,
      "esic": isCheckedesic,
      "summary": isCheckedsummary,
      "salary": isCheckedsalary,
      "employee": isCheckedemployee,
      "employer": isCheckedemployer,
      "bill": isCheckedbill,
      "id": selectedId
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

    const handleChange = (e) => {
      
      const value = e.value;
      
      setSelectedId(value);
 
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
    } else if (event.target.name === 'employer') {
      set_isCheckedemployer(event.target.checked)
    }
    else if (event.target.name === 'bill') {
      set_isCheckedbill(event.target.checked)
    }


  };


  return (
    <div>

      <div className="main-container" style={{ "marginTop": "50px", "fontSize": "15px", "color": "black" }}>
        <div className='main-title mt-4'>
          <h3 className='mt-4'> Delete Records</h3>
        </div>
        <section className="section">
          <br />

           <div className="card-body">

            <div className="row">

                {[
                    { id: "monthly", label: "Monthly", checked: isCheckedmonthly },
                    { id: "esic", label: "ESIC", checked: isCheckedesic },
                    { id: "summary", label: "Summary", checked: isCheckedsummary },
                    { id: "salary", label: "Salary", checked: isCheckedsalary },
                    { id: "employee", label: "Employee", checked: isCheckedemployee },
                    { id: "employer", label: "Employer", checked: isCheckedemployer },
                    { id: "bill", label: "Bill", checked: isCheckedbill },
                ].map((item) => (

                    <div className="col-md-3 mb-3" key={item.id}>

                        <div className="card h-80 border-danger">

                            <div className="card-body">

                                <div className="custom-control custom-checkbox">

                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id={item.id}
                                        name={item.id}
                                        checked={item.checked}
                                        onChange={handleCheckboxChange}
                                    />

                                    <label
                                        className="custom-control-label"
                                        htmlFor={item.id}
                                    >
                                        <strong>{item.label}</strong>
                                    </label>

                                </div>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

            <hr />

            <div className="row align-items-end">

                <div className="col-md-8">

                    <label>
                        <strong>Select Employer</strong>
                    </label>

                    <Select
                        options={options}
                        value={options.find(
                            (opt) => opt.value === selectedId
                        )}
                        onChange={handleChange}
                        isSearchable
                        classNamePrefix="react-select"
                    />

                </div>

                <div className="col-md-4">

                    <button
                        className="btn btn-danger btn-lg btn-block"
                        onClick={deleterecords}
                    >
                        <i className="fa fa-trash mr-2"></i>
                        Delete Selected Records
                    </button>

                </div>

            </div>

        </div>






        </section>
      </div>
    </div>
  );
};

export default superUser;
