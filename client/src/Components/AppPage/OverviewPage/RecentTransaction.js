import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
function RecentTransaction() {
    return (
        <div class="col-sm-12 col-md-4 col-lg-4">
            <div class="card">
                <div className="card-header pb-1">
                    <h6 className="float-start">Recent transactions</h6>
                    <button className="btn float-end py-0 px-0"><FontAwesomeIcon icon={faPlus} size='xs' /></button>

                </div>
                <div class="card-content">
                    <div className="card-body pt-1">
                        <div class="table-responsive">
                            <table class="table table-borderless mb-0">
                                <tbody>
                                    <tr>
                                        <td class="text-bold-500 text-start">Michael Right</td>
                                        <td className="text-end">$15/hr</td>
                                    </tr>
                                    <tr>
                                        <td class="text-bold-500 text-start">Michael Right</td>
                                        <td className="text-end">$15/hr</td>
                                    </tr>
                                    <tr>
                                        <td class="text-bold-500 text-start">Michael Right</td>
                                        <td className="text-end">$15/hr</td>
                                    </tr>
                                    <tr>
                                        <td class="text-bold-500 text-start">Michael Right</td>
                                        <td className="text-end">$15/hr</td>
                                    </tr>
                                    <tr>
                                        <td class="text-bold-500 text-start">Michael Right</td>
                                        <td className="text-end">$15/hr</td>
                                    </tr>
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
