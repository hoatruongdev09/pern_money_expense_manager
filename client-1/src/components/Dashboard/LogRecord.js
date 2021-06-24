import { Fragment } from "react";

const formatter = new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' })

function LogRecord({ index, record, onSelectRecord }) {
    const expenseTypes = ["income", "expense", "transfer"];

    const onClickRecord = (e) => {
        e.preventDefault()
        onSelectRecord(record)
    }

    return (
        <Fragment>
            <div className={`card-body ${index % 2 == 1 ? "bg-record-light" : ""}`} style={{ padding: "0.5rem" }}>
                <div className="row">
                    <div className="col-4">
                        <p
                            style={{ marginBottom: 0, height: "100%" }}
                            className="text-left pt-2"
                        >
                            <span className="text-info">{record.category_name.length >= 15 ? `${record.category_name.substring(0, 10)}...` : record.category_name}</span>
                        </p>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-8">
                                <p style={{ marginBottom: 0 }}>{record.note}</p>
                                <span className="badge badge-secondary">{record.method_name}</span>
                            </div>
                            <div className="col-4">
                                <div className="row">
                                    <p
                                        className={`w-100 text-right text-money-${expenseTypes[record.expense_type_id - 1]}`}
                                    >
                                        {formatter.format(record.money_amount)}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-2 text-center">
                        <button onClick={e => onClickRecord(e)} data-toggle="modal" data-target="#modalLogDetail" className="btn px-0 mx-0"><i className="fa fa-info-circle" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default LogRecord