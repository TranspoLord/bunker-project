import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrelloList = () => {
    const [listData, setListData] = useState([]);

    useEffect(() => {
        const fetchListData = async () => {
            try{
                const response = await axios.get('');
                setListData(response.data);
            } catch (error) {
                console.error('Error fetching list data:', error);
            }
        };

        fetchListData();
    }, []);

    return (
        <div>
            {listData.map(list => (
                <div key={list.id}>
                    <h3>{list.name}</h3>
                    <p>Author: {list.id}</p>
                    <p>Date: {list.id}</p>
                    <hr />
                </div>
            ))}
        </div>
    );

}

export default TrelloList;