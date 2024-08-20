import { getEmployer } from '../../api/services';
import { useState, useEffect } from "react"
import { getEstId } from "../Auth/authToken";

const ecr = () => {

    const [est_name, setEstName] = useState('');
    const [est_id, setEstId] = useState('');
    const [er_name, setErName] = useState('');
    const [est_doc, setDOC] = useState('');
    const [est_address, setAddress] = useState('');
    const [bill_number, setBillNumber] = useState('');

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const fetchEmployer = async () => {
        const params = {
            "est_epf_id": est_id
        }
        try {
            // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
            const response = await getEmployer(params);
            setEstName(response.data.est_name)
            setErName(response.data.er_name)
            //   setEmail(response.data.er_email_id)
            //   setMobile(response.data.er_mobile_number)
            setAddress(response.data.est_address)
            setDOC(response.data.est_doc)

        } catch (error) {
            console.error('Error fetching data:', error);
            // setError('Error fetching data. Please try again.');

        }
    };
    return (

        <div className="main-container">
            <div className='main-title'>
                <h3>CREATE BILL</h3>
            </div>
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-center">Create Bill</h5>

                                <form>
                                    <div className="row">
                                        <div className="col-sm">
                                            <label htmlFor="inputText" >Est Id</label>
                                            <input type="text" className="form-control"  onChange={(e) => setEstId(e.target.value)} value={est_id} />

                                        </div>
                                        <div className="col-sm">
                                            <label htmlFor="inputText" >Bill Number</label>
                                            <input type="text" className="form-control"  onChange={(e) => setBillNumber(e.target.value)} value={bill_number} />

                                        </div>
                                        <div className="col-sm-2">
                                            <button type="button" className="btn btn-outline-primary btn-block" style={{ "margin": "30px 10px 10px 10px" }} onClick={fetchEmployer}>Get Details</button>
                                        </div>
                                    </div>
                                </form>

                                <div className="row">
                                    <div className="col-sm">
                                        <label htmlFor="inputText" >Company Name</label>
                                        <input type="text" className="form-control" required onChange={(e) => setEstName(e.target.value)} value={est_name} />
                                    </div>
                                    <div className="col-sm">
                                        <label htmlFor="inputText" >Employer Name</label>
                                        <input type="text" className="form-control" required onChange={(e) => setErName(e.target.value)} value={er_name} />
                                    </div>
                                    <div className="col-sm">
                                        <label htmlFor="inputText" >Date Of Coverage</label>
                                        <input type="text" className="form-control" required onChange={(e) => setDOC(e.target.value)} value={est_doc} />
                                    </div>
                                    <div className="col-sm">
                                        <label htmlFor="inputText" >Address</label>
                                        <input type="text" className="form-control" required onChange={(e) => setAddress(e.target.value)} value={est_address} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm">
                                        <label htmlFor="inputText" >From</label>
                                        <input type="date" className="form-control" required onChange={(e) => setFromDate(e.target.value)} value={fromDate} />
                                    </div>
                                    <div className="col-sm">
                                        <label htmlFor="inputText" >To</label>
                                        <input type="date" className="form-control" required onChange={(e) => setToDate(e.target.value)} value={toDate} />
                                    </div>
                                    <div className="col-sm-2">
                                        <button type="button" className="btn btn-outline-primary btn-block" style={{ "margin": "30px 5px 10px 10px" }} data-toggle="modal" data-target="#exampleModal">Next</button>
                                    </div>
                                </div>

                                {/* Model */}
                                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                ...
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary">Save changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Perticular</th>
                                            <th scope="col">Rate</th>
                                            <th scope="col">Ammount</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>EPF Challan For priod Mar-2023 To Apr-2024</td>
                                            <td>1000</td>
                                            <td>12000</td>

                                        </tr>

                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th id="total" colSpan="3">Total :</th>
                                            <td>12000</td>
                                        </tr>
                                    </tfoot>
                                </table>
                                <div className="row">
                                    <div className="col-sm-2">
                                        <button type="button" className="btn btn-outline-primary btn-block" style={{ "margin": "2px 5px 10px 10px" }} data-toggle="modal" data-target="#exampleModal">Save</button>
                                    </div>
                                    <div className="col-sm-2">
                                        <button type="button" className="btn btn-outline-primary btn-block" style={{ "margin": "2px 5px 10px 10px" }} data-toggle="modal" data-target="#exampleModal">Make PDF</button>
                                    </div>
                                    <div className="col-sm-2">
                                        <button type="button" className="btn btn-outline-primary btn-block" style={{ "margin": "2px 5px 10px 10px" }} data-toggle="modal" data-target="#exampleModal">Email PDF</button>
                                    </div>
                                    <div className="col-sm-2">
                                        <button type="button" className="btn btn-outline-primary btn-block" style={{ "margin": "2px 5px 10px 10px" }} data-toggle="modal" data-target="#exampleModal">Print PDF</button>
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

export default ecr;
