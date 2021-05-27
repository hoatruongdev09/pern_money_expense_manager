const DailyTransactionTable = () => {
    return (
        <div class="tab-pane fade table-responsive px-2" id="daily" role="tabpanel" aria-labelledby="daily-tab">
            <table class="table table-hover mb-0">
                <thead>
                    <tr>
                        <th>NOTE</th>
                        <th>CATEGORY</th>
                        <th>TYPE</th>
                        <th>MONEY AMOUNT</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="table-info">
                        <td class="text-bold-500">Michael Right</td>
                        <td>$15/hr</td>
                        <td class="text-bold-500">UI/UX</td>
                        <td><a href="#"><i class="badge-circle badge-circle-light-secondary font-medium-1" data-feather="mail"></i></a></td>
                    </tr>
                    <tr className="table-danger">
                        <td class="text-bold-500">Morgan Vanblum</td>
                        <td>$13/hr</td>
                        <td class="text-bold-500">Graphic concepts</td>
                        <td><a href="#"><i class="badge-circle badge-circle-light-secondary font-medium-1" data-feather="mail"></i></a></td>
                    </tr>
                    <tr className="table-warning">
                        <td class="text-bold-500">Tiffani Blogz</td>
                        <td>$15/hr</td>
                        <td class="text-bold-500">Animation</td>
                        <td><a href="#"><i class="badge-circle badge-circle-light-secondary font-medium-1" data-feather="mail"></i></a></td>
                    </tr>
                    <tr>
                        <td class="text-bold-500">Ashley Boul</td>
                        <td>$15/hr</td>
                        <td class="text-bold-500">Animation</td>
                        <td><a href="#"><i class="badge-circle badge-circle-light-secondary font-medium-1" data-feather="mail"></i></a></td>
                    </tr>
                    <tr>
                        <td class="text-bold-500">Mikkey Mice</td>
                        <td>$15/hr</td>
                        <td class="text-bold-500">Animation</td>
                        <td><a href="#"><i class="badge-circle badge-circle-light-secondary font-medium-1" data-feather="mail"></i></a></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default DailyTransactionTable
