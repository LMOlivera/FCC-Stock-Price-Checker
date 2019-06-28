'use strict';

let Stock = require("../models/Stock.js");

module.exports = function (app) {
  
  app.route('/api/stock-prices')
    .get(function (req, res){//2 to 6 - GET data
      let stock = req.query.stock;
      if (Array.isArray(stock)) { // 5 - Compare 2
        if (stock.length==2) {
          Stock.findOne({stock: stock[0]}, (err, data)=>{
            let stock1 = data;
            let likes1 = data.likes;
            Stock.findOne({stock: stock[1]}, (err, data)=>{
              let stock2 = data;
              let likes2 = data.likes;
              res.json([{
                stock: stock1.stock,
                price: stock1.price,
                rel_likes: likes1-likes2
              },{
                stock: stock2.stock,
                price: stock2.price,
                rel_likes: likes2-likes1
              }]);
            });
          });
        }else{
          res.json({error: "A maximum of 2 stock items is accepted."})
        }        
      }else{
        if (stock==undefined || stock=="" || stock==null) {
          Stock.find({}, (err, data)=>{
            res.json(data);
          });
        }else{
          let like = req.query.like;
          if (like=="true") {
            Stock.findOne({stock: stock}, (err, data)=>{    
              let flag;
              let ip = req.headers['x-forwarded-for'];
              if (ip==null) ip="TEST";
              data.ips_liked.map(ipInData=>{
                if (ipInData==ip) {
                  flag=true;
                }
              });
              if (flag==true){
                res.json({error: "You already liked this!"});
              }else{
                let ips = data.ips_liked;                
                ips.push(ip);
                console.log(ips);
                Stock.findOneAndUpdate({stock: stock}, {likes: (parseInt(data.likes)+1).toString(), ips_liked: ips}, {new: true}, (err, data)=>{
                  res.json(data);
                });
              }
            });  
          }else{
            Stock.findOne({stock: stock}, (err, data)=>{
              res.json(data);
            });
          }
        }
      }  
    });
    
};
