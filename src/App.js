import {
	BrowserRouter, Routes, Route
} from 'react-router-dom';
import PrivateRoute from './components/privateroute/privateRoute';

import { AuthProvider } from './services/authentication';

import Navbar from './components/navbar/navbar';
import Home from './pages/home';
import Signup from './pages/signup';
import Login from './pages/login';
import Welcome from './pages/welcome';
import Protected from './pages/protected';
import GoogleAuth from './pages/google';
import Footer from './components/footer/footer';

import './App.css';


function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/auth/google/' element={<GoogleAuth />}></Route>
					<Route path='/welcome' element={<Welcome />}></Route>
					<Route path='/protected' element={<Protected />}></Route>
					<Route path='/signup' element={<Signup />}></Route>
					<Route path='/login' element={<Login />}></Route>
				</Routes>
				<Footer />
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
