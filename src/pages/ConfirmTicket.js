import { useEffect } from "react"
import { useParams } from "react-router-dom"

export const ConfirmTicket = () => {
    const { ticket_id } = useParams()    

    // TODO: on mount, call redeem ticket mutation
    useEffect(() => {

    }, [])

        

    return (
        <div>{ticket_id}</div>
    )
}