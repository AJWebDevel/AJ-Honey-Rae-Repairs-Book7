
import { CustomerViews } from "./customerViews"
import { EmployeeViews } from "./employeeViews"

export const ApplicationViews = () => {

	const localHoneyUser = localStorage.getItem("honey_user")
	const honeyUserObj = JSON.parse(localHoneyUser)

	if (honeyUserObj.staff) {
		return <EmployeeViews />
	}
	else {
		return <CustomerViews />

	}


}