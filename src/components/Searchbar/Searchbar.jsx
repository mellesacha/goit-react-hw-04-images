import { useState } from "react";
import PropTypes from 'prop-types';
import { SearchForm, Button, ButtonLabel, Input, Header } from "./Searchbar.styled";
import { FiSearch } from "react-icons/fi";

const Searchbar = ({ onSubmit }) => {
    const [search, setSearch] = useState('');

    const handlInput = (e) => {
        const { value } = e.target;
        setSearch(value);
    };
    
    const handlSubmit = (e) => {
        e.preventDefault();
        
        if (search.trim() === '') {
            return
        };

        onSubmit(search);
        setSearch('')
    
    };

    return (<Header>
        <SearchForm onSubmit={handlSubmit}>
            <Button type="submit">
                <ButtonLabel><FiSearch /></ButtonLabel>
           
            </Button>

            <Input
                className="input"
                type="text"
                value={search}
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                onChange={handlInput}
            />
        </SearchForm>
    </Header>)
};

export default Searchbar;

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}