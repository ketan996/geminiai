import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
        try {
            localStorage.removeItem("token");
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }, [])
  return (
    <div>Logout</div>
  )
}

export default Logout