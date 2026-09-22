
import { useState, useEffect } from "react"
import { getEstId } from "../Auth/authToken";
import { getParameters, updateParameters } from "../../api/services";
import Swal from "sweetalert2";


const Parameters = () => {

  const [epf_ceiling, set_epf_ceiling] = useState('');
  const [edli_ceiling, set_edli_ceiling] = useState('');
  const [eps_ceiling, set_eps_ceiling] = useState('');
  const [params_id, set_params_id] = useState('');
  const [param_date, set_param_date] = useState('');



  useEffect(() => {
    const fetchData = async () => {
      await getParams()
    };

    fetchData();

  }, []);

  const handleYearChange = async (e) => {
    // setSelectedYear(e.target.value);

  };

  const getParams = async () => {
    // api call
    try {
      const parameters = await getParameters();
      set_edli_ceiling(parameters.data[0].edli_ceiling)
      set_epf_ceiling(parameters.data[0].epf_ceiling)
      set_eps_ceiling(parameters.data[0].eps_ceiling)
      set_params_id(parameters.data[0].id)
      set_param_date(parameters.data[0].date)



    } catch (error) {
      console.error('Login error ', error);
      // setError(error);
    }
  };

  const updateParams = async () => {
    // api call
    try {

      let params = {
        "epf_ceiling": epf_ceiling,
        "edli_ceiling": edli_ceiling,
        "eps_ceiling": eps_ceiling,
      }
      const parameter = await updateParameters(params_id, params);
      if (parameter.status === true) {
        Swal.fire({
          title: parameter.message,
          icon: 'success',
          confirmButtonText: 'Okay'
        });


      } else {
        // const uan = data.data.map((x) => x.ee_uan);

        Swal.fire({
          title: parameter.message,
          icon: 'error',
          confirmButtonText: 'Okay'

        });

      }


    } catch (error) {
      console.error('Login error ', error);
      // setError(error);
    }
  };
  return (
    <div>
      <main className='main-container' style={{ "marginTop": "50px", "fontSize": "15px", "color": "black" }}>
        <div className='userprofile-main-title'>
          <h3>Parameter View</h3>
        </div>
        <div className="row">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-left">
                Parameters
              </h5>
              <div className="row">
                <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                  <label htmlFor="EPF">EPF</label>
                  <input type="number" className="form-control rounded-4" required onChange={(e) => set_epf_ceiling(e.target.value)} value={epf_ceiling} />
                </div>
                <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                  <label htmlFor="EDLI">EDLI</label>
                  <input type="number" className="form-control rounded-4" required onChange={(e) => set_edli_ceiling(e.target.value)} value={edli_ceiling} />
                </div>
                <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                  <label htmlFor="EPS">EPS</label>
                  <input type="number" className="form-control rounded-4" required onChange={(e) => set_eps_ceiling(e.target.value)} value={eps_ceiling} />
                </div>
                <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                  <label htmlFor="EPS">Last Update : {param_date}</label>
                  <button className="btn btn-success w-100 rounded-4" onClick={updateParams}>
                    Save
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </main>
    </div>
  )
}

export default Parameters