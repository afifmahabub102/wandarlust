import React, { Suspense } from 'react';
import { getDestinations } from '../lib/db';
import Destination from '../components/Destination';



const DestinationsPage = async () => {

    const destinations = await getDestinations()
    console.log(destinations);

    return (
        <div className='max-w-7xl mx-auto'>
            <h1>All Destinations</h1>

            <div className='grid grid-cols-3 gap-5 mt-5 mb-5'>
                {/* <Suspense fallback={'Loading...........'}> */}
                    {

                        destinations.map(destination => <Destination key={destination._id} destination={destination}></Destination>)

                    }
                {/* </Suspense> */}
            </div>

        </div>
    );
};

export default DestinationsPage;