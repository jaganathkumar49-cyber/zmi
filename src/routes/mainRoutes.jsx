import { routes } from "../utils/routes";
import { lazy } from "react";
import Loadable from "../components/common/Loadable";
import MainLayout from "../layouts/mainLayout";
import { ToastContainer } from "react-toastify";
//routes

<ToastContainer position="top-right" autoClose={2000} />
const Login = Loadable(lazy(() => import("../views/Login/Login")));
const HomePage = Loadable(lazy(() => import("../views/Dashboard/Home")));
const Dashboard = Loadable(lazy(() => import("../views/Dashboard/Dashboard")));
const Speaker = Loadable(lazy(() => import("../views/Dashboard/Speaker")));
const Headphones = Loadable(lazy(() => import("../views/Dashboard/Headphones")));
const Earbuds = Loadable(lazy(() => import("../views/Dashboard/Earbuds")));
const Cart = Loadable(lazy(() => import("../views/Dashboard/CartList")));
const SpeakerDetail = Loadable(lazy(() => import("../views/Dashboard/SpeakerDetail")));
const HeadphoneDetail = Loadable(lazy(() => import("../views/Dashboard/HeadphoneDetails")));
const EarbudDetail = Loadable(lazy(() => import("../views/Dashboard/EarbudDetail")));
const AddUser = Loadable(lazy(() => import("../views/Dashboard/addUser")));
const Payment = Loadable(lazy(() => import("../views/Dashboard/Payment")));




const mainRoutes = () => {
	return {

		path: routes.home,
		element: <MainLayout />,
		children: [
			{ path: routes.home, element: <Login /> },
			{ path: routes.dashboard, element: <Dashboard /> },
			{ path: routes.homepage, element: <HomePage /> },
			{ path: routes.speaker, element: <Speaker /> },
			{ path: routes.headphone, element: <Headphones /> },
			{ path: routes.earbuds, element: <Earbuds /> },
			{ path: routes.cartlist, element: <Cart /> },
			{ path: routes.speakerDetail, element: <SpeakerDetail /> },
			{ path: routes.HeadphoneDetail, element: <HeadphoneDetail /> },
			{ path: routes.EarbudDetail, element: <EarbudDetail /> },
			{ path: routes.ADDUser, element: <AddUser /> },
			{ path: routes.payment, element: <Payment /> }





		],

	};

};

export default mainRoutes;
