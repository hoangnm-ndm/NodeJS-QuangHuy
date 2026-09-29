import express from 'express';
import routes from './src/routes/index.js';
const app = express();

app.use("/api",  routes )

// FE - quanghuy.vn
// BE - quanghuy.vn/api/*** */

app.listen(3000, (err) => {
  if(err) {
    console.log(err);
  }
  console.log("Server dang chay tren cong 3000");
})