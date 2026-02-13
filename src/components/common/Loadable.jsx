import { Suspense } from "react";
import Loader from "./Loader";

const laodable = (Component) => (props) =>
	(
		<Suspense fallback={<Loader />}>
			<Component {...props} />
		</Suspense>
	);

export default laodable;
