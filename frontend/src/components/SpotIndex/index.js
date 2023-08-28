// import { Link } from "react-router-dom";
// import ReportIndexItem from "./ReportIndexItem";
// import { useSelector, useDispatch } from "react-redux";
// import { resetReport } from "../store/reportReducer";

// const SpotIndex = () => {
//    const reports = useSelector((state) => Object.values(state.reports));

//    const dispatch = useDispatch();

//    const resetData = (e) => {
//       e.preventDefault();

//       dispatch(resetReport());
//    };

//    return (
//       <section>
//          <ul>
//             {reports.map((report) => (
//                <ReportIndexItem report={report} key={report.id} />
//             ))}
//          </ul>
//          <Link to="/reports/new">New Report</Link>
//          <button onClick={resetData}>Reset Data</button>
//       </section>
//    );
// };

// export default ReportIndex;
