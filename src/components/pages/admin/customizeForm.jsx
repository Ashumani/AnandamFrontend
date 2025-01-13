/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useEffect } from "react"
import { getEstId, getErId } from "../Auth/authToken";
import { addBlogs, addCustomFields, getAllBlogs, getAllCustomFields, getCustomFields } from "../../api/services";
import Swal from 'sweetalert2';
import moment from 'moment-timezone';
import React, { useRef } from 'react';
const customiza = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const itemsPerPage = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, set_totalPages] = useState(1);

  // Get current items based on the current page
  const [currentItems, set_currentItems] = useState([]);
  const modalRef = useRef(null);


  const [form_type, set_form_type] = useState('');
  const [field_name, set_field_name] = useState('');
  const [field_id, set_field_id] = useState('');
  const [field_type, set_field_type] = useState('');
  const [field_position, set_field_position] = useState('');
  const [field_status, set_field_status] = useState('');
  const [field_class, set_field_class] = useState('');
  // const [employeeData, setEmployeeData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await getAll(1);
      await getFields();
    };

    fetchData();

  }, []);

  const getAll = async (pageNumber) => {
    // api call
    const params = {
      "limit": itemsPerPage,
      "offset": pageNumber
    }
    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await getAllCustomFields(params);
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

  const getFields = async () => {
    // api call
    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await getCustomFields('salary');
  

    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
      setLoading(false);
    }
  };

  const addCUstomFields = async () => {
    // api call

    try {

      let params = {
        form_type: form_type,
        field_name: field_name,
        field_id: field_id,
        field_type: field_type,
        field_position: field_position,
        field_status: field_status,
        field_class: field_class
      }

     
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await addCustomFields(params);
      if (response.status == true) {

        Swal.fire({
          title: response.message,
          icon: 'success',
          confirmButtonText: 'Okay'
        });

        closeModal()
        await getAll(1);

      } else {
        Swal.fire({
          title: response.message,
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      }


    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
      setLoading(false);
    }
  };

  const getBlog = async (pageNumber) => {
    // api call
    const params = {
      "limit": itemsPerPage,
      "offset": pageNumber
    }
    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await getAllBlogs(params);
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getAll(pageNumber);

  };

  const closeModal = () => {
    var modal = document.getElementById('employerModel');
    var bootstrapModal = bootstrap.Modal.getInstance(modal);
    bootstrapModal.hide();
  };

  const openModal = () => {
    var modal = document.getElementById('employerModel');
    var bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
  };

  return (
    <div>

      <div className="main-container">
        <div className='main-title'>
          <h3>Blogs</h3>
        </div>
        <section className="section">
          <br />
          <div className="row">
            <div className="col-sm-2">
              <button
                type="file"
                className="btn btn-outline-primary btn-block rounded-4" onClick={openModal}> Add Fields</button>
            </div>

          </div>

          <div className="table-responsive mt-2">
            <table className="table table-striped table-sm table-hover text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Form Type</th>
                  <th>id</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>class</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((blog, index) => (
                  <tr key={blog.id}>
                    <th >{index + 1}</th>
                    <td>{blog.form_type}</td>
                    <td>{blog.field_id}</td>
                    <td>{blog.field_name}</td>
                    <td>{blog.field_type}</td>
                    <td>{blog.field_position}</td>
                    <td>{blog.field_status}</td>
                    <td>{blog.field_class}</td>
                    {/* <td>{blog.blog_image}</td>
                    <td >{moment(blog.date).format('YYYY-MM-DD')}</td>
                    <td>{blog.status ? "Active" : "InActive"}</td> */}
                    <td>
                      <div className="d-flex align-items-center">
                        <button className="btn btn-light" onClick={() => { getBlog(blog.id) }}>
                          <i className="bi bi-eye text-info"></i>
                        </button>
                        <button className="btn btn-light mx-1" onClick={() => { getBlog(blog.id) }}>
                          <i className="bi bi-pencil-fill text-info"></i>
                        </button>
                        <button className="btn btn-light" disabled>
                          <i className="bi bi-trash text-danger"></i>
                        </button>
                      </div>
                    </td>
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


          <div className="modal fade bd-example-modal-xl" id="employerModel" tabIndex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <form>
                  <div className="modal-header">
                    <h5 className="modal-title">Add Blog</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body" style={{ color: 'black' }}>
                    <div className="row mb-3">
                      <div className="form-group col-sm">
                        <label htmlFor="epfNo" > Field Name</label>
                        <input type="text" className="form-control rounded-4" id="epfNo" required onChange={(e) => set_field_name(e.target.value)} value={field_name} />
                      </div>
                      <div className="form-group col-sm">
                        <label htmlFor="esicNo">Field Id</label>
                        <input type="text" className="form-control rounded-4" id="esicNo" required onChange={(e) => set_field_id(e.target.value)} value={field_id} />
                      </div>
                      <div className="form-group col-sm">
                        <label htmlFor="estType">Field Type</label>
                        <input type="text" className="form-control rounded-4" id="estType" required onChange={(e) => set_field_type(e.target.value)} value={field_type} />
                      </div>

                    </div>

                    <div className="row mb-3">
                      <div className="form-group col-md">
                        <label htmlFor="estName">Field Position</label>
                        <input type="text" className="form-control rounded-4" id="estName" required onChange={(e) => set_field_position(e.target.value)} value={field_position} />
                      </div>
                      <div className="form-group col-md">
                        <label htmlFor="employerName">Field Status</label>
                        <input type="text" className="form-control rounded-4" id="employerName" required onChange={(e) => set_field_status(e.target.value)} value={field_status} />
                      </div>
                      <div className="form-group col-sm">
                        <label htmlFor="coverageDate">Field Class</label>
                        <input type="text" className="form-control rounded-4" id="coverageDate" required onChange={(e) => set_field_class(e.target.value)} value={field_class} />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="form-group col-md">
                        <label htmlFor="estName">Form Type</label>
                        <input type="text" className="form-control rounded-4" id="estName" required onChange={(e) => set_form_type(e.target.value)} value={form_type} />
                      </div>
                      {/* <div className="form-group col-md">
                        <label htmlFor="employerName">Produce By Image</label>
                        <input type="text" className="form-control rounded-4" id="employerName" required onChange={(e) => set_produce_by_image(e.target.value)} value={produce_by_image} />
                      </div>
                      <div className="form-group col-sm">
                        <label htmlFor="coverageDate">Date</label>
                        <input type="date" className="form-control rounded-4" id="coverageDate" required onChange={(e) => set_date(e.target.value)} value={date} />
                      </div> */}
                    </div>


                  </div>
                  <div className="modal-footer">
                    {!isUpdate ? (
                      <button type="button" className="btn btn-outline-primary rounded-4" onClick={addCUstomFields}>
                        Save
                      </button>
                    ) : (
                      <button type="button" className="btn btn-outline-primary rounded-4">
                        Update
                      </button>
                    )}

                    <button type="button" className="btn btn-outline-danger rounded-4" onClick={closeModal}>
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

export default customiza;
