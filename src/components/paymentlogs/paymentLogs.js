import './paymentLogs.css';
import Button from '../button/button';

function PaymentLogs() {
    return (
        <div className='container max-w-4xl'>
            <div className='container max-w-4xl flex flex-wrap mx-auto p-4 bg-white rounded-xl'>
                <div className='flex-none w-full py-5 px-8 bg-white'>
                    <h1 className='top-text'>Payment Logs</h1>
                    <div className='table-wrapper'>
                        <table className='w-full'>
                            <tr>
                                <th className='column-header'>Date</th>
                                <th className='column-header'>Amount Received</th>
                                <th className='column-header'>Paid By</th>
                                <th className='column-header'>Status</th>
                            </tr>
                            <tr>
                                <td>1/1/2022</td>
                                <td>2000</td>
                                <td>Parent 1</td>
                                <td>Paid</td>
                            </tr>
                        </table>
                    </div>
                    <div className='total-section'>
                        <p className='total-label'>Total Cost Remaining:</p>
                        <p className='total-cost'>$2000</p>
                    </div>
                    
                </div>
            </div>
            <Button isLink={true} bgColor='white' href='/' className='w-full py-1 mx-auto block text-center mt-44'>Submit Tuition Payment</Button>
        </div>
    );
}

export default PaymentLogs;