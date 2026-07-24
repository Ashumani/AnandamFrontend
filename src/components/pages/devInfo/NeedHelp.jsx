import React from "react";

const NeedHelp = () => {
  return (

     <div className="main-container">
            <div className='main-title'>
                <h3>CREATE BILL</h3>
            </div>
            <section className="section">
 <div className="container py-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">
            <i className="bi bi-life-preserver me-2"></i>
            Need Help?
          </h3>
        </div>

        <div className="card-body">

          <div className="alert alert-info">
            <strong>We're here to help!</strong>
            <br />
            If you encounter any bugs, need assistance, or would like to request
            a new feature, please contact the development team using the details
            below.
          </div>

          <div className="row">

            <div className="col-md-6 mb-4">
              <div className="card h-100 border-primary">
                <div className="card-body">

                  <h5 className="card-title">
                    <i className="bi bi-person-circle me-2"></i>
                    Developer Contact
                  </h5>

                  <hr />

                  <p>
                    <strong>Name:</strong> Manish Kirnapure
                  </p>

                  <p>
                    <strong>Designation:</strong> Full Stack Developer
                  </p>

                  <p>
                    <strong>Email:</strong>
                    <br />
                    developer4ashish@gmail.com
                  </p>

                  <p>
                    <strong>Mobile:</strong>
                    <br />
                    +91 8793143976
                  </p>

                  <p>
                    <strong>Working Hours:</strong>
                    <br />
                    Monday - Friday
                    <br />
                    10:00 AM - 6:00 PM
                  </p>

                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card h-100 border-success">
                <div className="card-body">

                  <h5 className="card-title">
                    <i className="bi bi-lightbulb me-2"></i>
                    When to Contact
                  </h5>

                  <hr />

                  <ul className="list-group list-group-flush">

                    <li className="list-group-item">
                      🐞 Report application bugs
                    </li>

                    <li className="list-group-item">
                      💡 Request new features
                    </li>

                    <li className="list-group-item">
                      🔒 Login or access issues
                    </li>

                    <li className="list-group-item">
                      ⚙ Technical support
                    </li>

                    <li className="list-group-item">
                      📈 Suggestions for improvement
                    </li>

                  </ul>

                </div>
              </div>
            </div>

          </div>

          <div className="mt-4">
            <div className="card bg-light">
              <div className="card-body">

                <h5>
                  <i className="bi bi-info-circle me-2"></i>
                  Before Reporting an Issue
                </h5>

                <ul>
                  <li>Describe the problem clearly.</li>
                  <li>Mention the page or module where it occurred.</li>
                  <li>Attach a screenshot if possible.</li>
                  <li>Explain the expected behavior.</li>
                  <li>Include the time when the issue occurred.</li>
                </ul>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
            </section>
            </div>
   
  );
};

export default NeedHelp;