const express = require('express');
const app = express()

app.use(express.json())
app.use(express.static(__dirname + '/../client/public'));



// app.get('/', (req, res) =>{
//   res.send('hello')
// })

let port = 7625

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})