import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'
import logo from 'assets/images/logo.JPG'
import { ToastContainer } from 'react-toastify';

function MainLayout() {
	return (
		<div className="w-full">
			<Header logo={logo} />
			<div className='w-full mt-[4.5rem] overflow-auto rounded-r-xl r'>
				<Outlet />
				<ToastContainer
					position="top-center"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="colored"
					limit={1}
				/>
			</div>
		</div>
	);
}

export default MainLayout