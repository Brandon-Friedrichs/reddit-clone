import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SearchLayers({ uniqueLayers = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredLayers = filterLayers(uniqueLayers, searchQuery);

  function filterLayers(allLayers, query) {
    if (query === '') {
      return [];
    }
    return allLayers.filter((layer) => {
      const layerName = layer.toLowerCase();
      return layerName.includes(query);
    });
  }

  function searchForLayer(e) {
    e.preventDefault();
    console.log(searchQuery);
  }

  return (
    <div>
      
      <form className='search-bar' onSubmit={searchForLayer}>
        <input 
          className='searchLayers-input' 
          value={searchQuery}
          placeholder='Search for a Layer'
          onInput={e => setSearchQuery(e.target.value)}
        >
        </input>
        <button className='searchLayers-submit' type='submit'>Search</button>
      </form>
      <ul className='search-suggestions'>
        {filteredLayers.length > 0 ? (
          filteredLayers.map((layer) => (
            <Link className='search-autocomplete-link' key={layer} to={`/layer/${layer}`} >
              <li className='search-autocomplete' onClick={() => setSearchQuery('')}>{layer}</li>
            </Link>
          ))) : (
            searchQuery === '' ? (
              ''
            ) : (
              <div className='search-autocomplete'>No '{searchQuery}' layer exists</div>
            )
          )
        }
      </ul>

    </div>
  )
}
