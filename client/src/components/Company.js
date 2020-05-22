import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function Company(props) {
    const location = useLocation()

    return (
        <div>
            <h1>Company Page</h1>
            <h2>{location.state.name}</h2>
            <h2>{location.state.id}</h2>
        </div>
    )
}
