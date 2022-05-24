import { useAuth } from "../services/authentication";
import RegistrationStatus from "../components/registrationstatus/registrationStatus";

function Protected() {
	const auth = useAuth();
	return (
		<>
			<h1>You can only see this if you are logged in.</h1>
			<p>User data: {JSON.stringify(auth.user)}</p>
			<RegistrationStatus />
		</>
	);
}

export default Protected;
