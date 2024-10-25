import axios from 'axios';
import { useFormik } from "formik";
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const bookInitialValues = {
    title: '',
    author: '',
    description: '',
    price: '',
    isbn: '',
    image: '',
}

const BookForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const addBook = async (values, { resetForm }) => {
        try {
            const addBook = await axios.post("http://localhost:5462/book/addBook", values);
            if (addBook.status === 200) {
                toast.success(addBook.data);
            }
        } catch (error) {
            toast.error("something went wrong");
        } finally {
            resetForm();
        }
    }

    const updateBook = async (values, { resetForm }) => {
        try {
            const updateBook = await axios.put(`http://localhost:5462/book/updateBook/${id}`, values);
            if (updateBook.status === 200) {
                toast.success(updateBook.data);
                navigate("/");
                resetForm();
            }
        } catch (error) {
            toast.error(updateBook.data);
        }
    }

    const bookInputValidation = Yup.object({
        title: Yup.string().min(3, "Minimum 3 Characters").required(),
        author: Yup.string().min(3, "Minimum 3 Characters").required(),
        description: Yup.string(),
        price: Yup.string().required(),
        isbn: Yup.string()
    });

    const validationFunction = useFormik({
        initialValues: bookInitialValues,
        validationSchema: bookInputValidation,
        onSubmit: id ? updateBook : addBook
    });

    useEffect(() => {
        if (id) {
            const getBookById = async () => {
                try {
                    const response = await axios.get(`http://localhost:5462/book/getBookById/${id}`);
                    if (response.status === 200) {
                        validationFunction.setValues(response.data);
                    }
                } catch (error) {
                    toast.error("something went wrong");
                }
            }
            getBookById();
        }
    }, [id]);

    return (
        <div className='h-screen flex justify-center items-center'>
            <form className="modal-box" onSubmit={validationFunction.handleSubmit}>
                <h3 className="font-bold text-lg text-center mb-3">{id ? "Update Book" : "Add New Book"}</h3>
                <div className='mb-4 text-center'>
                    <input type="text" name='image' placeholder="Book Image Url" value={validationFunction.values.image} className="input input-bordered input-primary w-full max-w-xs" onChange={validationFunction.handleChange} onBlur={validationFunction.handleBlur} />
                    {validationFunction.touched.image && validationFunction.errors.image ? <div className='text-red-500'>Field required</div> : null}
                </div>
                <div className='mb-4 text-center'>
                    <input type="text" name='title' placeholder="Book Title" value={validationFunction.values.title} className="input input-bordered input-primary w-full max-w-xs" onChange={validationFunction.handleChange} onBlur={validationFunction.handleBlur} />
                    {validationFunction.touched.title && validationFunction.errors.title ? <div className='text-red-500'>Field required</div> : null}
                </div>
                <div className='mb-4 text-center'>
                    <input type="text" name='author' placeholder="Book Author" value={validationFunction.values.author} className="input input-bordered input-primary w-full max-w-xs" onChange={validationFunction.handleChange} onBlur={validationFunction.handleBlur} />
                    {validationFunction.touched.author && validationFunction.errors.author ? <div className='text-red-500'>Field required</div> : null}
                </div>
                <div className='mb-4 text-center'>
                    <input type="number" name='price' placeholder="Book Price" value={validationFunction.values.price} className="input input-bordered input-primary w-full max-w-xs" onChange={validationFunction.handleChange} onBlur={validationFunction.handleBlur} />
                    {validationFunction.touched.price && validationFunction.errors.price ? <div className='text-red-500'>Field required</div> : null}
                </div>
                <div className='mb-4 text-center'>
                    <input type="text" name='description' placeholder="Book Description" value={validationFunction.values.description} className="input input-bordered input-primary w-full max-w-xs" onChange={validationFunction.handleChange} onBlur={validationFunction.handleBlur} />
                    {validationFunction.touched.description && validationFunction.errors.description ? <div className='text-red-500'>Field required</div> : null}
                </div>
                <div className='mb-4 text-center'>
                    <input type="text" name='isbn' placeholder="Book ISBN" value={validationFunction.values.isbn} className="input input-bordered input-primary w-full max-w-xs" onChange={validationFunction.handleChange} onBlur={validationFunction.handleBlur} />
                    {validationFunction.touched.isbn && validationFunction.errors.isbn ? <div className='text-red-500'>Field required</div> : null}
                </div>
                <button
                    className='btn btn-primary'
                    type='submit'
                    style={{
                        display: 'block',
                        margin: '0 auto',
                        width: 'fit-content', 
                    }}
                >
                    {id ? "Update Book" : "Add Book"}
                </button>
            </form>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </div>
    );
}

export default BookForm;
