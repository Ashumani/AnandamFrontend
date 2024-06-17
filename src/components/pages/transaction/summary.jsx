
import Header from "../../header";
import Sidebar from "../../sidebar";

const summary = () => {
  return (
    <div>
      <Header/>
      <Sidebar/>
      <div className="main-container">
        <div className='main-title'>
          <h3>SUMMARY</h3>
        </div>
        <section className="section">
         Summary
        </section>
      </div>
    </div>
  );
};

export default summary;
