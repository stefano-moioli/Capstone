
function errorHandler(err, req, res, next){
    const e = err.toString();
    console.log("Sono il middleware error handler " + "Err: " + e);
    res.status(500).send("Sono il middleware errorHandler " + "Err: " + e);
}

function pageNotFoundHandler(req, res, next){
    console.log("Error!");
    res.status(404).send('Page not found');
}

module.exports = {errorHandler, pageNotFoundHandler};