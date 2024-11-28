import React from 'react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}

const ItemCard = ({ product }: { product: Product }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => console.log('Rent', product.id)}>Rent</button>
            <button onClick={() => console.log('Save for Later', product.id)}>Save for Later</button>
        </div>
    );
};

export default ItemCard;
