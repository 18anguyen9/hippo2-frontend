import { useAuth } from '../services/authentication';
import './protected.css'
import RegistrationStatus from '../components/registrationstatus/registrationStatus';
import PaymentLogs from '../components/paymentlogs/paymentLogs'
import Button from '../components/button/button';
import logo from '../logo.svg'

function Protected() {
	const auth = useAuth();
	const userData = JSON.stringify(auth.user);
	return (
		<div>
			<div className='bg-banner_grey w-full flex items-center py-10'>
				<img src={logo} className='h-1/2 inline-block p-2.5 pl-8'/>
				<p className='large-name'>Name</p>
				<Button isLink={true} bgColor="black" href={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'} className="w-1/6 my-3 py-3 block text-center text-white font-main_font inline-block">Edit Your Profile</Button>
			</div>
			<div className='container min-w-full flex items-center py-8 overflow-y'>
				<RegistrationStatus />
				<PaymentLogs />
			</div>
			<div className='bottom-wrapper'>

			</div>
		</div>
	);
}

export default Protected;
