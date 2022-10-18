import { Outlet, Route, Routes } from "react-router-dom"
import { TicketContainer } from "../tickets/ticketContainer"
import { EmployeeList } from "../../employees&customers/employeeList"
import { EmployeeDetails } from "../../employees&customers/employeeDetails"
import { CustomerDetails } from "../../employees&customers/CustomerDetails"
import { CustomerList } from "../../employees&customers/CustomerList"


export const EmployeeViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>

                <Route path="tickets" element={<TicketContainer />} />
                <Route path="employees" element={<EmployeeList />} />
                <Route path="employees/:employeeId" element={<EmployeeDetails />} />
                <Route path="customers" element={<CustomerList />} />
                <Route path="customers/:customerId" element={<CustomerDetails />} />
            </Route>
        </Routes>
    )
}