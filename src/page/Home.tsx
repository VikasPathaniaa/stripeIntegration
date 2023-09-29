import React from 'react'
import Button from '../components/common/Button'
import { loadStripe } from '@stripe/stripe-js/pure';
const Home = () => {
    const makeRequest = async () => {
        const stripe = await loadStripe('pk_test_51NvCqjSDHABHXCN4p2SrB4xTK6pJho3OzCWVpIuDNbeC6PQwswzUkY73RgSZ3z9FzPYCkwMTJ2ngCy0OAWb0Qblc00zGcYE8VH');
        const body = {
            products: [
                {
                    id: 1,
                    name: "Product 1",
                    price: 100,
                    quantity: 2
                },
                {
                    id: 2,
                    name: "Product 2",
                    price: 200,
                    quantity: 1
                },
                {
                    id: 3,
                    name: "Product 2",
                    price: 800,
                    quantity: 4
                }
            ]
        }
        const response = await fetch("http://localhost:7000/api/products/create-checkout-session", {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        const session = await response.json();
        const result = stripe?.redirectToCheckout({
            sessionId: session.id
        })
        console.log("result", result)
        const error = await (await result)?.error
        if (error) {
            console.log("error", error)
        }
    }
    return (
        <>
            <Button btn="CheckOut" onClickHandle={makeRequest} />
        </>

    )
}

export default Home