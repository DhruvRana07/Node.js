import { Disclosure } from '@headlessui/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const BookList = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);

    const getBooks = async () => {
        try {
            const response = await axios.get('http://localhost:5462/book/getBooks');
            if (response.status === 200) {
                setBooks(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteBook = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5462/book/deleteBook/${id}`);
            if (response.status === 200) {
                toast.success(response.data);
                getBooks();
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                    </div>
                </div>
            </Disclosure>

            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Book Store</h1>
                    <button className='btn' onClick={() => navigate('/book-form')}>Add Book</button>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center flex-wrap">
                    {books.length > 0 ? books.map((el) => (
                        <div className="card bg-base-100 w-96 h-[400px] shadow-xl mt-3 me-3" key={el._id}>
                            <NavLink to={`/book-details/${el._id}`} className='overflow-hidden h-[350px]'>
                                <figure className='h-full w-full overflow-hidden rounded'>
                                    <img
                                        src={el.image}
                                        alt="Not Found" className='h-full w-full' />
                                </figure>
                            </NavLink>
                            <div className="card-body">
                                <h2 className="card-title">Book Title: {el.title}</h2>
                                <p><strong>Author</strong>: {el.author}</p>
                                <p>{el.description}</p>
                                <h3 className='card-title m-auto'>Price: &#8377; {el.price}</h3>
                                <div className="card-actions justify-center">
                                    <Link to={`/book-form/${el._id}`}>
                                        <button 
                                            style={{
                                                backgroundColor: '#007b5e',
                                                color: 'white',
                                                padding: '0.4rem 0.8rem',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                margin: '0.5rem',
                                                transition: 'background-color 0.3s'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#005a3f'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007b5e'}
                                        >
                                            Edit
                                        </button>
                                    </Link>
                                    <button 
                                        style={{
                                            backgroundColor: '#d9534f',
                                            color: 'white',
                                            padding: '0.4rem 0.8rem',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            margin: '0.5rem',
                                            transition: 'background-color 0.3s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b52b2b'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d9534f'}
                                        onClick={() => deleteBook(el._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : <h1>No Any Book Available</h1>}
                </div>
            </main>
        </div>
    );
};

export default BookList;
