import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../services/authentication';
import { useFlashMsg } from '../../services/flashMsg';
import { googleSocialUrl } from '../../apiUrls';
import validateUserSignup from '../../validation/signup';
import formatApiErrors from '../../validation/formatApiErrors';
import Button from "../../components/button/button";
import Input from "../../components/form/input";
import './signup.css';

function Signup() {
	const [password, setPassword] = useState('');
	const [type, setType] = useState('');
	const [email, setEmail] = useState('');
	const [formErrors, setFormErrors] = useState({});
	const auth = useAuth();
	const { flashMsg } = useFlashMsg();
	const location = useLocation();
	const [fade, setFade] = useState(false);

	
	const handleFade = () => {
		setFade(true);
	};

	const origin = location.state?.from?.pathname || '/';

	const googleState = encodeURI(window.btoa(JSON.stringify({
		type: type,
		origin: origin
	})));

	const googleSocialUrlFull = googleSocialUrl + `&state=${googleState}`;

	const signUpUser = () => {
		setFormErrors({});
		const [err, data] = validateUserSignup({
			email,
			type,
			password
		});
		if (err) {
			return setFormErrors(err);
		}
		auth.handleSignup(
			data.email,
			data.type,
			data.password, 
			origin
		).then(res => {
			flashMsg('success', 'Welcome to AI Camp!');
		}).catch(err => {
			if (err.status === 400) {
				const keyMap = {
					'password1': 'password',
					'non_field_errors': 'nonFieldErrors'
				};
				setFormErrors(formatApiErrors(err.data, keyMap));
			} else {
				flashMsg('error', 'Failed to Sign up');
			}
		});
	};

	return (
		<div className="container max-w-3xl flex flex-wrap mx-auto p-4 auth">
			<div className="flex-none md:flex-initial w-full md:w-5/12 p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none">
				<h1 className="text-2xl mb-5 text-center">Create an Account</h1>
				<p className="text-base mb-3">
					AI Camp teaches future leaders about coding, AI, how to learn, and how to work through creating impressive AI products and tech internships.
				</p>

				<p className="text-base mb-3">
					By creating AI products, our students apply what they have learned through first-hand experience of being an engineer, a product manager, or a data scientist.
				</p>

				<p className="text-base mb-3">
					Ready to start your AI journey? Our world class mentors and instructors are here to guide you!
				</p>

				<p className="text-base">
					By signing up for AI Camp, you agree to our <a className="text-blue-700 hover:text-blue-600 underline decoration-inherit" href="https://www.ai-camp.org/terms-of-service">Terms of Service</a> and <a className="text-blue-700 hover:text-blue-600 underline decoration-inherit" href="https://www.ai-camp.org/privacy-notice">Privacy Policy</a>.
				</p>
			</div>

			<form action="/" method="GET" onSubmit={event => {
				event.preventDefault();
			}} className="flex-none md:flex-initial w-full md:w-7/12 py-5 px-8 bg-white rounded-b-xl md:rounded-r-xl md:rounded-none">
				<h2 className="text-xl mb-6 mt-8 text-center">Join AI Camp as a</h2>

				<div className="flex items-center justify-center">
					<div className="mx-auto inline-block">
						<Button 
							bgColor={type === 'STUDENT' ? 'black' : 'white'} 
							txtColor={type === 'STUDENT' ? 'white' : 'black'}
							onClick={() => {
								setType('STUDENT');
								handleFade();
							}}
							className="w-28 md:w-36 mr-4 p-1"
						>
							Student
						</Button>
						<Button 
							bgColor={type === 'PARENT' ? 'black' : 'white'} 
							txtColor={type === 'PARENT' ? 'white' : 'black'}
							onClick={() => {
								setType('PARENT');
								handleFade();
							}}
							className="w-28 md:w-36 p-1"
						>
							Parent
						</Button>
					</div>
				</div>
				{
					formErrors.type?.length ? 
						<span className='mt-3 block text-center form-error'>{formErrors.type[0]}</span> 
						: 
						null
				}
				<Link 
					to="/login" 
					className={
						`text-blue-700 hover:text-blue-600 my-5 underline decoration-inherit text-center ${fade ? 'hidden' : 'block'}`
					}
					state={{ from: { pathname: origin }}}
				>Already have an account?</Link>

				<div className={`${fade ? "block" : "hidden"}`}>
					<Input label="Email"
						type="email"
						placeHolder="JohnDoe@yahoo.com"
						className="mb-3 mt-6"
						id="email"
						isValid={formErrors.email?.length}
						errorText={formErrors.email?.[0]}
						onChange={val => setEmail(val)} 
					/>

					<Input label="Password"
						type="password"
						placeHolder="JohnDoePassword"
						className="mb-3"
						id="password"
						isValid={formErrors.password?.length}
						errorText={formErrors.password?.[0]}
						onChange={val => setPassword(val)} 
					/>

					<Button bgColor="green" txtColor="white" className="w-full mb-3 mt-6 py-1" onClick={() => signUpUser()}>Next</Button>

					<p className="text-xl mb-3 text-center">Or</p>

					<div className="block mb-5">
						<Button isLink={true} bgColor="white" href={googleSocialUrlFull} className="w-full my-1 py-1 mx-auto block text-center">Continue with Google</Button>
					</div>

					<div className="mb-6 flex items-center justify-center opacity-100">
						<Link 
							to="/login" 
							className="mx-auto text-blue-700 hover:text-blue-600 underline decoration-inherit"
							state={{ from: { pathname: origin }}}
						>Already have an account?</Link>
					</div>
				</div> 

			</form>
		</div>
	);
}

export default Signup;
