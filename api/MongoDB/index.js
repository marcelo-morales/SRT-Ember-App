const app = require("./app/index");
const db = require("./data/db");
db.connect();

//const port = process.env.PORT || 6060;
const port = 6060;

console.log(port)
app.listen(port, () => {
    console.log(`Express app listening to ${port}`);
})