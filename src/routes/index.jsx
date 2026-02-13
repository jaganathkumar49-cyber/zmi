import { useRoutes } from "react-router-dom";
import mainRoutes from "./mainRoutes";

export default function Approutes (){
    const routes = useRoutes([mainRoutes()])

    

    return <>{routes}</>;
}