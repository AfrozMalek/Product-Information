import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '80ch',
        },
    },
}));

const SearchIcon = () => (
    <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
        <path fill="currentColor" d="M9.5 3a6.5 6.5 0 015.17 10.742l4.835 4.835-1.415 1.415-4.835-4.835A6.5 6.5 0 119.5 3m0 2a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
    </svg>
);

function Navbar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        onSearch(term);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" noWrap>
                    Product Page
                </Typography>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search by product name..."
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchTerm}
                        onChange={handleChange}
                    />
                </Search>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
