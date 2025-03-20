import React from 'react'

export default function Products() {
    let products = [];
    fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        products = data;
    })

    return (
        <>
            {products.map(product => () => {
                return (
                    <div key={product.id} className="card">
                        <img src={product.image} alt={product.name} />
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">{product.description}</p>
                            <p className="card-text">${product.price}</p>
                        </div>
                    </div>
                )})
            }
        </>
    )
}
