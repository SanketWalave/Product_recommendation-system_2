let mysql=require("mysql2");
require("dotenv").config();

let conn=mysql.createConnection({
   host:process.env.db_host,
   user:process.env.db_user,
   password:process.env.db_pass,
   database:process.env.database
})
conn.connect((err)=>{
    if(err){
        console.log("database is not connected...");
    }
    else{
        console.log("database is connected successfully.....");
    }
})

module.exports=conn;