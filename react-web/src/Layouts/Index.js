import React from 'react'
import { Link } from 'react-router-dom'

const Index = () => {
    const Button = ({to, name}) => {
        return (
            <Link to={to}>
                <button>{name}</button>
            </Link>
        )
    }
  return (
    <div>
        <Button to="/customer/login" name="Customer"/>
        <Button to="/admin/login" name="Admin"/>
    </div>
  )
}

export default Index