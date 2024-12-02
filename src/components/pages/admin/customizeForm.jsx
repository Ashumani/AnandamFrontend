/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useEffect } from "react"
import { getEstId, getErId } from "../Auth/authToken";
import { addBlogs, getAllBlogs } from "../../api/services";
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

  const [title, set_title] = useState('');
  const [category, set_category] = useState('');
  const [subject, set_subject] = useState('');
  const [message, set_message] = useState('');
  const [link, set_link] = useState('');
  const [produce_by, set_produce_by] = useState('');
  const [produce_by_image, set_produce_by_image] = useState('');
  const [blog_image, set_blog_image] = useState('');
  const [date, set_date] = useState('');

  // const [employeeData, setEmployeeData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await getAll(1);
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

  const addBlog = async () => {
    // api call

    try {

      let params = {
        "title": title,
        "category": category,
        "subject": subject,
        "message": message,
        "link": link,
        "produce_by": produce_by,
        "produce_by_image": produce_by_image,
        "blog_image": "blog_image",
        "date": date
      }
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await addBlogs(params);
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
                className="btn btn-outline-primary btn-block rounded-4" onClick={openModal}> Add Blog</button>
            </div>

          </div>

          <div className="table-responsive mt-2">
            <table className="table table-striped table-sm table-hover text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Catgory</th>
                  <th>Title</th>
                  <th>Subject</th>
                  <th>message</th>
                  <th>link</th>
                  <th>Produce By</th>
                  <th>Produce Image</th>
                  <th>Blog Image</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((blog, index) => (
                  <tr key={blog.id}>
                    <th >{index + 1}</th>
                    <td>{blog.title}</td>
                    <td>{blog.category}</td>
                    <td>{blog.subject}</td>
                    <td>{blog.message}</td>
                    <td>{blog.link}</td>
                    <td>{blog.produce_by}</td>
                    <td>{blog.produce_by_image}</td>
                    <td>{blog.blog_image}</td>
                    <td >{moment(blog.date).format('YYYY-MM-DD')}</td>
                    <td>{blog.status ? "Active" : "InActive"}</td>
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
                        <label htmlFor="epfNo" > Category</label>
                        <input type="text" className="form-control rounded-4" id="epfNo" required onChange={(e) => set_category(e.target.value)} value={category} />
                      </div>
                      <div className="form-group col-sm">
                        <label htmlFor="esicNo">Title</label>
                        <input type="text" className="form-control rounded-4" id="esicNo" required onChange={(e) => set_title(e.target.value)} value={title} />
                      </div>
                      <div className="form-group col-sm">
                        <label htmlFor="estType">Subject</label>
                        <input type="text" className="form-control rounded-4" id="estType" required onChange={(e) => set_subject(e.target.value)} value={subject} />
                      </div>

                    </div>

                    <div className="row mb-3">
                      <div className="form-group col-md">
                        <label htmlFor="estName">Message</label>
                        <input type="text" className="form-control rounded-4" id="estName" required onChange={(e) => set_message(e.target.value)} value={message} />
                      </div>
                      <div className="form-group col-md">
                        <label htmlFor="employerName">Blog Link</label>
                        <input type="text" className="form-control rounded-4" id="employerName" required onChange={(e) => set_link(e.target.value)} value={link} />
                      </div>
                      <div className="form-group col-sm">
                        <label htmlFor="coverageDate">Blog Image</label>
                        <input type="file" className="form-control rounded-4" id="coverageDate" required onChange={(e) => set_blog_image(e.target.value)} value={blog_image} />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="form-group col-md">
                        <label htmlFor="estName">Produce By Name</label>
                        <input type="text" className="form-control rounded-4" id="estName" required onChange={(e) => set_produce_by(e.target.value)} value={produce_by_image} />
                      </div>
                      <div className="form-group col-md">
                        <label htmlFor="employerName">Produce By Image</label>
                        <input type="text" className="form-control rounded-4" id="employerName" required onChange={(e) => set_produce_by_image(e.target.value)} value={produce_by_image} />
                      </div>
                      <div className="form-group col-sm">
                        <label htmlFor="coverageDate">Date</label>
                        <input type="date" className="form-control rounded-4" id="coverageDate" required onChange={(e) => set_date(e.target.value)} value={date} />
                      </div>
                    </div>


                  </div>
                  <div className="modal-footer">
                    {!isUpdate ? (
                      <button type="button" className="btn btn-outline-primary rounded-4" onClick={addBlog}>
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
