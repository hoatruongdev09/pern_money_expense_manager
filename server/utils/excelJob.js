const xl = require('excel4node')

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function createExcelFileFromTransactions(transactions) {
    let wb = new xl.Workbook()
    let ws = wb.addWorksheet('Report')
    ws.cell(1, 1, 2, 3, 4, 5).string('Expense Report')
    let row = 2
    const groupedTransaction = groupTransactionByDate(transactions)
    for (let [key, value] of groupedTransaction) {
        const month = new Date(value[0].date_created).getMonth()
        const dayStatistic = getTotal(value)
        ws.cell(row, 1).string(`${key} - ${monthNames[month]}`)
        ws.cell(row, 2).string('Note')
        ws.cell(row, 3).string('Category')
        ws.cell(row, 4).string('Type')
        ws.cell(row, 5).string('Money Amount')
        value.forEach(record => {
            ws.cell(row, 2).string(record.note)
            ws.cell(row, 3).string(record.category_name)
            ws.cell(row, 4).string(record.expense_type_id == 1 ? 'Income' : 'Expense')
            ws.cell(row, 5).number(parseInt(record.money_amount))
            row++
        })
        ws.cell(row, 3).string(`Total Income: ${dayStatistic.totalIncome}`)
        ws.cell(row, 4).string(`Total Expense: ${dayStatistic.totalExpense}`)
        row++
    }
    return wb
}
function formatMoney() {

}
function getTotal(transactions) {
    let totalIncome = 0
    let totalExpense = 0
    transactions.forEach(record => {
        if (record.expense_type_id == 1) {
            totalIncome += parseInt(record.money_amount)
        } else if (record.expense_type_id == 2) {
            totalExpense += parseInt(record.money_amount)
        }

    })
    return { totalIncome, totalExpense }
}
function groupTransactionByDate(transactions) {
    const map = new Map()
    transactions.forEach(record => {
        var date = new Date(record.date_created)
        const collection = map.get(date.getDate())
        if (collection != null) {
            collection.push(record)
        } else {
            map.set(date.getDate(), [record])
        }
    })
    return map
}
module.exports = createExcelFileFromTransactions