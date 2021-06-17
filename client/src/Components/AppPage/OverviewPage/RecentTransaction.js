import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import formatMoney from '../../../Utils/formatMoney'

function RecentTransaction({ transactions }) {

    console.log('recent transaction: ', transactions)
    const sortedTransaction = (transactions) => {
        return transactions.sort((a, b) => new Date(b.date_created) - new Date(a.date_created))
    }
    return (
        <div class="col-sm-12 col-md-4 col-lg-4">
            <div class="card">
                <div className="card-header pb-1">
                    <h6 className="float-start">Recent transactions</h6>
                    <a href={`/dashboard/transactions?tab=monthly&time=${new Date().getMonth() + 1}-${new Date().getDate()}-${new Date().getFullYear()}`} className="btn float-end py-0 px-0"><FontAwesomeIcon icon={faPlus} size='xs' /></a>

                </div>
                <div class="card-content">
                    <div className="card-body pt-1">
                        <div class="table-responsive">
                            <table class="table table-borderless mb-0">
                                <tbody>
                                    {
                                        sortedTransaction(transactions).map((record, index) => (
                                            index < 10 ? (
                                                <tr>
                                                    <td class="text-bold-500 text-start">{record.note}</td>
                                                    <td className={`text-end ${record.expense_type_id === 1 ? 'text-info' : 'text-danger'}`}>{formatMoney(record.money_amount)}</td>
                                                </tr>) : <></>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecentTransaction;
