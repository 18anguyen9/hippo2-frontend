import './registrationStatus.css';
import Button from '../button/button'

function RegistrationStatus() {
    return (
        <div className='container max-w-lg flex flex-wrap ml-16 mr-72 p-4 auth bg-white rounded-xl'>
            <div className='flex-none w-full py-5 px-8 bg-white'>
                <h1 className='top-text'>Course Registration Status</h1>
                <p className='label'>Course</p>
                <p className='label-value'>Placeholder Text</p>
                <p className='label'>Batch #</p>
                <p className='label-value'>Placeholder Text</p>
                <a className='link' href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>Want to change your batch?</a>
                <p className='label'>Tuition</p>
                <p className='label-value'>Placeholder Text</p>
                <p className='label'>Payment Status</p>
                <p className='label-value'>Placeholder Text</p>
            </div>
            <Button isLink={true} bgColor='white' href='/' className='w-1/2 py-1 mx-auto block text-center'>Register for more courses</Button>
        </div>
    );
}

export default RegistrationStatus;