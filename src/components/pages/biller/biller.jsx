
import Header from "../../header";
import Sidebar from "../../sidebar";

const ecr = () => {
   
    return (
        
        <div className="main-container">
            <div className='main-title'>
            <h3>CREATE BILL</h3>
            </div>
            <section className="section">
            <Header/>
            <Sidebar/>
                <div className="row">
                    <div className="col-lg-12">

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-center">Create Bill</h5>

                                <form>
                                    <div className="row">
                                        <div className="col mb-1">
                                            <label htmlFor="inputText" >Est Id</label>
                                            <input type="text" className="form-control" />

                                        </div>
                                        <div className="col-1 mt-4">
                                            <legend>Or</legend>
                                        </div>
                                        <div className="col mb-1">
                                            <label htmlFor="inputText" >Bill Number</label>
                                            <input type="text" className="form-control" />

                                        </div>
                                        <div className="col-sm-3 mt-4">
                                            <button type="submit" className="btn btn-outline-secondary">Get</button>
                                        </div>
                                    </div>
                                </form>

                                <div className="row">
                                    <div className="col mb-1">
                                        <label htmlFor="inputText" >Company Name</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="col mb-1">
                                        <label htmlFor="inputText" >Employer Name</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="col-2 mb-1">
                                        <label htmlFor="inputText" >Date Of Coverage</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="col mb-1">
                                        <label htmlFor="inputText" >Address</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-2 mb-1">
                                        <label htmlFor="inputText" >From</label>
                                        <input type="date" className="form-control" />
                                    </div>
                                    <div className="col-2 mb-1">
                                        <label htmlFor="inputText" >To</label>
                                        <input type="date" className="form-control" />
                                    </div>
                                    <div className="col-sm-3 mt-4">
                                        <button type="button" className="btn btn-outline-secondary" data-toggle="modal" data-target="#exampleModal">Next</button>
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
                                            <th scope="col">UAN</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Month-Year</th>
                                            <th scope="col">Gross Wages</th>
                                            <th scope="col">EPF Wages</th>
                                            <th scope="col">EDLI Wages</th>
                                            <th scope="col">EPS Wages</th>
                                            <th scope="col">EE SHARE</th>
                                            <th scope="col">ER SHARE</th>
                                            <th scope="col">EPS</th>
                                            <th scope="col">Refund</th>
                                            <th scope="col">NCP Days</th>
                                            <th scope="col">Remark</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>123456789012</td>
                                            <td>Manish</td>
                                            <td>01-2024</td>
                                            <td>15000</td>
                                            <td>10000</td>
                                            <td>10000</td>
                                            <td>10000</td>
                                            <td>1200</td>
                                            <td>367</td>
                                            <td>833</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>


                </div>

            </section>

        </div>
    );
};

export default ecr;
