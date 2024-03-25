require('dotenv').config();
const axios = require('axios');

async function searchBusiness(term, location) {
    try{
        const response = await axios.get('https://api.yelp.com/v3/businesses/search',{
            headers : {
                Authorization:`Bearer ${process.env.YELP_API_KEY}`
            },
            params: {
                term, location
            }
        })
        return response.data
    } catch (e) {
        console.error('error: ', e)
    }
}

async function searchByPhone(phone) {
    try {
        const response = await axios.get('https://api.yelp.com/v3/businesses/search/phone',{
            headers : {
                Authorization:`Bearer ${process.env.YELP_API_KEY}`
            },
            params: {
                phone
            }
        });
        return response.data
    } catch (e) {
        console.error('Error', e)
    }
}

(async() => {
    const businesses = await searchBusiness('food', 'Newyork')
    console.log(businesses)
}) ()