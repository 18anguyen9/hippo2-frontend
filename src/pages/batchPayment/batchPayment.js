import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../services/authentication";
import { useFlashMsg } from "../../services/flashMsg";
import Button from "../../components/button/button";
import baseUrl from "../../apiUrls";
import Loading from "../loading/loading";

function BatchPayment() {
	const { batchId } = useParams();
	const [search] = useSearchParams();
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);
	const [processing, setProcessing] = useState(false);
	const { user, autoAuthReq } = useAuth();
	const { flashMsg } = useFlashMsg();
	const flashMsgRef = useRef(flashMsg).current;
	const location = useLocation();
	const navigate = useNavigate();
	
	const forUserId = search.get('for') ? search.get('for') : user.id;
	const here = location.pathname + location.search;

	useEffect(() => {
		// initialize order
		const url = baseUrl + '/api/v1/orders/';
		const options = {
			method: 'POST',
			body: {
				user: forUserId,
				batch: batchId
			}
		};
		autoAuthReq(url, options, here).then(res => {
			setData(res.data);
			setLoading(false);
		}).catch(err => {
			if (err.data?.message) {
				flashMsgRef('error', err.data.message);
			} else {
				flashMsgRef('error', 'Unable to fetch order info');
			}
			navigate('/courses');
		});
		
	}, [autoAuthReq, batchId, forUserId, here, flashMsgRef, navigate]);

	if (loading) {
		return <Loading />;
	}

	const onPayNow = () => {
		setProcessing(true);
		const url = baseUrl + `/api/v1/batches/${batchId}/payment/`;
		const options = {
			method: 'POST',
			body: { user: forUserId }
		};
		autoAuthReq(url, options, here).then(res => {
			const checkoutURL = res.data.checkout_url;
			window.location.replace(checkoutURL);
		}).catch(err => {
			if (err.data?.message) {
				flashMsg('error', err.data.message);
			} else {
				flashMsg('error', 'Unable to create payment session');
			}
			navigate('/courses');
		});
	};
	const onPayLater = () => {
		// TODO pay in installments
	};

	

	const reviewStars = [];
	for (let i = 0; i < 5; i++) {
		reviewStars.push(
			<FontAwesomeIcon key={i} className="h-4 w-4 text-yellow-400 inline-block" icon={faStar} />
		);
	}

	let controls;
	if (processing) {
		controls = (
			<p className="text-lg">Redirecting to payment screen. Please wait...</p>
		);
	} else {
		controls = (<>
			<Button 
				bgColor="green" txtColor="white" className="col-span-3 py-4 w-full mb-3" 
				onClick={() => onPayNow()}
			>Submit Full Tuition</Button>
			<Button 
				bgColor="white" txtColor="black" className="col-span-3 py-4 w-full mb-8" 
				onClick={() => onPayLater()}
			>Pay in Installments</Button>
		</>);
	}

	return (
		<div className="container max-w-4xl flex flex-wrap mx-auto p-4 mt-10 auth">
			<div className="flex-none md:flex-initial w-full md:w-1/2 p-5 text-white bg-green rounded-t-xl md:rounded-l-xl md:rounded-none text-base">
				<h1 className="text-2xl mb-5 text-center">Payment Details</h1>
				<p className="mb-5">Course tuition is listed under your selected course, alongside other course details. We offer competitive prices for the best AI education.</p>
				{/* <p className="mb-5">Optional: Enter promo codes under the "Promotional Code" section.</p> */}
				<p className="mb-5">Pay the full tuition in smaller installments over time by clicking "Pay in Installments".</p>
				<p className="mb-8 text-lg">Pay now by clicking "Submit Tuition".</p>
				<p className="mb-5"><b>Note: Your spot is not reserved until you have paid the tuition. Courses are filling up fast!</b></p>
				<hr className="mx-3 mb-4" />
				<div className="flex flex-row justify-center items-center mb-4">
					<FontAwesomeIcon className="h-10 w-10 text-yellow-400" icon={faStar} />
					<p className="inline-block text-3xl ml-2">4.7/5 (208 reviews)</p>
				</div>
				<div className="bg-zinc-200 px-4 py-2 rounded-2xl text-black">
					<div className="flex justify-between">
						<div className="h-fit">{reviewStars}</div>
						<p className="text-xs mt-1 align-middle">July 14, 2021</p>
					</div>
					<p className="text-sm mb-1">"This class not only teaches us about AI, it provides us with resources that can help us determine what we will do in the future."</p>
					<div className="h-8 flex">
						<div className="inline-block">
							<img className="rounded-full bg-zinc-300 h-8 w-8" src="" alt="" />
						</div>
						<span className="inline-block text-sm ml-1 my-auto leading-none">Valeria Cisneros</span>
					</div>
				</div>
			</div>
			<div className="flex-none md:flex-initial relative w-full md:w-1/2 py-5 px-8 bg-white rounded-b-xl md:rounded-r-xl md:rounded-none">
				<h2 className="text-xl mb-6 text-center">Submit payment to finalize registration.</h2>
				<div className="mb-8">
					<p className="text-lg font-semibold">{data.course.name}</p>
					<p className="text-base">${data.course.price}</p>
				</div>
				<div className="mb-8 text-lg font-semibold">
					<p>Student Name: {data.user.first_name} {data.user.last_name}</p>
					<p>
						Batch: {data.batch.name} ({data.batch.time_zone}) {data.batch.start_date}-{data.batch.end_date}
					</p>
				</div>

				{controls}
			</div>
		</div>
	);
}

export default BatchPayment;
