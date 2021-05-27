const MonthlyTransactionPage = ({ active }) => {
    return (
        <div className={`"tab-pane fade ${active ? "active show" : ""}`}>
            <p>Monthly transactions</p>
        </div>
    )
}

export default MonthlyTransactionPage
