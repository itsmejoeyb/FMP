import React, { useContext } from 'react'
import { RootContext } from '../RootContext'

export default function Dashboard() {
    const { user } = useContext(RootContext)

    return (
        <div>
            <h1 style={{ textTransform: 'uppercase' }}>Dashboard</h1>
            <h2 style={{textTransform: 'uppercase'}}>Hey there, {user.firstName}!</h2>
        </div>
    )
}
