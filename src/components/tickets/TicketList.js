

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./tickets.css"


export const TicketList = ({ searchTermsState }) => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)

    const navigate = useNavigate()
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObj = JSON.parse(localHoneyUser)

    useEffect(
        () => {
            const searchedTickets = tickets.filter(ticket => {
                return ticket.description.toLowerCase().startsWith(searchTermsState.toLowerCase())
            })
            setFiltered(searchedTickets)
        },
        [searchTermsState]
    )

    useEffect(
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets)
            }
            else {
                setFiltered(tickets)
            }
        },
        [emergency]
    )

    useEffect(
        () => {

            fetch(`http://localhost:8088/serviceTickets`)
                .then((res) => res.json())
                .then((ticketsArray) => {
                    setTickets(ticketsArray)
                })
        },
        //empty dependency array watches for initial change
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (honeyUserObj.staff) { //employees
                setFiltered(tickets)
            }
            else { //customers
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObj.id)
                setFiltered(myTickets)
            }
        },
        [tickets]
    )


    useEffect(
        () => {
            if (openOnly) {
                const openTicketArray = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObj.id && ticket.dateCompleted === ""
                })
                setFiltered(openTicketArray)
            }
            else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObj.id)
                setFiltered(myTickets)
            }
        },
        [openOnly]
    )


    return <>
        {
            honeyUserObj.staff
                ? <>
                    <button onClick={() => setEmergency(true)}> Emergencies Only</button>
                    <button onClick={() => setEmergency(false)}> Show All</button>

                </>
                : <>
                    <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                    <button onClick={() => updateOpenOnly(true)}>Open Tickets</button>
                </>
        }
        <h2>List of Tickets</h2>
        <article className="tickets">
            {filteredTickets.map(
                (ticket) => {
                    return <section className="ticket">
                        <header>{ticket.description}</header>
                        <footer>Emergency: {ticket.emergency ? "dynomight" : "No"}</footer>
                    </section>
                }
            )

            }
        </article>
    </>
}