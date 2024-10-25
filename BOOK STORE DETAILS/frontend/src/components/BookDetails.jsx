import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
    const [bookDetails, setBookDetails] = useState({});
    const { id } = useParams();

    async function getBookDetails() {
        try {
            const getBookDetailsWithId = await axios.get(`http://localhost:5462/book/getBookById/${id}`);
            setBookDetails(getBookDetailsWithId.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBookDetails();
    }, []);

    const styles = {
        detailsCard: {
            display: 'flex',
            background: '#fff',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
            borderRadius: '10px',
            maxWidth: '800px',
            width: '90%',
            margin: '2rem auto',
        },
        img: {
            width: '100%',
            objectFit: 'cover',
        },
        detailsContent: {
            padding: '1.5rem',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        title: {
            fontSize: '1.8rem',
            color: '#333',
            marginBottom: '0.5rem',
        },
        description: {
            fontSize: '1rem',
            lineHeight: '1.5',
            margin: '0.5rem 0',
            color: '#555',
        },
        price: {
            fontSize: '1.4rem',
            fontWeight: 'bold',
            color: '#007b5e',
            marginTop: '1rem',
        },
        btnPrimary: {
            backgroundColor: '#007b5e',
            color: 'white',
            padding: '0.6rem 1.2rem',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'background-color 0.3s',
            alignSelf: 'flex-end',
        },
        btnPrimaryHover: {
            backgroundColor: '#005a3f',
        },
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div style={styles.detailsCard}>
                <figure style={{ width: '50%' }}>
                    <img
                        src={bookDetails.image}
                        alt="Book Cover"
                        style={styles.img}
                    />
                </figure>
                <div style={styles.detailsContent}>
                    <h2 style={styles.title}>Title: {bookDetails.title}</h2>
                    <h2 style={styles.title}>Author: {bookDetails.author}</h2>
                    <p style={styles.description}><strong>Description</strong>: {bookDetails.description}</p>
                    <p style={styles.price}><strong>Price</strong>: {bookDetails.price}</p>
                    <div className="card-actions justify-end">
                        <button 
                            style={styles.btnPrimary} 
                            onMouseOver={e => e.currentTarget.style.backgroundColor = styles.btnPrimaryHover.backgroundColor} 
                            onMouseOut={e => e.currentTarget.style.backgroundColor = styles.btnPrimary.backgroundColor}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookDetails;
