import React, { useState } from 'react';
import axios from 'axios';

const testing = () => {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please choose a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  return (
    <div>
      <div className="main-container">
        <div className='main-title'>
          <h3>EPF RETURN</h3>
        </div>
        <section className="section">
        <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, idx) => (
                  <td key={idx}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
        </section>
      </div>
    </div>
  );
};

export default testing;
