import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchPage() {
    const [sideBardata, setSideBarData] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        sort: 'created_at',
        order: 'desc',
    })
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');
        if(
            searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            sortFromUrl ||
            orderFromUrl
        ){
            setSideBarData({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true'? true:false,
                furnished: furnishedFromUrl === 'true'? true:false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            })
        }

        const fetchListings = async()=>{
            setLoading(true);
            const searchQuery = urlParams.toString();
            const response = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await response.json();
            setListings(data);
            setLoading(false);
        }
        fetchListings();

    },[location.search])
    console.log(listings)
    const handleChange = (e)=>{
        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sell'){
            setSideBarData({...sideBardata, type: e.target.id})
        }
        if(e.target.id === 'searchTerm'){
            setSideBarData({...sideBardata, searchTerm: e.target.value})
        }
        if(e.target.id === 'parking' || e.target.id === 'furnished'){
            setSideBarData({...sideBardata, [e.target.id]: e.target.checked || e.target.checke === 'true'? true: false})
        }
        if(e.target.id === 'sort_order'){
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSideBarData({...sideBardata, sort, order})
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sideBardata.searchTerm);
        urlParams.set('type', sideBardata.type);
        urlParams.set('parking', sideBardata.parking);
        urlParams.set('furnished', sideBardata.furnished);
        urlParams.set('sort', sideBardata.sort);
        urlParams.set('order', sideBardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 md:border-r-2
        md:min-h-screen'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                <div className='flex items-center gap-2'>
                    <label>Search Term</label>
                    <input type="text" id="searchTerm" 
                    placeholder='Search...' 
                    className='border rounded-lg p-3 w-full'
                    value={sideBardata.searchTerm}
                    onChange={handleChange}/>
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                    <label>Type:</label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='all' 
                        className='w-5'
                        onChange={handleChange}
                        checked={sideBardata.type === 'all'}/>
                        <span>Rent & Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='rent' 
                        className='w-5'
                        onChange={handleChange}
                        checked={sideBardata.type === 'rent'}/>
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='sell' 
                        className='w-5'
                        onChange={handleChange}
                        checked={sideBardata.type === 'sell'}/>
                        <span>Sale</span>
                    </div>
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                    <label>Amenities:</label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='parking' 
                        className='w-5'
                        onChange={handleChange}
                        checked={sideBardata.parking}/>
                        <span>Parking</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='furnished' 
                        className='w-5'
                        onChange={handleChange}
                        checked={sideBardata.furnished}/>
                        <span>Furnished</span>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <label>Sort:</label>
                    <select  id='sort_order' className='border rounded-lg p-3'
                    onChange={handleChange} defaultValue={'created_at_desc'}>
                        <option value='price_desc' >Price high to low</option>
                        <option value='price_asc'>Price low to high</option>
                        <option value='createdAt_desc'>Latest</option>
                        <option value='createdAt_asc'>Oldest</option>
                    </select>
                </div>
                <button className='bg-slate-700 rounded-lg text-white p-3 uppercase hover:opacity-95'>Search</button>
            </form>
        </div>
        <div className=''>
            <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
                Listing Results:</h1>
        </div>
    </div>
  )
}
