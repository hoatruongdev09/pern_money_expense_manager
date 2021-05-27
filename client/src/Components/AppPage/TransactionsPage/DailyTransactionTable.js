const DailyTransactionTable = ({ active }) => {
    return (
        <div className={`"tab-pane fade table-responsive px-2 ${active ? "active show" : ""}`}>
            <table className="table table-hover mb-0">
                <thead>
                    <tr>
                        <th>NOTE</th>
                        <th style={{ textAlign: 'right' }}>MONEY AMOUNT</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="table-info">
                        <td>
                            <div className="text-bold-500 float-left">Michael Right</div>
                            <span class="badge bg-info text-dark">Income</span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                            <div> $500</div>
                            <span class="badge bg-secondary">Cash</span>
                        </td>
                    </tr>
                    <tr className="table-danger">
                        <td>
                            <div className="text-bold-500 float-left">Michael Right</div>
                            <span class="badge bg-danger text-dark">Expense</span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                            <div> $500</div>
                            <span class="badge bg-secondary">Account</span>
                        </td>
                    </tr>
                    <tr className="table-warning">
                        <td>
                            <div className="text-bold-500 float-left">Michael Right</div>
                            <span class="badge bg-warning text-dark">Transfer</span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                            <div> $500</div>
                            <span class="badge bg-secondary">Cash</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}


export default DailyTransactionTable
