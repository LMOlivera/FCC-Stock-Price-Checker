'use strict';

let Stock = require("../models/Stock.js");

module.exports = function (app) {
  
  app.route('/api/stock-prices')
    .get(function (req, res){//2 to 6 - GET data
      let stock = req.query.stock;
      if (Array.isArray(stock)) { // 5 - Compare 2 TO DO
        if (stock.length!=2) {
                  
        }else{
          
        }        
      }else{
        if (stock==undefined || stock=="" || stock==null) {
          Stock.find({}, (err, data)=>{
            res.json(data);
          });
        }else{
          let like = req.query.like;
          if (like=="true") {
            //4 - ONLY ONE LIKE PER IP!!!
            Stock.findOne({stock: stock}, (err, data)=>{
              console.log(data);
              Stock.findOneAndUpdate({stock: stock}, {likes: (parseInt(data.likes)+1).toString()}, {new: true}, (err, data)=>{
                  res.json(data);
                });
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
