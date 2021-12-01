import React from 'react'


const SearchBox = ({handleSubmit, search, handleChange}) => {
    return(
        <header className="header">
            <h1>React Weather App</h1>
            <form className='form' onSubmit={handleSubmit}>
                <input
                    value={search}
                    type="search"
                    placeholder='Search .. '
                    className="form-control form-input"
                    onChange={(e) => handleChange(e.currentTarget.value)}
                />
                <div className='search-icon'>
                   <i className="fa fa-search " type="submit"></i>
                </div>
                <span className="micro"><i className="fa fa-microphone"></i></span> 
            </form>
            <p style={{fontSize: '1rem', marginTop: '3px', marginLeft: '10px'}}>Add the city name for better results. Ex: mila</p>
        </header>
    )
}
 
export default SearchBox;