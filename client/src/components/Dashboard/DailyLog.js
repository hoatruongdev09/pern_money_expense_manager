import { Fragment, useState } from "react";
import LogDetail from './LogDetail'

import LogDate from './LogDate'

import LogRecord from './LogRecord'



function CardLog({ log, onSelectRecord }) {
  return (
    <Fragment>
      <div className="card mb-2">
        <LogDate log={log} />
        {log.records.map((record, index) => (
          <LogRecord onSelectRecord={record => onSelectRecord(record)} key={`card-record-${index}`} index={index} record={record} />
        ))}
      </div>
    </Fragment>
  );
}
function Daily({ logs, onRemoveRecord, onUpdateRecord }) {

  const [currentSelectRecord, setCurrentRecord] = useState(null)


  const groupByDay = (logs) => {
    const map = new Map();
    logs.forEach((log) => {
      const logDay = new Date(log.date_created).getDate();
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
    records.sort((a, b) => { return b.day - a.day })
    return records;
  };

  const logMap = groupByDay(logs);

  const onSelectRecord = (record) => {
    setCurrentRecord(record)
  }

  return (
    <Fragment>

      <div className="row">
        <div className="col-lg-12">
          {logMap.map((lg, index) => (
            <CardLog onSelectRecord={record => onSelectRecord(record)} key={`card-log-${index}`} log={lg} />
          ))}
        </div>
      </div>
      <LogDetail onRemoveRecord={record => onRemoveRecord(record)} onUpdateRecord={record => onUpdateRecord(record)} record={currentSelectRecord} />
    </Fragment>
  );
}
export default Daily;
