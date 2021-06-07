import formatMoney from '../../../Utils/formatMoney'

const YearlyTransactionPage = ({ active, transactions, selectDate }) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const CreateYearCell = ({ month, income, expense }) => {
        return (
            <tr>
                <td className="text-bold-500 year-cell">
                    <a role="button" className="btn btn-outline-primary">{month}</a>
                </td>
                <td className="text-end year-cell text-info" >{income}</td>
                <td className="text-end year-cell text-danger" >{expense}</td>
            </tr>
        )
    }
    const getTransactionByMonth = (month) => {
        const filteredTransaction = transactions.filter(record => new Date(record.date_created).getMonth() == month)
        filteredTransaction.sort((a, b) => new Date(b.date_created) - new Date(a.date_created))
        return filteredTransaction
    }
    const CreateTransaction = ({ month }) => {
        const transaction = getTransactionByMonth(month)
        let totalExpense = 0
        let totalIncome = 0
        transaction.filter(record => record.expense_type_id == '2').forEach(tran => totalExpense += parseInt(tran.money_amount))
        transaction.filter(record => record.expense_type_id == '1').forEach(tran => totalIncome += parseInt(tran.money_amount))
        return (
            <CreateYearCell month={monthNames[month]} income={formatMoney(totalIncome)} expense={formatMoney(totalExpense)} />
        )
    }
    return (
        <div className={`"tab-pane fade ${active ? "active show" : ""}`}>
            <table className="table table-lg">
                <tbody>
                    {
                        monthNames.map((month, index) => (
                            <CreateTransaction key={`record-${month}`} month={index} />
                        ))
                    }

                </tbody>
            </table>


        </div>
    )
}

export default YearlyTransactionPage
