//引入模块
const express = require('express');
//创建路由对象
var router = express.Router();
//引入pool
var pool = require('../pool');

router.get('/',(req,res)=>{
    res.redirect("./public/azz.html");
})
router.get('/reg',(req,res)=>{
    var uname = req.query.uname
    var upwd = req.query.upwd
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        var sql = 'INSERT  INTO azz_uesr(uname,upwd) VALUE(?,?)';
        conn.query(sql,[uname,upwd],(err,result)=>{
            if(err) throw err;
            res.json({code:1,msg:"success"})
        })
    })
})
router.get('/my_login',(req,res)=>{
    var uname = req.query.uname
    var upwd = req.query.upwd
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        var sql = 'SELECT upwd FROM azz_uesr WHERE uname=?';
        conn.query(sql,[uname],(err,result)=>{
            if(err) throw err;
            if(result.length>0){
                var data = JSON.stringify(result);
                var data1 = JSON.parse(data)
                if(data1[0].upwd == upwd){
                    res.json({code:1,msg:"success"})
                }else{
                    res.json({code:0,msg:"fail"})
                }
            }else{
                res.json({code:0,msg:"fail"})
            }
            
        })
    })
})

router.get('/modify',(req,res)=>{
    var uname = req.query.uname
    var upwd = req.query.upwd
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        var sql = 'UPDATE azz_uesr SET upwd=?  WHERE uname=?';
        conn.query(sql,[upwd,uname],(err,result)=>{
            if(err) throw err;
            if(result.affectedRows >0){
                    res.json({code:1,msg:"success"})
                }else{
                    res.json({code:0,msg:"fail"})
                }        
        })
    })
})
router.get('/confirm',(req,res)=>{
    var uname = req.query.uname;
    var upwd = req.query.upwd;
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        var sql = 'SELECT upwd FROM azz_uesr WHERE uname=?';
        conn.query(sql,[uname],(err,result)=>{
            var data = JSON.stringify(result);
            var data1 = JSON.parse(data)
            if(data1[0].upwd == upwd){
                res.json({code:1,msg:"success"})
            }else{
                res.json({code:0,msg:"fail"})
            }
        })
    })
})
//将路由对象导出
module.exports = router;


