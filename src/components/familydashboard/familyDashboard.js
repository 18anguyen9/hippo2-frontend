import Button from '../button/button';

function FamilyDashboard() {
    return (
        <div className='container max-w-4xl flex flex-wrap mx-auto p-4 bg-white rounded-xl items-center'>
            <div className='flex-none w-full py-5 px-8 pb-12 bg-white'>
                <h1 className='text-center font-main_font text-2xl pb-3'>View Parent or Guardian Dashboard</h1>
                <p className='text-center font-main_font text-sm text-placeholder_text'>These are the family members that you have invited to your AI Camp account. Click on a family member’s name to view their dashboard.</p>
            </div>
            <div className='mx-auto inline-block pb-12'>
                <Button bgColor='white' className='w-64 mx-10 py-4'>Parent #1</Button>
                <Button bgColor='white' className='w-64 mx-10 py-4'>Parent #2</Button>
            </div>
            <div className='flex-none w-full py-5 px-8 pb-12 bg-white'>
                <h1 className='text-center font-main_font text-2xl pb-3'>Ready to invite more family members?</h1>
                <p className='text-center font-main_font text-sm text-placeholder_text'>Click “Add family member” to create a new account for a student or parent, or to connect an existing account.</p>
            </div>
            <div className='mx-auto inline-block pb-12'>
                <Button bgColor='white' className='w-64 mx-auto py-2'>Add Family Member</Button>
            </div>
        </div>
    );
}

export default FamilyDashboard;