import formatMoney from '../../../Utils/formatMoney'
import { Modal, Button } from 'react-bootstrap'

const MonthlyTransactionPage = ({ active, transactions, selectDate }) => {
    const startDate = new Date(selectDate.getFullYear(), selectDate.getMonth(), 1)

    const createCalendar = () => {
        const startDay = startDate.getDay()
        const calendarDate = 7 * 6;

        const dates = []
        for (let i = 0; i < startDay; i++) {
            dates.push(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - (startDay - i)))
        }
        for (let i = 0; i < calendarDate - startDay; i++) {
            dates.push(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i))
        }

        const weeks = [
            [dates[0], dates[1], dates[2], dates[3], dates[4], dates[5], dates[6]],
            [dates[7], dates[8], dates[9], dates[10], dates[11], dates[12], dates[13]],
            [dates[14], dates[15], dates[16], dates[17], dates[18], dates[19], dates[20]],
            [dates[21], dates[22], dates[23], dates[24], dates[25], dates[26], dates[27]],
            [dates[28], dates[29], dates[30], dates[31], dates[32], dates[33], dates[34]],
            [dates[35], dates[36], dates[37], dates[38], dates[39], dates[40], dates[41]],
        ]
        return weeks
    }

    const getRecordFormDate = (date) => {
        return transactions.filter(tran => new Date(tran.date_created).getDate() == date.getDate() && new Date(tran.date_created).getMonth() == date.getMonth())
    }
    const getDateTotalIncome = (date) => {
        const records = getRecordFormDate(date)
        if (records == null) { return 0 }
        let sum = 0
        records.forEach(record => {
            if (record.expense_type_id == 1) { sum += parseInt(record.money_amount) }
        })
        return sum
    }
    const getDateTotalExpense = (date) => {
        const records = getRecordFormDate(date)
        if (records == null) { return 0 }
        let sum = 0
        records.forEach(record => {
            if (record.expense_type_id == 2) { sum += parseInt(record.money_amount) }
        })
        return sum
    }
    const getDateBalance = (date) => {
        return getDateTotalIncome(date) - getDateTotalExpense(date)
    }
    const checkIfWeekHaveDayInCurrentMonth = (week) => {
        for (let i in week) {
            if (week[i].getMonth() == startDate.getMonth()) { return true }
        }
        return false
    }
    const onShowDateTransactions = (e, date) => {
        e.preventDefault()
        console.log('select date: ', date)
    }
    const ModalDateTransactions = (props) => {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modal heading
              </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Centered Modal</h4>
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                        consectetur ac, vestibulum at eros.
              </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    const CreateCell = ({ date }) => {
        const totalIncome = getDateTotalIncome(date)
        const totalExpense = getDateTotalExpense(date)
        const dateBalance = totalIncome - totalExpense
        if (totalIncome == 0 && totalExpense == 0) {
            return (
                <td className="border align-top month-table-cell">
                    <a role="button"><span>{date.getDate()}</span></a>
                    <div>

                    </div>
                </td>
            )
        }
        return (
            <td className="border align-top month-table-cell">
                <a role="button" onClick={e => onShowDateTransactions(e, date)}><span>{date.getDate()}</span></a>
                <div>
                    <p class="text-end mb-1 text-info" style={{ fontSize: 'small' }}>{formatMoney(totalIncome)}</p>
                    <p class="text-end mb-1 text-danger" style={{ fontSize: 'small' }}>{formatMoney(totalExpense)}</p>
                    <p class="text-end mb-1 text-secondary" style={{ fontSize: 'small' }}>{formatMoney(dateBalance)}</p>
                </div>
            </td>
        )
    }
    return (
        <>
            <div className={`"tab-pane fade ${active ? "active show" : ""}`}>
                <div class="table-responsive-sm">
                    <table class="table mb-0">
                        <thead>
                            <tr>
                                <th className="text-center"> <h6>Sun</h6></th>
                                <th className="text-center"> <h6>Mon</h6></th>
                                <th className="text-center"> <h6>Tue</h6></th>
                                <th className="text-center"> <h6>Wed</h6></th>
                                <th className="text-center"> <h6>Thu</h6></th>
                                <th className="text-center"> <h6>Fri</h6></th>
                                <th className="text-center"> <h6>Sat</h6></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                createCalendar().map(week => (

                                    <tr>
                                        {week.map(date => (
                                            date.getMonth() == startDate.getMonth() ? (
                                                checkIfWeekHaveDayInCurrentMonth(week) ? (<CreateCell date={date} />) : <td className="border align-top month-table-cell"></td>
                                            ) : <td className="border align-top month-table-cell"></td>
                                        ))}
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <ModalDateTransactions />
        </>
    )

}

export default MonthlyTransactionPage
