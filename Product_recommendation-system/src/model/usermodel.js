let db=require("../../db.js");

exports.saveUserIDpass=(username,userEmail,password, created_at,role)=>{
    return new Promise((resolve,reject)=>{
        db.query("insert into user values('0',?,?,?,?,?)",[username,userEmail,password, created_at ,role],(err,result)=>{
            if(err){
                reject("Data not save"+err);
            }
            else{
                resolve("Data Save Sucessfully....");
            }
        })
    })
}

exports.deleteRole=(user_id)=>{
    return new Promise((resolve,reject)=>{
        db.query("delete from user where user_id=?",[user_id],((err,result)=>{
            if((err)){
                reject("Data not deleted."+err)
            }
            else{
                resolve("data deleted success..");
            }
        }))
    })
}