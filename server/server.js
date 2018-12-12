const path = require('path');
const express = require('express'); //  importing in node
const app = express();
const publicPath = path.join(__dirname, '..', 'public') 
const port = process.env.PORT || 3000 

app.use(express.static(publicPath));

app.get('*', (req, res) => { // * acts as a link to the directory
    res.sendFile(path.join(publicPath, 'index.html'));
}); 

app.listen(port, () => {  
    console.log('server is up')
});