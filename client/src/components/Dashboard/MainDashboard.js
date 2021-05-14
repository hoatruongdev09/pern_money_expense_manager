import { Fragment } from "react";

function MainDashboard() {
  return (
    <Fragment>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        <a
          href="#"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <i className="fas fa-download fa-sm text-white-50"></i> Generate
          Report
        </a>
      </div>
      <div className="row">
        <InComeTab />
        <ExpenseTab />
        <TotalTab />
      </div>
    </Fragment>
  );
}
function TotalTab() {
  return (
    <div className="col-xl-4 col-md-4 mb-4">
      <div className="card border-left-warning shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                Total
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                $40,000
              </div>
            </div>
            <div className="col-auto">
              <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function ExpenseTab() {
  return (
    <div className="col-xl-4 col-md-4 mb-4">
      <div className="card border-left-danger shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                Expense
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                $215,000
              </div>
            </div>
            <div className="col-auto">
              <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InComeTab() {
  return (
    <div className="col-xl-4 col-md-4 mb-4">
      <div className="card border-left-primary shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                Income
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                $40,000
              </div>
            </div>
            <div className="col-auto">
              <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;