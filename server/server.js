const express = require('express')
const axios = require('axios')
const app = express()

REACT_APP_YELP_APP_KEY = 'QRy3peTwKHhnlMYWXQNdvfhdDXDAWmQ68YnIH2MewwmMte30eelvDw34s2OR03QCZQ5HuPS0QdtEjHcZAazrR5DFePKeaG3hvaOakvnR9waOP0jgQgEoQ3B8WCi4ZXYx'

async function searchBusiness(term, location) {
    try{
        const response = await axios.get('https://api.yelp.com/v3/businesses/search',{
            headers : {
                Authorization:`Bearer QRy3peTwKHhnlMYWXQNdvfhdDXDAWmQ68YnIH2MewwmMte30eelvDw34s2OR03QCZQ5HuPS0QdtEjHcZAazrR5DFePKeaG3hvaOakvnR9waOP0jgQgEoQ3B8WCi4ZXYx`
            },
            params: {
                term, 
                location,
                limit : 10
            }
        })
        return response.data
    } catch (e) {
        console.error('error: ', e)
    }
}

app.get("/api", async (req,res) => {
    // res.json({"users" : ["user1" , "user2", "user3" ]})
    const businesses = await searchBusiness('food', 'Newyork');
    console.log(businesses)
    res.json(businesses)
})

app.listen(5000, () => {console.log("Sever started on port 5000")})

