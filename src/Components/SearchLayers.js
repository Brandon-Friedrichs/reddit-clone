import React, { useState, useEffect, useRef } from 'react';
import { firestore } from '../firebase';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UseFirestore from '../Hooks/UseFirestore';

export default function SearchLayers({ uniqueLayers = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  console.log(uniqueLayers)
  const filteredLayers = filterLayers(uniqueLayers, searchQuery);

  function filterLayers(allLayers, query) {
    if (query === '') {
      return [];
    }
    console.log('allLayers', allLayers)
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
