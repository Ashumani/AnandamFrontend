/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useEffect } from "react"
import { getEstId, getErId } from "../Auth/authToken";
import { addBlogs, getAllBlogs } from "../../api/services";
import Swal from 'sweetalert2';
import moment from 'moment-timezone';
import React, { useRef } from 'react';
const superUser = () => {
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





        </section>
      </div>
    </div>
  );
};

export default superUser;
