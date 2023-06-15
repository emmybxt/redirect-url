const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

const morgan = require('morgan');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'));

app.get('/', (req, res) => {
    return res.status(200).json({
        status: true,
        success: true
    });
});
app.get('/url/', (req, res) => {

    const { url } = req.query;

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url,
      headers: {
        'Referer': 'https://www.thenetnaija.net/videos/series/18878-the-big-d/season-1/episode-1'
      }
    };
    
    let redirecturl = "";
    
    async function makeRequest() {
      try {
        const response = await axios.request(config);
        const redirectedUrl = response.request.res.responseUrl;
        redirecturl = redirectedUrl;
    
        console.log(redirectedUrl);
    
        // Return the response inside the makeRequest function
        return res.status(200).json({
          success: true,
          data: redirecturl
        });
      } catch (error) {
        console.log(error);
      }
    }
    
    makeRequest();
    

});


app.listen(3000, () => {
    console.log("App started on port 3000");
});