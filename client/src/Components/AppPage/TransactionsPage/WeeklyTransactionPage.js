const WeeklyTransactionPage = ({ active }) => {
    return (
        <div className={`"tab-pane fade ${active ? "active show" : ""}`}>
            <p>Weekly transactions</p>
        </div>
    )
}

export default WeeklyTransactionPage
