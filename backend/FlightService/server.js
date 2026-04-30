const express=require('express');
const app=express();

app.use('/api/flight', require('/flightRoutes.js'));
app.listen(5003, () => console.log('Flight Service is running on 5003'));