import { CustomerNav } from "./customerNav"
import { EmployeeNav } from "./employeeNav"
import "./NavBar.css"




export const NavBar = () => {

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObj = JSON.parse(localHoneyUser)

    if (honeyUserObj.staff) {
        return <EmployeeNav />
    }
    else {
        return <CustomerNav />

    }


}

