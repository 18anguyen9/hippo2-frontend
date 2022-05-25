import Button from '../button/button';

function ToDo() {
    return ( 
        <div className='container max-w-lg flex flex-wrap ml-16 mr-72 p-4 auth bg-white rounded-xl'>
            <div className='flex-none w-full py-5 px-8 bg-white'>
                <h1 className='text-center font-main_font text-2xl'>To Do List</h1>
            </div>
            <div className='container flex w-full py-2 px-8 bg-white items-center'>
            </div>
                <Button isLink={true} bgColor="black" txtColor="white" href='/' className='w-2/3 py-6 my-4 mx-auto block text-center font-main_font'>Join AI Camp’s Discord Server</Button>
                <Button isLink={true} bgColor="black" txtColor="white" href='/' className='w-2/3 py-6 my-4 mx-auto block text-center font-main_font'>Visit our Help Center for FAQs</Button>
                <Button isLink={true} bgColor="black" txtColor="white" href='/' className='w-2/3 py-2 mt-4 mb-20 mx-auto block text-center font-main_font'>View Calendar for Upcoming Community Events</Button>
        </div>
     );
}

export default ToDo;
