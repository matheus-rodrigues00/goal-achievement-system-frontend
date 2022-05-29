import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// 경로 잘못 입력 방지를 위한 파일
import Path from 'utils/path';

import Home from 'pages/home/HomeContainer';
import Login from 'pages/Login/LoginContainer';
import SignUp from 'pages/SignUp';
import NotFound from 'pages/NotFound';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/slices';
/*
routes
home : "/"
login : "/login"
sign-up : "/sign-up"
*/

function App() {
	const member = useSelector((state: RootState) => state.member);

	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path={Path.home} element={<Home />} />

					<Route path={Path.login} element={<Login />} />

					<Route path={Path.signUp} element={<SignUp />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</div>
	);
}
export default App;
