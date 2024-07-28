
import Header from "../../header";
import Sidebar from "../../sidebar";
import { useState } from 'react';

const download = () => {

    const [side_items] = useState(
        [{
            "mainItem": "Form 19",
            "path": "",
            "icon": "bi bi-journal-text",
            
        },
        {
            "mainItem": "Form 13",
            "path": "",
            "icon": "bi bi-journal-text",
            
        },
        {
            "mainItem": "Form 31",
            "path": "",
            "icon": "bi bi-journal-text",
            
        },
        {
            "mainItem": "Form 10 D",
            "path": "",
            "icon": "bi bi-journal-text",
            
        },
        {
            "mainItem": "Form 19",
            "path": "",
            "icon": "bi bi-journal-text",
            
        },
        {
            "mainItem": "Form 19",
            "path": "",
            "icon": "bi bi-journal-text",
            
        },
        {
            "mainItem": "Form 19",
            "path": "",
            "icon": "bi bi-journal-text",
            
        },
        {
            "mainItem": "Form 19",
            "path": "",
            "icon": "bi bi-journal-text",
            
        },{
            "mainItem": "Form 19",
            "path": "",
            "icon": "bi bi-journal-text",
            
        },
        {
            "mainItem": "Form 13",
            "path": "",
            "icon": "bi bi-journal-text",
            
        },
        {
            "mainItem": "Form 31",
            "path": "",
            "icon": "bi bi-journal-text",
            
        },
        {
            "mainItem": "Form 10 D",
            "path": "",
            "icon": "bi bi-journal-text",
            
        },
        {
            "mainItem": "Form 19",
            "path": "",
            "icon": "bi bi-journal-text",
            
        },
        {
            "mainItem": "Form 19",
            "path": "",
            "icon": "bi bi-journal-text",
            
        },
        {
            "mainItem": "Form 19",
            "path": "",
            "icon": "bi bi-journal-text",
            
        },
        {
            "mainItem": "Form 19",
            "path": "",
            "icon": "bi bi-journal-text",
            
        }]
    );
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
                                <h5 className="card-title text-center">Download</h5>
                               
                                <div className="row">
                                {side_items.map((item, index) => (
                                    // eslint-disable-next-line react/jsx-key
                                    <div className="col-sm-2">
                                        <button type="button" className="btn btn-outline-primary btn-block" style={{ "margin": "2px 5px 10px 10px" }} data-toggle="modal" data-target="#exampleModal">{item.mainItem}</button>
                                    </div>
                    ))}
                                </div>
                                
                            </div>
                        </div>

                    </div>
                </div>

            </section>

        </div>
    );
};

export default download;
