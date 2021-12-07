import React, {useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../Utils/Design-Tokens/CommonScssUtil.scss'
import { getEvents, getEventsBySearch } from '../../Actions/events'

const SearchBar = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const dispatch = useDispatch()
    const [search, setSearch] = useState('')

    function useQuery() {
        return new URLSearchParams(location.search);
    }
    
    const query = useQuery()
    const searchQuery = query.get('searchQuery')

    /**
     * Search post using dispatch
     */
    const searchEvent = () => {
        if (search.trim()) {
            // do dispatch
			dispatch(getEventsBySearch({ search }))
			// navigate to the url to get only the relevant events
        } else {
			dispatch(getEvents())
        }
    }

    const handleKeyPress = (e) => {
		// enter key is pressed
        if (e.charCode === 13) {
            searchEvent()
        }
    }

	return (
        <div className="searchBar">
            <input name="search" placeholder="Search Events" value={search}
                onKeyPress={handleKeyPress}
                onChange={(e)=> {setSearch(e.target.value)}}>
            </input>
            <button onClick={searchEvent} type="button">Search</button>
        </div>
  	)
}

export default SearchBar
