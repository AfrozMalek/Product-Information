import React, { useState, useEffect, useCallback } from "react";
import Navbar from './Navbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './ProductPage.css';

const PAGE_SIZE = 10;

function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchProducts = useCallback(async (page = 1, query = '') => {
        setLoading(true);
        setError(null);
        try {
            let endpoint = `https://fakestoreapi.com/products?limit=${PAGE_SIZE}&page=${page}`;
            if (query) {
                const parsedQuery = parseFloat(query);
                if (!isNaN(parsedQuery)) {
                    endpoint += `&price=${parsedQuery}`;
                } else {
                    endpoint += `&title=${encodeURIComponent(query)}`;
                }
            }
            const response = await fetch(endpoint);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts(currentPage, searchQuery);
    }, [currentPage, fetchProducts, searchQuery]);

    const handleSearch = (query) => {
        setSearchQuery(query.trim());
        setCurrentPage(1); // Reset to first page when searching
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    // Filter products based on search query
    const filteredProducts = products.filter(product => {
        if (!searchQuery) return true; // Show all if no search query
        const lowerCaseQuery = searchQuery.toLowerCase();
        return (
            product.title.toLowerCase().includes(lowerCaseQuery) ||
            product.description.toLowerCase().includes(lowerCaseQuery)
        );
    });

    return (
        <div>
            <Navbar onSearch={handleSearch} />
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Number</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Product Name</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Description</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Price</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Image</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts.map((product, index) => (
                            <TableRow key={product.id}>
                                <TableCell component="th" scope="row">
                                    {(currentPage - 1) * PAGE_SIZE + index + 1}
                                </TableCell>
                                <TableCell>{product.title}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>${product.price}</TableCell>
                                <TableCell>
                                    <img src={product.image} alt={product.title} style={{ width: '50px', height: '50px' }} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="pagination">
                <Button variant="contained" onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </Button>
                <Button variant="contained" onClick={handleNextPage}>
                    Next
                </Button>
            </div>
        </div>
    );
}

export default ProductPage;
