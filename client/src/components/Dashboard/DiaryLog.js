import { Fragment } from "react";

const formatter = new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' })

const formatMonthDay = (value) => {
  if (value < 10) {
    return `0${value}`
  } else {
    return value
  }
}

function LogRecord({ index, record }) {
  const expenseTypes = ["income", "expense", "transfer"];

  return (
    <Fragment>
      <div className={`card-body ${index % 2 == 1 ? "bg-record-light" : ""}`} style={{ padding: "0.5rem" }}>
        <div className="row">
          <div className="col-2">
            <p
              style={{ marginBottom: 0, height: "100%" }}
              className="text-center pt-2"
            >
              <span className="text-info">{record.category_name}</span>
            </p>
          </div>
          <div className="col-7">
            <p style={{ marginBottom: 0 }}>{record.note}</p>
            <span className="badge badge-secondary">{record.method_name}</span>
          </div>
          <div className="col-3">
            <p
              className={`text-right text-money-${expenseTypes[record.expense_type_id - 1]
                }`}
            >
              {formatter.format(record.money_amount)}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
function LogDate({ log }) {
  const dateName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(log.records[0].date_created);

  let totalExpense = 0
  let totalIncome = 0

  log.records.forEach(record => {
    totalExpense += record.expense_type_id == 2 ? parseInt(record.money_amount) : 0
    totalIncome += record.expense_type_id == 1 ? parseInt(record.money_amount) : 0
  })

  return (
    <div
      className="card-header bg-new-secondary text-white"
      style={{ padding: "0.1rem 0.5rem 0.1rem 0.5rem" }}
    >
      <div className="row">
        <div className="col-2">
          <h4
            style={{ marginBottom: 0, height: "100%" }}
            className="text-center pt-2 text-white font-weight-bold"
          >
            <u>{formatMonthDay(date.getDate())}</u>
          </h4>
        </div>
        <div className="col-4">
          <p style={{ marginBottom: 0 }}>
            {formatMonthDay(date.getMonth())}.{date.getFullYear()}
          </p>
          <span className="badge badge-light">{dateName[date.getDay()]}</span>
        </div>
        <div className="col-3">
          <p className="text-right text-info pt-2">
            {formatter.format(totalIncome)}
          </p>
        </div>
        <div className="col-3">
          <p className="text-right text-new-danger pt-2">
            {formatter.format(totalExpense)}
          </p>
        </div>
      </div>
    </div>
  );
}
function CardLog({ log }) {
  return (
    <div className="card mb-2">
      <LogDate log={log} />
      {log.records.map((record, index) => (
        <LogRecord index={index} record={record} />
      ))}
    </div>
  );
}
function DayLogRecord({ logs }) {
  return logs.map((lg) => <CardLog log={lg} />);
}
function DiaryLog({ logs }) {

  const groupByDay = (logs) => {
    const map = new Map();
    logs.forEach((log) => {
      const logDay = new Date(log.date_created).getDay();
      const collection = map.get(logDay);
      if (!collection) {
        map.set(logDay, [log]);
      } else {
        collection.push(log);
      }
    });
    const records = [];
    for (let [key, value] of map) {
      records.push({ day: key, records: value });
    }
    return records;
  };

  const logMap = groupByDay(logs);

  return (
    <Fragment>

      <div className="row">
        <div className="col-lg-12">
          {logMap.map((lg) => (
            <CardLog log={lg} />
          ))}
        </div>
      </div>
    </Fragment>
  );
}
export default DiaryLog;
