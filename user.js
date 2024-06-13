var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/index');
});

router.get('/practioner', function(req, res, next) {
  res.render('user/practioner');
});

router.get('/forgotpassword', function(req, res, next) {
  res.render('user/forgotpassword');
});


router.get('/patientsignup', function(req, res, next) {
  res.render('user/patientsignup');
});

router.post('/check', function(req, res, next) {
  
var username=req.body.user_name
var password=req.body.user_pwd
var usertype=req.body.user_type

const usersessiondata =req.session.sessname

if(usertype=="Admin")
{
  if(username=="Varshini" && password=="Score")
  {
    req.flash('message','Logged As Admin Successfully');
    res.render('admin/adminhomepage',{message:req.flash('message')});
  } 
  else
  {
    req.flash('message',' Invalid Credentials ');
    res.render('admin/index',{message:req.flash('message')});
  }
}
else if(usertype=="Patient")
{ 
  connection.query("select * from tbl_user_registration where username='"+username+"' and password='"+password+"'",function(err,result)
  {
    if(err)
    throw err;
    //console.log(err)
  if(result.length>0)
  {
    console.log(username)
    const usersessiondata=req.session.sessname
    req.session.sessname=result[0].Userid
    obj=result[0].Userid
    console.log(obj)
    req.flash('message', {'username':username}) ;
    res.render('admin/patienthomepage',{messages:req.flash('message')
});
    req.app.set('flashMessage', username);
    next();
  }
  else
  {
    req.flash('message','Invaild Credentials')
    res.render('admin/index',{message:req.flash('message')})
  }
}
);
}
else if(usertype=="Practitioner")
{
  connection.query("select * from tbl_health_practitioner_registration where username='"+username+"'and password='"+password+"'",function(err,result)
  {
    if(err)
    throw err;
    console.log(err)
    if(result.length>0)
  {
    req.session.sessname=result[0].userid
    const usersessiondata =req.session.sessname
    obj=result[0].userid
    console.log(obj)
    req.flash('message',username)
    res.render('admin/practitionerhomepage',{message:req.flash('message')});  
  }
  else{
    req.flash('message','Invalid Credentials')
    res.render('admin/index',{message:req.flash('message')});
  }
    
  });
}
else
{
  req.flash('message','Invalid UserType')
  res.redirect("admin/index",{message:req.flash('message')})
}

});

router.get('/waterintake', function(req, res, next) {
  const flashMessage = req.app.get('flashMessage'); 
  console.log(" username is" +flashMessage);
  res.render('admin/waterintake', { flashMessage });
});

router.get('/walkingsteps', function(req, res, next) {
  const flashMessage = req.app.get('flashMessage'); 
  res.render('admin/walkingsteps', { flashMessage }); 
});


router.get('/heartrate', function(req, res, next) {
  const flashMessage = req.app.get('flashMessage'); 
  console.log(" username is" +flashMessage); 
  res.render('admin/heartrate',{ flashMessage });
});

router.get('/bloodpressure', function(req, res, next) {
  const flashMessage = req.app.get('flashMessage'); 
  console.log(" username is" +flashMessage); 
  res.render('admin/bloodpressure',{ flashMessage })
});

router.get('/bloodglucose', function(req, res, next) {
  const flashMessage = req.app.get('flashMessage'); 
  console.log(" username is" +flashMessage); 
  res.render('admin/bloodglucose',{ flashMessage })
});

router.get('/bmitracker', function(req, res, next) {
  const flashMessage = req.app.get('flashMessage'); 
  console.log(" username is" +flashMessage); 
  res.render('admin/bmitracker',{ flashMessage })
});

router.get('/bodytemperature', function(req, res, next) {
  const flashMessage = req.app.get('flashMessage'); 
  console.log(" username is" +flashMessage); 
  res.render('admin/bodytemperature',{ flashMessage })
});

router.get('/caloriescount', function(req, res, next) {
  const flashMessage = req.app.get('flashMessage'); 
  console.log(" username is" +flashMessage); 
  res.render('admin/caloriescount',{ flashMessage })
});

router.get('/oxygenmonitor', function(req, res, next) {
  const flashMessage = req.app.get('flashMessage'); 
  console.log(" username is" +flashMessage); 
  res.render('admin/oxygenmonitor',{ flashMessage })
});

router.get('/sleeptracker', function(req, res, next) {
  const flashMessage = req.app.get('flashMessage'); 
  console.log(" username is" +flashMessage); 
  res.render('admin/sleeptracker',{ flashMessage })
});

router.get('/practitionerhomepage', function(req, res, next) {
  res.render('admin/practitionerhomepage');
});

router.get('/index', function(req, res, next) {
  res.render('admin/index');
});

router.get('/patienthomepage', function(req, res, next) {
  res.render('admin/patienthomepage');
});

router.get('/adminhomepage', function(req, res, next) {
  res.render('admin/adminhomepage');
});

router.get('/viewpatientdetails', function(req, res,next) {
  connection.query("select * from tbl_user_registration",function(err,result){
    if(err)
    {
      throw err;
    }
    else
    {
      obj={print:result};
      res.render("admin/viewpatientdetails",obj)
    }
  })
});

router.get('/viewpractionerdetails', function(req, res, next) {
  connection.query("select * from tbl_health_practitioner_registration",function(err,result){
    if(err)
    {
      throw err;
    }
    else
    {
      obj={print:result};
      res.render("admin/viewpractionerdetails",obj)
    }
  })
 
});

router.get('/viewhealthpractioner',function(req,res)
{
  connection.query("select * from tbl_health_practitioner_registration",function(err,result){
    if(err)
    {
      throw err;
    }
    else
    {
      const flashMessage = req.app.get('flashMessage'); 
      const print = result;
      const obj = { print }
      console.log(obj,flashMessage)
      res.render("admin/viewhealthpractioner",{obj,flashMessage });
    }
  })
 })


router.post('/calheartmetricunits',function(req,res)
{
   var user_age=req.body.user_age;
   var user_height=req.body.user_height;
   var user_weight=req.body.user_weight;
   var user_rates=req.body.user_rates;
   var user_gender=req.body.user_gender;
   var user_category=req.body.user_category;
   var message;
  const usersessiondata=req.session.sessname
  var Score=Math.round((user_rates) / 100 * 100)

  if(user_category=="child") 
  {
    if(user_gender =="male " || user_gender=="female")
    {
     if(user_age>=3 && user_age<=4)
     {
      if(user_rates>=80 && user_rates<=120)
       {
          message="You have a normal heartbeat";
       }
      else if(user_rates<80)
      {
        message="You might have a bradycardia.Consult a doctor soon"
      }
      else if(user_rates>120)
      {
        message="You might have a bradycardia.Consult a doctor soon"
      }
      else
      {
        message="Give a Valid input"
      }
    }
    else if(user_age>=5 && user_age<=6)
    {
      if(user_rates>=75 && user_rates>=115) 
      {
         message="You have a normal heartbeat"
      }
      else if(user_rates<75)
      {
        message="You might have a bradycardia.Consult a doctor soon"
      }
      else if(user_rates>115)
      {
        message="You might have a bradycardia.Consult a doctor soon"
      }
      else
      {
        message="Give a Valid input"
      }
    }
    else if(user_age>7 && user_age<=9)
    {
      if(user_rates>=70 && user_rates<=100)
      {
        message="You have a normal heartbeat"
      }
      else if (user_rates<70)
      {
        message="You might have a bradycardia.Consult a doctor soon"
      }
      else if (user_rates>100)
      {
        message="You might have a bradycardia.Consult a doctor soon"
      }
      else
      {
        message="Give a Valid input"
      }
    }
    else if (user_age>10)
    {
      if(Suser_rates>=60 && user_rates<=100)
      {
        message="You have a normal heartbeat"
      }
      else if (user_rates<60)
      {
        message="You might have a bradycardia.Consult a doctor soon"
      }
      else if (user_rates>100)
      {
        message="You might have a bradycardia.Consult a doctor soon"
      }
      else
      {
        message="Give a Valid input"
      }
    }}
  }
  else if(user_category="Adult")
  {
    if(user_gender="Male")
    {
      if(user_age>=18 && user_age<=25)
      {
        if(user_rates>=56 && user_rates<=73)
        {
          message="You have a normal heartbeat"
        }
        else if (user_rates<50)
        {
        message="You might have a bradycardia.Consult a doctor soon"
        }
        else if (user_rates>73)
       {
         message="You might have a bradycardia.Consult a doctor soon"
        }
        else
      {
        message="Give a Valid input"
      }
      }
      else if(user_age>=26 && user_age<=35)
      {
        if(user_rates>=55 && user_rates<=74)
        {
          message="You have a normal heartbeat"
        }
        else if (user_rates<55)
        {
        message="You might have a bradycardia.Consult a doctor soon"
        }
        else if (user_rates>74)
       {
         message="You might have a bradycardia.Consult a doctor soon"
        }
        else
      {
        message="Give a Valid input"
      }
      }
      else if(user_age>=36 && user_age<=45)
      {
        if(user_rates>=57 && user_rates<=75)
        {
          message="You have a normal heartbeat"
        }
        else if (user_rates<57)
        {
        message="You might have a bradycardia.Consult a doctor soon"
        }
        else if (user_rates>75)
       {
         message="You might have a bradycardia.Consult a doctor soon"
        }
        else
      {
        message="Give a Valid input"
      }
      }
      else if(user_age>=46 && user_age<=55)
      {
        if(user_rates>=57 && user_rates<=75)
        {
          message="You have a normal heartbeat"
        }
        else if (user_rates<57)
        {
        message="You might have a bradycardia.Consult a doctor soon"
        }
        else if (user_rates>75)
       {
         message="You might have a bradycardia.Consult a doctor soon"
        }
        else
      {
        message="Give a Valid input"
      }
      }
      else if(user_age>=56 && user_age<=65)
      {
        if(user_rates>=57 && user_rates<=75)
        {
          message="You have a normal heartbeat"
        }
        else if (user_rates<57)
        {
        message="You might have a bradycardia.Consult a doctor soon"
        }
        else if (user_rates>75)
       {
         message="You might have a bradycardia.Consult a doctor soon"
        }
        else
      {
        message="Give a Valid input"
      }
      }
      else if(user_age>65)
      {
        if(user_rates>=56 && user_rates<=73)
        {
          message="You have a normal heartbeat"
        }
        else if (user_rates<56)
        {
        message="You might have a bradycardia.Consult a doctor soon"
        }
        else if (user_rates>73)
       {
         message="You might have a bradycardia.Consult a doctor soon"
        }
        else
        {
         message="Give a Valid input"
        }
      }

    }
    else if(user_gender="Female")
    {
      if(user_age>=18 && user_age<=25)
      {
        if(user_rates>=61 && user_rates<=70)
        {
          message="You have a normal heartbeat"
        }
        else if (user_rates<61)
        {
        message="You might have a bradycardia.Consult a doctor soon"
        }
        else if (user_rates>70)
       {
         message="You might have a bradycardia.Consult a doctor soon"
        }
        else
      {
        message="Give a Valid input"
      }
      }
      else if(user_age>=26 && user_age<=35)
      {
        if(user_rates>=60 && user_rates<=76)
        {
          message="You have a normal heartbeat"
        }
        else if (user_rates<60)
        {
        message="You might have a bradycardia.Consult a doctor soon"
        }
        else if (user_rates>76)
       {
         message="You might have a bradycardia.Consult a doctor soon"
        }
        else
      {
        message="Give a Valid input"
      }
      }
      else if(user_age>=36 && user_age<=45)
      {
        if(user_rates>=60 && user_rates<=78)
        {
          message="You have a normal heartbeat"
        }
        else if (user_rates<60)
        {
        message="You might have a bradycardia.Consult a doctor soon"
        }
        else if (user_rates>78)
       {
         message="You might have a bradycardia.Consult a doctor soon"
        }
        else
      {
        message="Give a Valid input"
      }
      }
      else if(user_age>=46 && user_age<=55)
      {
        if(user_rates>=61 && user_rates<=77)
        {
          message="You have a normal heartbeat"
        }
        else if (user_rates<61)
        {
        message="You might have a bradycardia.Consult a doctor soon"
        }
        else if (user_rates>77)
       {
         message="You might have a bradycardia.Consult a doctor soon"
        }
        else
      {
        message="Give a Valid input"
      }
      }
      else if(user_age>=56 && user_age<=65)
      {
        if(user_rates>=60 && user_rates<=77)
        {
          message="You have a normal heartbeat"
        }
        else if (user_rates<60)
        {
        message="You might have a bradycardia.Consult a doctor soon"
        }
        else if (user_rates>77)
       {
         message="You might have a bradycardia.Consult a doctor soon"
        }
        else
      {
        message="Give a Valid input"
      }
      }
      else if(user_age>65)
      {
        if(user_rates>=60 && user_rates<=76)
        {
          message="You have a normal heartbeat"
         }
        else if (user_rates<60)
        {
        message="You might have a bradycardia.Consult a doctor soon"
        }
        else if (user_rates>76)
       {
         message="You might have a bradycardia.Consult a doctor soon"
        }
        else
       {
        message="Give a Valid input"
        }
      }
    }
  }
  else
  {
    message="Give a Valid input"
  } 
  selectquery="select * from tbl_metrics_calculation_result where Userid='"+(usersessiondata)+"'";
  connection.query(selectquery,function(err,result)
  {
    if(err)
    {
      throw err;
    }
    else{
      if (result.length>0)
      {
        ratequery="update  tbl_metrics_calculation_result set heartrate='"+parseInt(Score)+"' where Userid='"+(usersessiondata)+"'";
        connection.query(ratequery,function(err,result,data)
        {
          if(err)
              { 
                throw err;
              }
          else
              {
                const flashMessage = req.app.get('flashMessage');
                req.flash('message',[message,flashMessage]);
                res.render('admin/heartrate',{message,flashMessage});  
              }
        })
      }
      else{
        hrate=parseInt(Score);
        const usersessiondata=req.session.sessname
  ratequery="insert into tbl_metrics_calculation_result(Userid,heartrate) values('"+(usersessiondata)+"','"+hrate+"')";
  connection.query(ratequery,function(err,res,data)
  {
    if(err)
        { 
          //console.log(Score);
          //console.log(usersessiondata)
          throw err;
          
        }
    else
        {
          const flashMessage = req.app.get('flashMessage');
                req.flash('message',[message,flashMessage]);
                res.render('admin/heartrate',{message,flashMessage});   
        }
  })
      }
    }
  })
  
});


router.post('/calheartusunits',function(req,res)
{
   var user_age=req.body.user_age;
   var user_inch=req.body.user_inch;
   var user_feet=req.body.user_feet;
   var user_weight=req.body.user_weight;
   var user_rates=req.body.user_rates;
   var user_gender=req.body.user_gender;
   var user_category=req.body.user_category;
   var message;
  var Score=Math.trunc((user_rates) / 100 * 100)

  if(user_category=="child") 
  {
    if(user_gender =="male " || user_gender=="female")
    {
     if(user_age>=3 && user_age<=4)
     {
      if(user_rates>=80 && user_rates<=120)
       {
          message="You have a normal heartbeat";
       }
      else if(user_rates<80)
      {
        message="You might have a bradycardia.Consult a doctor soon"
      }
      else if(user_rates>120)
      {
        message="You might have a bradycardia.Consult a doctor soon"
      }
      else
      {
        message="Give a Valid input"
      }
    }
    else if(user_age>=5 && user_age<=6)
    {
      if(user_rates>=75 && user_rates>=115) 
      {
         message="You have a normal heartbeat"
      }
      else if(user_rates<75)
      {
        message="You might have a bradycardia.Consult a doctor soon"
      }
      else if(user_rates>115)
      {
        message="You might have a bradycardia.Consult a doctor soon"
      }
      else
      {
        message="Give a Valid input"
      }
    }
    else if(user_age>7 && user_age<=9)
    {
      if(user_rates>=70 && user_rates<=100)
      {
        message="You have a normal heartbeat"
      }
      else if (user_rates<70)
      {
        message="You might have a bradycardia.Consult a doctor soon"
      }
      else if (user_rates>100)
      {
        message="You might have a bradycardia.Consult a doctor soon"
      }
      else
      {
        message="Give a Valid input"
      }
    }
    else if (user_rates>10)
    {
      if(user_rates>=60 && user_rates<=100)
      {
        message="You have a normal heartbeat"
      }
      else if (user_rates<60)
      {
        message="You might have a bradycardia.Consult a doctor soon"
      }
      else if (user_rates>100)
      {
        message="You might have a bradycardia.Consult a doctor soon"
      }
      else
      {
        message="Give a Valid input"
      }
    }}
  }
  else if(user_category="Adult")
  {
    if(user_gender="Male")
    {
      if(user_age>=18 && user_age<=25)
      {
        if(user_rates>=56 && user_rates<=73)
        {
          message="You have a normal heartbeat"
        }
        else if (user_rates<50)
        {
        message="You might have a bradycardia.Consult a doctor soon"
        }
        else if (user_rates>73)
       {
         message="You might have a bradycardia.Consult a doctor soon"
        }
        else
      {
        message="Give a Valid input"
      }
      }
      else if(user_age>=26 && user_age<=35)
      {
        if(user_rates>=55 && user_rates<=74)
        {
          message="You have a normal heartbeat"
        }
        else if (user_rates<55)
        {
        message="You might have a bradycardia.Consult a doctor soon"
        }
        else if (user_rates>74)
       {
         message="You might have a bradycardia.Consult a doctor soon"
        }
        else
      {
        message="Give a Valid input"
      }
      }
      else if(user_age>=36 && user_age<=45)
      {
        if(user_rates>=57 && Suser_rates<=75)
        {
          message="You have a normal heartbeat"
        }
        else if (user_rates<57)
        {
        message="You might have a bradycardia.Consult a doctor soon"
        }
        else if (user_rates>75)
       {
         message="You might have a bradycardia.Consult a doctor soon"
        }
        else
      {
        message="Give a Valid input"
      }
      }
      else if(user_age>=46 && user_age<=55)
      {
        if(user_rates>=57 && user_rates<=75)
        {
          message="You have a normal heartbeat"
        }
        else if (user_rates<57)
        {
        message="You might have a bradycardia.Consult a doctor soon"
        }
        else if (user_rates>75)
       {
         message="You might have a bradycardia.Consult a doctor soon"
        }
        else
      {
        message="Give a Valid input"
      }
      }
      else if(user_age>=56 && user_age<=65)
      {
        if(user_rates>=57 && user_rates<=75)
        {
          message="You have a normal heartbeat"
        }
        else if (user_rates<57)
        {
        message="You might have a bradycardia.Consult a doctor soon"
        }
        else if (user_rates>75)
       {
         message="You might have a bradycardia.Consult a doctor soon"
        }
        else
      {
        message="Give a Valid input"
      }
      }
      else if(user_age>65)
      {
        if(user_rates>=56 && user_rates<=73)
        {
          message="You have a normal heartbeat"
        }
        else if (user_rates<56)
        {
        message="You might have a bradycardia.Consult a doctor soon"
        }
        else if (user_rates>73)
       {
         message="You might have a bradycardia.Consult a doctor soon"
        }
        else
        {
         message="Give a Valid input"
        }
      }

    }
    else if(user_gender="Female")
    {
      if(user_age>=18 && user_age<=25)
      {
        if(user_rates>=61 && user_rates<=70)
        {
          message="You have a normal heartbeat"
        }
        else if (user_rates<61)
        {
        message="You might have a bradycardia.Consult a doctor soon"
        }
        else if (user_rates>70)
       {
         message="You might have a bradycardia.Consult a doctor soon"
        }
        else
      {
        message="Give a Valid input"
      }
      }
      else if(user_age>=26 && user_age<=35)
      {
        if(user_rates>=60 && user_rates<=76)
        {
          message="You have a normal heartbeat"
        }
        else if (user_rates<60)
        {
        message="You might have a bradycardia.Consult a doctor soon"
        }
        else if (user_rates>76)
       {
         message="You might have a bradycardia.Consult a doctor soon"
        }
        else
      {
        message="Give a Valid input"
      }
      }
      else if(user_age>=36 && user_age<=45)
      {
        if(user_rates>=60 && user_rates<=78)
        {
          message="You have a normal heartbeat"
        }
        else if (user_rates<60)
        {
        message="You might have a bradycardia.Consult a doctor soon"
        }
        else if (user_rates>78)
       {
         message="You might have a bradycardia.Consult a doctor soon"
        }
        else
      {
        message="Give a Valid input"
      }
      }
      else if(user_age>=46 && user_age<=55)
      {
        if(user_rates>=61 && user_rates<=77)
        {
          message="You have a normal heartbeat"
        }
        else if (user_rates<61)
        {
        message="You might have a bradycardia.Consult a doctor soon"
        }
        else if (user_rates>77)
       {
         message="You might have a bradycardia.Consult a doctor soon"
        }
        else
      {
        message="Give a Valid input"
      }
      }
      else if(user_age>=56 && user_age<=65)
      {
        if(user_rates>=60 && user_rates<=77)
        {
          message="You have a normal heartbeat"
        }
        else if (user_rates<60)
        {
        message="You might have a bradycardia.Consult a doctor soon"
        }
        else if (user_rates>77)
       {
         message="You might have a bradycardia.Consult a doctor soon"
        }
        else
      {
        message="Give a Valid input"
      }
      }
      else if(user_age>65)
      {
        if(user_rates>=60 && user_rates<=76)
        {
          message="You have a normal heartbeat"
         }
        else if (user_rates<60)
        {
        message="You might have a bradycardia.Consult a doctor soon"
        }
        else if (user_rates>76)
       {
         message="You might have a bradycardia.Consult a doctor soon"
        }
        else
       {
        message="Give a Valid input"
        }
      }
    }
  }
  else
  {
    message="Give a Valid input"
  } 
  const usersessiondata=req.session.sessname
  selectquery="select * from tbl_user_registration where Userid='"+(usersessiondata)+"'";
  connection.query(selectquery,function(err,result)
  {
    if(err)
    {
      throw err;
    }
    else{
      if (result.length>0)
      {
        ratequery="update  tbl_us_calculation_result set heartrate='"+parseInt(Score)+"' where Userid='"+(usersessiondata)+"'";
        connection.query(ratequery,function(err,result,data)
        {
          if(err)
              { 
                throw err;
              }
          else
              {
                const flashMessage = req.app.get('flashMessage');
                req.flash('message',[message,flashMessage]);
                res.render('admin/heartrate',{message,flashMessage});   
              }
        })
      }
      else{
        hrate=parseInt(Score);
        
  ratequery="insert into tbl_us_calculation_result (Userid,heartrate) values('"+(usersessiondata)+"','"+hrate+"')";
  connection.query(ratequery,function(err,res,data)
  {
    if(err)
        { 
          //console.log(Score);
          //console.log(usersessiondata)
          throw err;
          
        }
    else
        {
          const flashMessage = req.app.get('flashMessage');
                req.flash('message',[message,flashMessage]);
                res.render('admin/heartrate',{message,flashMessage});   
        }
  })
      }
    }
  })
  
});


router.post('/caloxygenmetricunits',function(req,res)
{
  var user_age=req.body.user_age
  var user_height=req.body.user_height 
  var user_weight=req.body.user_weight
  var user_oxygen=req.body.user_oxygen
  var user_gender=req.body.user_gender;
  var message;
  const usersessiondata=req.session.sessname
  var Score=Math.trunc((user_oxygen / 550 )* 100)
  
  if (user_gender == "Male" || user_gender == "Female") {
    if (user_age >= 18 && user_age <= 65) {
        if (user_oxygen == 550) {
            message = "Normal - You are inhaling enough oxygen and you are healthy";
        } else if (user_oxygen > 550) {
            message = "Inhaling more than required - consult a doctor.";
        } else if (user_oxygen < 550) {
            message = "Your inhalation is less than required and can be harmful to your body - see a doctor.";
        } else {
            message = "Give a valid input";
        }
    } else if (user_age < 18) {
        message = "Age below 18 - consult a pediatrician for proper guidance.";
    } else if (user_age > 65) {
        message = "Age above 65 - consult a healthcare professional for proper assessment.";
    } else {
        message = "Give a valid age input";
    }
} else {
    message = "Give a valid gender input";
}


  
  selectquery="select * from tbl_metrics_calculation_result where Userid='"+(usersessiondata)+"'";
  connection.query(selectquery,function(err,result)
  {
    if(err)
    {
      throw err;
    }
    else{
      if (result.length>0)
      {
        oxygenquery="update  tbl_metrics_calculation_result set oxygenintake='"+parseInt(Score)+"' where Userid='"+(usersessiondata)+"'";
        connection.query(oxygenquery,function(err,result,data)
        {
          if(err)
              { 
                throw err;
              }
          else
              {
                const flashMessage = req.app.get('flashMessage');
                req.flash('message',[message,flashMessage]);
                res.render('admin/oxygenmonitor',{message,flashMessage});   
              }
        })
      }
      else{
        ointake=parseInt(Score);
        const usersessiondata=req.session.sessname
  oxygenquery="insert into tbl_metrics_calculation_result(Userid,oxygenintake) values('"+(usersessiondata)+"','"+ointake+"')";
  connection.query(oxygenquery,function(err,res,data)
  {
    if(err)
        { 
          //console.log(Score);
          //console.log(usersessiondata)
          throw err;
          
        }
    else
        {
          const flashMessage = req.app.get('flashMessage');
                req.flash('message',[message,flashMessage]);
                res.render('admin/oxygenmonitor',{message,flashMessage});  
        }
  })
      }
    }
  })
})

router.post('/caloxygenusunits',function(req,res)
{
  var user_age=req.body.user_age
  var user_inch=req.body.user_inch
  var user_feet=req.body.user_feet
  var user_weight=req.body.user_weight
  var user_oxygen=req.body.user_oxygen
  var user_gender=req.body.user_gender;
  var message;
  var Score=Math.trunc((user_oxygen) / 550 * 100)
  
  if(user_gender=="Male" || user_gender=="Female")
  {
    if(user_oxygen==550)
    {
      message="Normal-You are inhaling enough oxygen and you are Healthy"
    }
    else if (user_oxygen>550)
    { 
      message="Inhaling more than required consult a doctor."
    }
    else if(user_oxygen<550)
    {
      message="You are inhalation is less than required and can be harmful to your body to see doctor."
    }
    else
    {
      message="Give a valid input" 
    }
  }
  else
  {
      message="Give a valid input" 
  }
  
  const usersessiondata=req.session.sessname
  selectquery="select * from tbl_us_calculation_result where Userid='"+(usersessiondata)+"'";
  connection.query(selectquery,function(err,result)
  {
    if(err)
    {
      throw err;
    }
    else{
      if (result.length>0)
      {
        oxygenquery="update tbl_us_calculation_result set oxygenintake='"+parseInt(Score)+"' where Userid='"+(usersessiondata)+"'";
        connection.query(oxygenquery,function(err,result,data)
        {
          if(err)
              { 
                throw err;
              }
          else
              {
                const flashMessage = req.app.get('flashMessage');
                req.flash('message',[message,flashMessage]);
                res.render('admin/oxygenmonitor',{message,flashMessage});   
              }
        })
      }
      else{
        ointake=parseInt(Score);
        
  oxygenquery="insert into tbl_us_calculation_result(Userid,oxygenintake) values('"+(usersessiondata)+"','"+ointake+"')";
  connection.query(oxygenquery,function(err,res,data)
  {
    if(err)
        { 
          //console.log(Score);
          //console.log(usersessiondata)
          throw err;
          
        }
    else
        {
          const flashMessage = req.app.get('flashMessage');
                req.flash('message',[message,flashMessage]);
                res.render('admin/oxygenmonitor',{message,flashMessage});    
        }
  })
      }
    }
  })
})




var mysql=require("mysql");
var connection=mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"root",
    database:"healthscore"
    
});
connection.connect(function(err)
{
    if(err)
    {
        console.log("error while connecting to database")
    }
    else
    {
        console.log("Connected to database")   
    }
});
router.post("/inserthealthpractitioner",function(req,res)
{
  var username=req.body.user_name
  var firstname=req.body.first_name
  var lastname=req.body.last_name
  var password=req.body.user_pwd
  var mobile=req.body.user_mobile
  var emailid=req.body.user_email
  var gender=req.body.user_gender
  var country=req.body.user_country
  var state=req.body.user_state
  var city=req.body.user_city 
  var appdate=req.body.appdate
  var address=req.body.user_address
  var specialization=req.body.specialization;
  var imgname=req.body.user_file
  var toc=req.body.user_toc 
  

  var sql=`insert into tbl_health_practitioner_registration(username,firstname,lastname,password,mobile,emailid,gender,country,state,city,appdate,address,specialization,imgname,toc) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  connection.query(sql,[username,firstname,lastname,password,mobile,emailid,gender,country,state,city,appdate,address,specialization,imgname,toc] ,function(err,data,res){
    if(err)
    {
      throw(err)
    }
    else 
    {
      console.log("Registered Successfully")
      req.flash('message','Registered Successfully');
      res.redirect('user/practioner',{message:req.flash('message')});
    }
  }
  )}
  );

router.post("/insertpatient",function(req,res)
{
  var username=req.body.user_name
  var firstname=req.body.first_name
  var lastname=req.body.last_name
  var password=req.body.user_pwd
  var mobile=req.body.user_mobile
  var emailid=req.body.user_email
  var gender=req.body.user_gender
  var country=req.body.user_country
  var state=req.body.user_state
  var city=req.body.user_city 
  var appdate=req.body.appdate
  var address=req.body.user_address
  var toc=req.body.user_toc  
  
  var sql=`insert into tbl_user_registration(username,firstname,lastname,password,mobile,emailid,gender,country,state,city,udob,address,toc) values(?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  connection.query(sql,[username,firstname,lastname,password,mobile,emailid,gender,country,state,city,appdate,address,toc] ,function(err,data,result){
    if(err)
    {
      throw(err)
    }
    else 
    {
      console.log("Registered Successfully")
      req.flash('message','Registered Successfully');
      res.render("user/patientsignup",{message:req.flash('message')})
      
    }
  }
  )}
  );

/*router.post("/updatepassword",function(req,res)
{
  var emailid=req.body.user_email
  var password=req.body.user_npwd
  var password=req.body.user_cpwd
  var usertype=req.body.user_type

  connection.query("select * from function tbl_health_practitioner_registration",function(err,result,emailid,password,password,user_type){
    if(err)
    {
      throw(err);
      
    }
    else 
    {
      for(var i=0;i<result.length;i++)
      {
        var row=result[i];
        console.log(row.emailid,row.password);
      }
    }
  }
  )}
  );*/

router.get('/logout', function(req, res, next) {
  res.render('admin/index');
});

router.post('/calcaloriesmetricunits',function(req,res)
{
  var user_age=req.body.user_age
  var user_height=req.body.user_height
  var user_weight=req.body.user_weight
  var user_calories=req.body.user_calories
  var user_gender=req.body.user_gender
  var user_category=req.body.user_category
  var message;
  const usersessiondata=req.session.sessname
  var Score=Math.trunc((user_calories) / 2000 * 100)

  if(user_gender=="Female")
  {
    if(user_category=="Sedentary")
    {
      if(user_age>=2 && user_age<=3)
      {
        if(user_calories==1000)
        {
          message="Consuming right calories";
        }
        
        else if(user_calories<1000)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1000)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if( user_age>=4 && user_age<=7)
      {
        if(user_calories==1200)
        {
          message="consuming right calories";
        }
        else if(user_calories<1200)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1200)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=8 && user_age<=10)
      {
        if(user_calories==1400)
        {
          message="consuming right calories";
        }
        else if(user_calories<1400)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1400)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=11 && user_age<=13) 
      {
        if(user_calories==1600)
        {
          message="consuming right calories";
        }
        else if(user_calories<1600)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1600)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=14 && user_age<=18) 
      {
        if(user_calories==1800)
        {
          message="consuming right calories";
        }
        else if(user_calories<1800)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1800)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=19 && user_age<=25)
      {
        if(user_calories==2000)
        {
          message="consuming right calories";
        }
        else if(user_calories<2000)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>2000)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=26 && user_age<=50)
      {
        if(user_calories==1800)
        {
          message="consuming right calories";
        }
        else if(user_calories<1800)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1800)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if (user_age>=51 && user_age<=150)
      {
        if(user_calories==1600)
        {
          message="consuming right calories";
        }
        else if(user_calories<1600)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1600)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else
      {
        message="Give a Valid Input";
      }
    }
    else if(user_category=="Moderately Active")
    {
      if(user_age==2)
      {
        if(user_calories==1000)
        {
          message="consuming right calories";
        }
        else if(user_calories<1000)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1000)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age==3)
      {
        if(user_calories==1200)
        {
          message="consuming right calories";
        }
        else if(user_calories<1200)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1200)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=4 && user_age<=6)
      {
        if(user_calories==1400)
        {
          message="consuming right calories";
        }
        else if(user_calories<1400)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1400)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=7 && user_age<=9)
      {
        if(user_calories==1600)
        {
          message="consuming right calories";
        }
        else if(user_calories<1600)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1600)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=10 && user_age<=11)
      {
        if(user_calories==1800)
        {
          message="consuming right calories";
        }
        else if(user_calories<1800)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1800)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=12 && user_age<=18)
      {
        if(user_calories==2000)
        {
          message="consuming right calories";
        }
        else if(Suser_calories<2000)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>2000)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=19 && user_age<=25)
      {
        if(user_calories==2200)
        {
          message="consuming right calories";
        }
        else if(user_calories<2200)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>2200)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=26 && user_age<=50)
      {
        if(user_calories==2000)
        {
          message="consuming right calories";
        }
        else if(user_calories<2000)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>2000)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=51 && user_age<=150)
      {
        if(user_calories==1600)
        {
          message="consuming right calories";
        }
        else if(user_calories<1600)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1600)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
    }

    else if(user_category=="Active")
    {
      if(user_age==2)
      {
        if(user_calories==1000)
        {
          message="consuming right calories";
        }
        else if(user_calories<1000)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1000)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=3 && user_age<=4)
      {
        if(user_calories==1400)
        {
          message="consuming right calories";
        }
        else if(user_calories<1400)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1400)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=5 && user_age<=6)
      {
        if(user_calories==1600)
        {
          message="consuming right calories";
        }
        else if(user_calories<1600)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1600)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=7 && user_age<=9)
      {
        if(user_calories==1800)
        {
          message="consuming right calories";
        }
        else if(user_calories<1800)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1800)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=10 && user_age<=11)
      {
        if(user_calories==2000)
        {
          message="consuming right calories";
        }
        else if(user_calories<2000)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>2000)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=12 && user_age<=13)
      {
        if(user_calories==2200)
        {
          message="consuming right calories";
        }
        else if(user_calories<2200)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>2200)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=14 && user_age<=30)
      {
        if(user_calories==2400)
        {
          message="consuming right calories";
        }
        else if(user_calories<2400)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>2400)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=31 && user_age<=60)
      {
        if(user_calories==2200)
        {
          message="consuming right calories";
        }
        else if(user_calories<2200)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>2200)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=61 && user_age<=150)
      {
        if(user_calories==1400)
        {
          message="Consuming right calories";
        }
        else if(user_calories<1400)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1400)
        {
          message="you need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else
      {
        message="Give a Valid Input"
      }
    }
    else
    {
      message="Give a Valid Input";
    }
  }
  else if(user_gender=="Male")
  {
    if(user_category=="Sedentary")
    {
      if(user_age>=2 && user_age<=3)
      {
        if(user_calories==1000)
        {
          message="Consuming right calories"
        }
        else if(user_calories<1000)
        {
          message="You need to consume more calories"
        }
        else if(user_calories>1000)
        {
          message="You need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=4 && user_age<=5)
      {
        if(user_calories==1200)
        {
          message="Consuming right calories"
        }
        else if(user_calories<1200)
        {
          message="You need to consume more calories"
        }
        else if(user_calories>1200)
        {
          message="You need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=6 && user_age<=8)
      {
        if(user_calories==1400)
        {
          message="Consuming right calories"
        }
        else if(user_calories<1400)
        {
          message="You need to consume more calories"
        }
        else if(user_calories>1400)
        {
          message="You need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=9 && user_age<=10)
      {
        if(user_calories==1600)
        {
          message="Consuming right calories"
        }
        else if(user_calories<1600)
        {
          message="You need to consume more calories"
        }
        else if(user_calories>1600)
        {
          message="You need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=11 && user_age<=12)
      {
        if(user_calories==1800)
        {
          message="Consuming right calories"
        }
        else if(user_calories<1800)
        {
          message="You need to consume more calories"
        }
        else if(user_calories>1800)
        {
          message="You need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=13 && user_age<=14)
      {
        if(user_calories==2000)
        {
          message="Consuming right calories"
        }
        else if(user_calories<2000)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2000)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age==15)
      {
        if(user_calories==2200)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2200)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2200)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=16 && user_age<=18)
      {
        if(user_calories==2400)
        {
          message="Consuming right calories"
        }
        else if(user_calories<2400)
        {
          message="You need to consume more calories"
        }
        else if(user_calories>2400)
        {
          message="You need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=19 && user_age<=20)
      {
        if(user_calories==2600)
        {
          message="Consuming right calories"
        }
        else if(user_calories<2600)
        {
          message="You need to consume more calories"
        }
        else if(user_calories>2600)
        {
          message="You need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=21 && user_age<=40)
      {
        if(user_calories==2400)
        {
          message="Consuming right calories"
        }
        else if(user_calories<2400)
        {
          message="You need to consume more calories"
        }
        else if(user_calories>2400)
        {
          message="You need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=41 && user_age<=60)
      {
        if(user_calories==2200)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2200)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2200)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=61 && user_age<=150)
      {
        if(user_calories==2000)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2000)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2000)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else
      {
        message="Give a Valid Input";
      }
    }
    else if(user_category=="Moderately Active")
    {
      if(user_age==2)
      {
        if(user_calories==1000)
        {
          message="Consuming right calories";
        }
        else if(user_calories<1000)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>1000)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      if(user_age>2 && user_age<=5)
      {
        if(user_calories==1400)
        {
          message="Consuming right calories";
        }
        else if(user_calories<1400)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>1400)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=6 && user_age<=8)
      {
        if(user_calories==1600)
        {
          message="Consuming right calories";
        }
        else if(user_calories<1600)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>1600)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=9 && user_age<=10)
      {
        if(user_calories==1800)
        {
          message="Consuming right calories";
        }
        else if(user_calories<1800)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>1800)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age==11)
      {
        if(user_calories==2000)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2000)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2000)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=12 && user_age<=13)
      {
        if(user_calories==2200)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2200)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2200)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age==14)
      {
        if(user_calories==2400)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2400)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2400)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age==15)
      {
        if(user_calories==2600)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2600)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2600)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=16 && user_age<=25)
      {
        if(user_calories==2800)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2800)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2800)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=26 && user_age<=45)
      {
        if(user_calories==2600)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2600)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2600)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=46 && user_age<=65)
      {
        if(user_calories==2400)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2400)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2400)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=66 && user_age<=150)
      {
        if(user_calories==2200)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2200)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2200)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else
      {
          message="Give a Valid Input";
      }
    }
    else if(user_category=="Active")
    {
      if(user_age==2)
      {
        if(user_calories==1000)
        {
          message="Consuming right calories";
        }
        else if(user_calories<1000)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>1000)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age==3)
      {
        if(user_calories==1400)
        {
          message="Consuming right calories";
        }
        else if(user_calories<1400)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>1400)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=4 && user_age<=5)
      {
        if(user_calories==1600)
        {
          message="Consuming right calories";
        }
        else if(user_calories<1600)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>1600)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=6 && user_age<=7)
      {
        if(user_calories==1800)
        {
          message="Consuming right calories";
        }
        else if(user_calories<1800)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>1800)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=8 && user_age<=9)
      {
        if(user_calories==2000)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2000)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2000)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=10 && user_age<=11)
      {
        if(user_calories==2200)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2200)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2200)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age==12)
      {
        if(user_calories==2400)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2400)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2400)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age==13)
      {
        if(user_calories==2600)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2600)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2600)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age==14)
      {
        if(user_calories==2800)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2800)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2800)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age==15)
      {
        if(user_calories==3000)
        {
          message="Consuming right calories";
        }
        else if(user_calories<3000)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>3000)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=16 && user_age<=18)
      {
        if(user_calories==3200)
        {
          message="Consuming right calories";
        }
        else if(user_calories<3200)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>3200)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=19 && user_age<=35)
      {
        if(user_calories==3000)
        {
          message="Consuming right calories";
        }
        else if(user_calories<3000)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>3000)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=36 && user_age<=55)
      {
        if(user_calories==2800)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2800)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2800)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=56 && user_age<=75)
      {
        if(user_calories==2600)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2600)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2600)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>75)
      {
        if(user_calories==2400)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2400)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2400)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else
      {
      message="Give a Valid Input";
     }
  }
  else
    {
      message="Give a Valid Input";
    }
}
else
{
   message="Give a Valid Input";
}

selectquery="select * from tbl_metrics_calculation_result where Userid='"+(usersessiondata)+"'";
  connection.query(selectquery,function(err,result)
  {
    if(err)
    {
      throw err;
    }
    else{
      if (result.length>0)
      {
        caloquery="update  tbl_metrics_calculation_result set caloriescount='"+parseInt(Score)+"' where Userid='"+(usersessiondata)+"'";
        connection.query(caloquery,function(err,result,data)
        {
          if(err)
              { 
                throw err;
              }
          else
              {
                const flashMessage = req.app.get('flashMessage');
          req.flash('message',[message,flashMessage]);
          res.render('admin/caloriescount',{message,flashMessage});     
              }
        })
      }
      else{
        calory=parseInt(Score);
        const usersessiondata=req.session.sessname
  caloquery="insert into tbl_metrics_calculation_result(Userid,caloriescount) values('"+(usersessiondata)+"','"+calory+"')";
  connection.query(caloquery,function(err,res,data)
  {
    if(err)
        { 
          //console.log(Score);
          //console.log(usersessiondata)
          throw err;
          
        }
    else
        {
          const flashMessage = req.app.get('flashMessage');
          req.flash('message',[message,flashMessage]);
          res.render('admin/caloriescount',{message,flashMessage});  
        }
  })
      }
    }
  })
})

router.post('/calcaloriesusunits',function(req,res)
{
  var user_age=req.body.user_age
  var user_inch=req.body.user_inch
  var user_feet=req.body.user_feet
  var user_weight=req.body.user_weight
  var user_calories=req.body.user_calories
  var user_gender=req.body.user_gender
  var user_category=req.body.user_category
  var message;
  
  var Score=Math.trunc((user_calories) / 2000 * 100)

  if(user_gender=="Female")
  {
    if(user_category=="Sedentary")
    {
      if(user_age>=2 && user_age<=3)
      {
        if(user_calories==1000)
        {
          message="consuming right calories";
        }
        
        else if(user_calories<1000)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1000)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if( user_age>=4 && user_age<=7)
      {
        if(user_calories==1200)
        {
          message="consuming right calories";
        }
        else if(user_calories<1200)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1200)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=8 && user_age<=10)
      {
        if(user_calories==1400)
        {
          message="consuming right calories";
        }
        else if(user_calories<1400)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1400)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=11 && user_age<=13) 
      {
        if(user_calories==1600)
        {
          message="consuming right calories";
        }
        else if(user_calories<1600)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1600)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=14 && user_age<=18) 
      {
        if(user_calories==1800)
        {
          message="consuming right calories";
        }
        else if(user_calories<1800)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1800)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=19 && user_age<=25)
      {
        if(user_calories==2000)
        {
          message="consuming right calories";
        }
        else if(user_calories<2000)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>2000)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=26 && user_age<=50)
      {
        if(user_calories==1800)
        {
          message="consuming right calories";
        }
        else if(user_calories<1800)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1800)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if (user_age>=51 && user_age<=150)
      {
        if(user_calories==1600)
        {
          message="consuming right calories";
        }
        else if(user_calories<1600)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1600)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else
      {
        message="Give a Valid Input";
      }
    }
    else if(user_category=="Moderately Active")
    {
      if(user_age==2)
      {
        if(user_calories==1000)
        {
          message="consuming right calories";
        }
        else if(user_calories<1000)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1000)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age==3)
      {
        if(user_calories==1200)
        {
          message="consuming right calories";
        }
        else if(user_calories<1200)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1200)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=4 && user_age<=6)
      {
        if(user_calories==1400)
        {
          message="consuming right calories";
        }
        else if(user_calories<1400)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1400)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=7 && user_age<=9)
      {
        if(user_calories==1600)
        {
          message="consuming right calories";
        }
        else if(user_calories<1600)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1600)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=10 && user_age<=11)
      {
        if(user_calories==1800)
        {
          message="consuming right calories";
        }
        else if(user_calories<1800)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1800)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=12 && user_age<=18)
      {
        if(user_calories==2000)
        {
          message="consuming right calories";
        }
        else if(Suser_calories<2000)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>2000)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=19 && user_age<=25)
      {
        if(user_calories==2200)
        {
          message="consuming right calories";
        }
        else if(user_calories<2200)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>2200)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=26 && user_age<=50)
      {
        if(user_calories==2000)
        {
          message="consuming right calories";
        }
        else if(user_calories<2000)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>2000)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=51 && user_age<=150)
      {
        if(user_calories==1600)
        {
          message="consuming right calories";
        }
        else if(user_calories<1600)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1600)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
    }

    else if(user_category=="Active")
    {
      if(user_age==2)
      {
        if(user_calories==1000)
        {
          message="consuming right calories";
        }
        else if(user_calories<1000)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1000)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=3 && user_age<=4)
      {
        if(user_calories==1400)
        {
          message="consuming right calories";
        }
        else if(user_calories<1400)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1400)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=5 && user_age<=6)
      {
        if(user_calories==1600)
        {
          message="consuming right calories";
        }
        else if(user_calories<1600)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1600)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=7 && user_age<=9)
      {
        if(user_calories==1800)
        {
          message="consuming right calories";
        }
        else if(user_calories<1800)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1800)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=10 && user_age<=11)
      {
        if(user_calories==2000)
        {
          message="consuming right calories";
        }
        else if(user_calories<2000)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>2000)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=12 && user_age<=13)
      {
        if(user_calories==2200)
        {
          message="consuming right calories";
        }
        else if(user_calories<2200)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>2200)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=14 && user_age<=30)
      {
        if(user_calories==2400)
        {
          message="consuming right calories";
        }
        else if(user_calories<2400)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>2400)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=31 && user_age<=60)
      {
        if(user_calories==2200)
        {
          message="consuming right calories";
        }
        else if(user_calories<2200)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>2200)
        {
          message="you need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=61 && user_age<=150)
      {
        if(user_calories==1400)
        {
          message="Consuming right calories";
        }
        else if(user_calories<1400)
        {
          message="you need to consume more calories";
        }
        else if(user_calories>1400)
        {
          message="you need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else
      {
        message="Give a Valid Input"
      }
    }
    else
    {
      message="Give a Valid Input";
    }
  }
  else if(user_gender=="Male")
  {
    if(user_category=="Sedentary")
    {
      if(user_age>=2 && user_age<=3)
      {
        if(user_calories==1000)
        {
          message="Consuming right calories"
        }
        else if(user_calories<1000)
        {
          message="You need to consume more calories"
        }
        else if(user_calories>1000)
        {
          message="You need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=4 && user_age<=5)
      {
        if(user_calories==1200)
        {
          message="Consuming right calories"
        }
        else if(user_calories<1200)
        {
          message="You need to consume more calories"
        }
        else if(user_calories>1200)
        {
          message="You need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=6 && user_age<=8)
      {
        if(user_calories==1400)
        {
          message="Consuming right calories"
        }
        else if(user_calories<1400)
        {
          message="You need to consume more calories"
        }
        else if(user_calories>1400)
        {
          message="You need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=9 && user_age<=10)
      {
        if(user_calories==1600)
        {
          message="Consuming right calories"
        }
        else if(user_calories<1600)
        {
          message="You need to consume more calories"
        }
        else if(user_calories>1600)
        {
          message="You need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=11 && user_age<=12)
      {
        if(user_calories==1800)
        {
          message="Consuming right calories"
        }
        else if(user_calories<1800)
        {
          message="You need to consume more calories"
        }
        else if(user_calories>1800)
        {
          message="You need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=13 && user_age<=14)
      {
        if(user_calories==2000)
        {
          message="Consuming right calories"
        }
        else if(user_calories<2000)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2000)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age==15)
      {
        if(user_calories==2200)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2200)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2200)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=16 && user_age<=18)
      {
        if(user_calories==2400)
        {
          message="Consuming right calories"
        }
        else if(user_calories<2400)
        {
          message="You need to consume more calories"
        }
        else if(user_calories>2400)
        {
          message="You need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=19 && user_age<=20)
      {
        if(user_calories==2600)
        {
          message="Consuming right calories"
        }
        else if(user_calories<2600)
        {
          message="You need to consume more calories"
        }
        else if(user_calories>2600)
        {
          message="You need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else if(user_age>=21 && user_age<=40)
      {
        if(user_calories==2400)
        {
          message="Consuming right calories"
        }
        else if(user_calories<2400)
        {
          message="You need to consume more calories"
        }
        else if(user_calories>2400)
        {
          message="You need to reduce your calories intake"
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=41 && user_age<=60)
      {
        if(user_calories==2200)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2200)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2200)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=61 && user_age<=150)
      {
        if(user_calories==2000)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2000)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2000)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else
      {
        message="Give a Valid Input";
      }
    }
    else if(user_category=="Moderately Active")
    {
      if(user_age==2)
      {
        if(user_calories==1000)
        {
          message="Consuming right calories";
        }
        else if(user_calories<1000)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>1000)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      if(user_age>2 && user_age<=5)
      {
        if(user_calories==1400)
        {
          message="Consuming right calories";
        }
        else if(user_calories<1400)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>1400)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=6 && user_age<=8)
      {
        if(user_calories==1600)
        {
          message="Consuming right calories";
        }
        else if(user_calories<1600)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>1600)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=9 && user_age<=10)
      {
        if(user_calories==1800)
        {
          message="Consuming right calories";
        }
        else if(user_calories<1800)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>1800)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age==11)
      {
        if(user_calories==2000)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2000)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2000)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=12 && user_age<=13)
      {
        if(user_calories==2200)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2200)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2200)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age==14)
      {
        if(user_calories==2400)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2400)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2400)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age==15)
      {
        if(user_calories==2600)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2600)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2600)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=16 && user_age<=25)
      {
        if(user_calories==2800)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2800)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2800)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=26 && user_age<=45)
      {
        if(user_calories==2600)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2600)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2600)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=46 && user_age<=65)
      {
        if(user_calories==2400)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2400)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2400)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=66 && user_age<=150)
      {
        if(user_calories==2200)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2200)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2200)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else
      {
          message="Give a Valid Input";
      }
    }
    else if(user_category=="Active")
    {
      if(user_age==2)
      {
        if(user_calories==1000)
        {
          message="Consuming right calories";
        }
        else if(user_calories<1000)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>1000)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age==3)
      {
        if(user_calories==1400)
        {
          message="Consuming right calories";
        }
        else if(user_calories<1400)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>1400)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=4 && user_age<=5)
      {
        if(user_calories==1600)
        {
          message="Consuming right calories";
        }
        else if(user_calories<1600)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>1600)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=6 && user_age<=7)
      {
        if(user_calories==1800)
        {
          message="Consuming right calories";
        }
        else if(user_calories<1800)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>1800)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=8 && user_age<=9)
      {
        if(user_calories==2000)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2000)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2000)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=10 && user_age<=11)
      {
        if(user_calories==2200)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2200)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2200)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age==12)
      {
        if(user_calories==2400)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2400)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2400)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age==13)
      {
        if(user_calories==2600)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2600)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2600)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age==14)
      {
        if(user_calories==2800)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2800)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2800)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age==15)
      {
        if(user_calories==3000)
        {
          message="Consuming right calories";
        }
        else if(user_calories<3000)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>3000)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=16 && user_age<=18)
      {
        if(user_calories==3200)
        {
          message="Consuming right calories";
        }
        else if(user_calories<3200)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>3200)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=19 && user_age<=35)
      {
        if(user_calories==3000)
        {
          message="Consuming right calories";
        }
        else if(user_calories<3000)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>3000)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=36 && user_age<=55)
      {
        if(user_calories==2800)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2800)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2800)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>=56 && user_age<=75)
      {
        if(user_calories==2600)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2600)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2600)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else if(user_age>75)
      {
        if(user_calories==2400)
        {
          message="Consuming right calories";
        }
        else if(user_calories<2400)
        {
          message="You need to consume more calories";
        }
        else if(user_calories>2400)
        {
          message="You need to reduce your calories intake";
        }
        else
        {
          message="Give a Valid Input";
        }
      }
      else
      {
      message="Give a Valid Input";
     }
  }
  else
    {
      message="Give a Valid Input";
    }
}
else
{
   message="Give a Valid Input";
}
const usersessiondata=req.session.sessname
selectquery="select * from tbl_us_calculation_result where Userid='"+(usersessiondata)+"'";
  connection.query(selectquery,function(err,result)
  {
    if(err)
    {
      throw err;
    }
    else{
      if (result.length>0)
      {
        caloquery="update  tbl_us_calculation_result set caloriescount='"+parseInt(Score)+"' where Userid='"+(usersessiondata)+"'";
        connection.query(caloquery,function(err,result,data)
        {
          if(err)
              { 
                throw err;
              }
          else
              {
                const flashMessage = req.app.get('flashMessage');
          req.flash('message',[message,flashMessage]);
          res.render('admin/caloriescount',{message,flashMessage});     
              }
        })
      }
      else{
        calory=parseInt(Score);
  caloquery="insert into tbl_us_calculation_result (Userid,caloriescount) values('"+(usersessiondata)+"','"+calory+"')";
  connection.query(caloquery,function(err,res,data)
  {
    if(err)
        { 
          //console.log(Score);
          //console.log(usersessiondata)
          throw err;
          
        }
    else
        {
          const flashMessage = req.app.get('flashMessage');
          req.flash('message',[message,flashMessage]);
          res.render('admin/caloriescount',{message,flashMessage});     
        }
  })
      }
    }
  })
})

router.post("/calpressuremetricunits",function(req,res)
    {
      var user_age=req.body.user_age
      var user_height=req.body.user_height
      var user_weight=req.body.user_weight
      var user_systolic=req.body.user_systolic
      var user_diastolic=req.body.user_diastolic
      var user_gender=req.body.user_gender

     const usersessiondata=req.session.sessname
     var averagePressure = (parseInt(user_systolic) + parseInt(user_diastolic)) / 2;
     var normalizedPressure = averagePressure / 120;
     var Score = Math.round(normalizedPressure * 100);
     
     if(user_age>=18 && user_age<=24)
      {
        if(user_systolic>120 && user_diastolic<80 )
        {
          message="You have a normal Blood Pressure"
        }
        else if((user_systolic>120 && user_systolic<129) && user_diastolic<80)
        {
          message="slightly higher than is considered ideals"
        }
        else if((user_systolic>130 && user_systolic<139) && (user_diastolic<80 && user_diastolic>80))
        {
          message="have a significantly higher risk of cardiovascular disease"
        }
        else if(user_systolic>=140 &&user_diastolic<=90 )
        {
          message="considered a hypertensive emergency or crisis. Seek emergency medical help"
        }
        else
        {
          message="Give a Valid Input"
        }
      }


     else if(user_age>=25 && user_age<=64)
      {
        if(user_systolic>120 && user_diastolic<80 )
        {
          message="You have a normal Blood Pressure"
        }
        else if((user_systolic>120 && user_systolic<129) && user_diastolic<80)
        {
          message="slightly higher than is considered ideals"
        }
        else if((user_systolic>130 && user_systolic<139) && (user_diastolic<80 && user_diastolic>80))
        {
          message="have a significantly higher risk of cardiovascular disease"
        }
        else if(user_systolic>=140 && user_diastolic<=90 )
        {
          message="considered a hypertensive emergency or crisis. Seek emergency medical help"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      

      else if(user_age>=65)
      {
        if(user_systolic>120 && user_diastolic<80 )
        {
          message="You have a normal Blood Pressure"
        }
        else if((user_systolic>120 && user_systolic<129) && user_diastolic<80)
        {
          message="slightly higher than is considered ideals"
        }
        else if((user_systolic>130 && user_systolic<139) && (user_diastolic<80 && user_diastolic>80))
        {
          message="have a significantly higher risk of cardiovascular disease"
        }
        else if(user_systolic>=140 && user_diastolic<=90 )
        {
          message="considered a hypertensive emergency or crisis. Seek emergency medical help"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else
      {
        message="Give a Valid Input"
      }
        
        selectquery="select * from tbl_metrics_calculation_result where Userid='"+usersessiondata+"'";
  connection.query(selectquery,function(err,result)
  {
    if(err)
    {
      throw err;
    }
    else{
      if (result.length>0)
      {
        pressurequery="update  tbl_metrics_calculation_result set bloodpressure='"+parseInt(Score)+"' where Userid='"+usersessiondata+"'";
        connection.query(pressurequery,function(err,result,data)
        {
          if(err)
              { 
                throw err;
              }
              else
              {
                const flashMessage = req.app.get('flashMessage');
                req.flash('message',[message,flashMessage])
                res.render('admin/bloodpressure',{message,flashMessage}); 
              }
        })
      }
      else{
        bpressure=parseInt(Score);
       const usersessiondata=req.session.sessname
  pressurequery="insert into tbl_metrics_calculation_result(Userid,bloodpressure) values('"+usersessiondata+"','"+bpressure+"')";
  connection.query(pressurequery,function(err,result,data)
  {
    if(err)
        { 
          console.log(Score);
         console.log(usersessiondata)
          throw err;
          
        }
    else
        {
          const flashMessage = req.app.get('flashMessage');
                req.flash('message',[message,flashMessage])
                res.render('admin/bloodpressure',{message,flashMessage});   
        }
     })
      }
    }
  })
});

    router.post("/calglucosemetricunits",function(req,res)
    {
      var user_age=req.body.user_age
      var user_height=req.body.user_height
      var user_weight=req.body.user_weight
      var user_level=req.body.user_level
      var user_category=req.body.user_category
      var user_gender=req.body.user_gender

      const usersessiondata=req.session.sessname
      var Score=Math.trunc((user_level/99)*100)

if(user_age<6)
{
  if(user_level>=100 && user_level<=180)
  {
    message="You have a Normal Blood Glucose"
  }
  else if(user_level<100)
  {
    message="You have a Low Blood Glucose"
  }
  else if(user_level>180)
  {
    message="You have a High Blood Glucose"
  }
  else
  {
    message="Give a Valid Input"
  }
}
else if(user_age>=6 && user_age<=12)
{
  if(user_level>=90 && user_level<=180)
  {
    message="You have a Normal Blood Glucose"
  }
  else if(user_level<90)
  {
    message="You have a Low Blood Glucose"
  }
  else if(user_level>180)
  {
    message="You have a High Blood Glucose"
  }
  else
  {
    message="Give a Valid Input"
  }
}
else if(user_age>=13 && user_age<=18)
{
  if(user_level>=90 && user_level<=130)
  {
    message="You have a Normal Blood Glucose"
  }
  else if(user_level<90)
  {
    message="You have a Low Blood Glucose"
  }
  else if(user_level>130)
  {
    message="You have a High Blood Glucose"
  }
  else
  {
    message="Give a Valid Input"
  }
}

else if(user_age>18)
{
  if(user_level>=72 && user_level<=99)
  {
    message="You have a Normal Blood Glucose"
  }
  else if(user_level<72)
  {
    message="You have a Low Blood Glucose"
  }
  else if(user_level>99)
  {
    message="You have a High Blood Glucose"
  }
  else
  {
    message="Give a Valid Input"
  }
}
else
{
   message="Give a Valid Input"
}
        
  selectquery="select * from tbl_metrics_calculation_result where Userid='"+usersessiondata+"'";
  connection.query(selectquery,function(err,result)
  {
    if(err)
    {
      throw err;
    }
    else{
      if (result.length>0)
      {
        glucosequery="update tbl_metrics_calculation_result set bloodglucose='"+parseInt(Score)+"' where Userid='"+usersessiondata+"'";
        connection.query(glucosequery,function(err,result,data)
        {
          if(err)
              { 
                throw err;
              }
              else
              {
                const flashMessage = req.app.get('flashMessage');
                req.flash('message',[message,flashMessage])
                res.render('admin/bloodglucose',{message,flashMessage});   
              }
        })
      }
      else{
        bglucose=parseInt(Score);
        const usersessiondata=req.session.sessname
  glucosequery="insert into tbl_metrics_calculation_result(Userid,bloodglucose) values('"+usersessiondata+"','"+bglucose+"')";
  connection.query(glucosequery,function(err,result,data)
  {
    if(err)
        { 
          console.log(Score);
          console.log(usersessiondata);
          throw err;
          
        }
    else
        {
          const flashMessage = req.app.get('flashMessage');
          req.flash('message',[message,flashMessage]);
          res.render('admin/bloodglucose',{message,flashMessage});      
        }
     })
      }
    }
  })
})      



  
     router.post("/calsleepmetricunits",function(req,res)
    {
      var user_age=req.body.user_age
      var user_height=req.body.user_height
      var user_weight=req.body.user_weight
      var user_sleeps=req.body.user_sleeps
      var user_gender=req.body.user_gender
      var user_category=req.body.user_category

      const usersessiondata=req.session.sessname
      var Score=Math.trunc((user_sleeps/10)*100)

      if(user_category=="Adult"){
        if(user_gender=="Male"){
          if(user_sleeps>=7 && user_sleeps<=9)
          {
            message="you are sleeping the required time"
          }
          else if(user_sleeps<7)
          {
            message="you are not sleeping the required time which can lead to heart stroke and high blood pressure"
          }
          else if(user_sleeps>9)
          {
            message="you are sleeping more than the required time which can lead to diabetes and heart stroke"
          }
          else
          {
            message="Give a Valid Input"
          }
        }
      
        else if(user_gender=="Female"){
          if(user_sleeps>=7 && user_sleeps<=8)
          {
            message="you are sleeping the required time"
          }
          else if(user_sleeps<7)
          {
            message="you are not sleeping the required time which can lead to heart stroke and high blood pressure"
          }
          else if(user_sleeps>8)
          {
            message="you are sleeping more than the required time which can lead to diabetes and heart stroke"
          }
          else
          {
            message="Give a Valid Input"
          }
        }
        else
          {
            message="Give a Valid Input"
          } 
      }
      
      else if(user_category=="Child"){
        if(user_gender=="Male" || user_gender=="Female"){
          if(user_sleeps>=11 && user_sleeps<=14)
          {
            message="the baby is sleeping the required time"
          }
          else if(user_sleeps<11)
          {
            message="the child needs more sleep"
          }
          else if(user_sleeps>14)
          {
            message="the child is sleeping too much"
          }else
          {
            message="Give a Valid Input"
          }
        }else
        {
          message="Give a Valid Input"
        }
      }
      
      else if(user_category=="Teenager"){
        if(user_gender=="Male" || user_gender=="Female"){
          if(user_sleeps>=9 && user_sleeps<=10)
          {
            message="you are sleeping the required time"
          }
          else if(user_sleeps<9)
          {
            message="(you are not sleeping the required time which can lead to heart stroke and high blood pressure"
          }
          else if(user_sleeps>10)
          {
            message="you are sleeping more than the required time which can lead to diabetes and heart stroke"
          }
          else
          {
            message="Give a Valid Input"
          }
        }
        else
          {
            message="Give a Valid Input"
          }
      }
      else
          {
            message="Give a Valid Input"
          }

      
      selectquery="select * from tbl_metrics_calculation_result where Userid='"+usersessiondata+"'";
  connection.query(selectquery,function(err,result)
  {
    if(err)
    {
      throw err;
    }
    else{
      if (result.length>0)
      {
        sleepquery="update tbl_metrics_calculation_result set sleeptracker='"+parseInt(Score)+"' where Userid='"+usersessiondata+"'";
        connection.query(sleepquery,function(err,result,data)
        {
          if(err)
              { 
                throw err;
              }
              else
              {
                const flashMessage = req.app.get('flashMessage');
                req.flash('message',[message,flashMessage]);
                res.render('admin/sleeptracker',{message,flashMessage});   
              }
        })
      }
      else{
        sleep=parseInt(Score);
        const usersessiondata=req.session.sessname
  sleepquery="insert into tbl_metrics_calculation_result(Userid,sleeptracker) values('"+usersessiondata+"','"+sleep+"')";
  connection.query(sleepquery,function(err,result,data)
  {
    if(err)
        { 
          console.log(Score);
          console.log(usersessiondata)
          throw err;
          
        }
    else
        {
          const flashMessage = req.app.get('flashMessage');
                req.flash('message',[message,flashMessage]);
                res.render('admin/sleeptracker',{message,flashMessage});    
        }
     })
      }
    }
  })
});

router.post("/calpressureusunits",function(req,res)
    {
      var user_age=req.body.user_age
      var user_inch=req.body.user_inch
      var user_feet=req.body.user_feet
      var user_weight=req.body.user_weight
      var user_systolic=req.body.user_systolic
      var user_diastolic=req.body.user_diastolic
      var user_gender=req.body.user_gender

      const usersessiondata=req.session.sessname
      var averagePressure = (parseInt(user_systolic) + parseInt(user_diastolic)) / 2;
      var normalizedPressure = averagePressure / 120;
      var Score = Math.round(normalizedPressure * 100);
      console.log(Score)
  
      if(user_age>=18 && user_age<=24)
      {
        if(user_systolic>120 && user_diastolic<80 )
        {
          message="You have a normal Blood Pressure"
        }
        else if((user_systolic>120 && user_systolic<129) && user_diastolic<80)
        {
          message="slightly higher than is considered ideals"
        }
        else if((user_systolic>130 && user_systolic<139) && (user_diastolic<80 && user_diastolic>80))
        {
          message="have a significantly higher risk of cardiovascular disease"
        }
        else if(user_systolic>=140 &&user_diastolic<=90 )
        {
          message="considered a hypertensive emergency or crisis. Seek emergency medical help"
        }
        else
        {
          message="Give a Valid Input"
        }
      }


     else if(user_age>=25 && user_age<=64)
      {
        if(user_systolic>120 && user_diastolic<80 )
        {
          message="You have a normal Blood Pressure"
        }
        else if((user_systolic>120 && user_systolic<129) && user_diastolic<80)
        {
          message="slightly higher than is considered ideals"
        }
        else if((user_systolic>130 && user_systolic<139) && (user_diastolic<80 && user_diastolic>80))
        {
          message="have a significantly higher risk of cardiovascular disease"
        }
        else if(user_systolic>=140 && user_diastolic<=90 )
        {
          message="considered a hypertensive emergency or crisis. Seek emergency medical help"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      

      else if(user_age>=65)
      {
        if(user_systolic>120 && user_diastolic<80 )
        {
          message="You have a normal Blood Pressure"
        }
        else if((user_systolic>120 && user_systolic<129) && user_diastolic<80)
        {
          message="slightly higher than is considered ideals"
        }
        else if((user_systolic>130 && user_systolic<139) && (user_diastolic<80 && user_diastolic>80))
        {
          message="have a significantly higher risk of cardiovascular disease"
        }
        else if(user_systolic>=140 && user_diastolic<=90 )
        {
          message="considered a hypertensive emergency or crisis. Seek emergency medical help"
        }
        else
        {
          message="Give a Valid Input"
        }
      }
      else
      {
        message="Give a Valid Input"
      }
        
        selectquery="select * from tbl_us_calculation_result where Userid='"+usersessiondata+"'";
  connection.query(selectquery,function(err,result)
  {
    if(err)
    {
      throw err;
    }
    else{
      if (result.length>0)
      {
        pressurequery="update  tbl_us_calculation_result set bloodpressure='"+parseInt(Score)+"' where Userid='"+usersessiondata+"'";
        connection.query(pressurequery,function(err,result,data)
        {
          if(err)
              { 
                throw err;
              }
              else
              {
                const flashMessage = req.app.get('flashMessage');
                req.flash('message',[message,flashMessage])
                res.render('admin/bloodpressure',{message,flashMessage});     
              }
        })
      }
      else{
        bpressure=parseInt(Score);
       const usersessiondata=req.session.sessname
  pressurequery="insert into tbl_us_calculation_result(Userid,bloodpressure) values('"+usersessiondata+"','"+bpressure+"')";
  connection.query(pressurequery,function(err,result,data)
  {
    if(err)
        { 
          console.log(Score);
         console.log(usersessiondata)
          throw err;
          
        }
    else
        {
          const flashMessage = req.app.get('flashMessage');
          req.flash('message',[message,flashMessage])
          res.render('admin/bloodpressure',{message,flashMessage});      
        }
     })
      }
    }
  })
});



router.post("/calglucoseusunits",function(req,res)
    {
      var user_age=req.body.user_age
      var user_inch=req.body.user_inch
      var user_feet=req.body.user_feet
      var user_weight=req.body.user_weight
      var user_level=req.body.user_level
      var user_category=req.body.user_category
      var user_gender=req.body.user_gender

      const usersessiondata=req.session.sessname
      var Score=Math.trunc((user_level/99)*100)

      if(user_age<6)
{
  if(user_level>=100 && user_level<=180)
  {
    message="You have a Normal Blood Glucose"
  }
  else if(user_level<100)
  {
    message="You have a Low Blood Glucose"
  }
  else if(user_level>180)
  {
    message="You have a High Blood Glucose"
  }
  else
  {
    message="Give a Valid Input"
  }
}
else if(user_age>=6 && user_age<=12)
{
  if(user_level>=90 && user_level<=180)
  {
    message="You have a Normal Blood Glucose"
  }
  else if(user_level<90)
  {
    message="You have a Low Blood Glucose"
  }
  else if(user_level>180)
  {
    message="You have a High Blood Glucose"
  }
  else
  {
    message="Give a Valid Input"
  }
}
else if(user_age>=13 && user_age<=18)
{
  if(user_level>=90 && user_level<=130)
  {
    message="You have a Normal Blood Glucose"
  }
  else if(user_level<90)
  {
    message="You have a Low Blood Glucose"
  }
  else if(user_level>130)
  {
    message="You have a High Blood Glucose"
  }
  else
  {
    message="Give a Valid Input"
  }
}

else if(user_age>18)
{
  if(user_level>=72 && user_level<=99)
  {
    message="You have a Normal Blood Glucose"
  }
  else if(user_level<72)
  {
    message="You have a Low Blood Glucose"
  }
  else if(user_level>99)
  {
    message="You have a High Blood Glucose"
  }
  else
  {
    message="Give a Valid Input"
  }
}
else
{
   message="Give a Valid Input"
}
       
        selectquery="select * from tbl_us_calculation_result where Userid='"+usersessiondata+"'";
  connection.query(selectquery,function(err,result)
  {
    if(err)
    {
      throw err;
    }
    else{
      if (result.length>0)
      {
        glucosequery="update tbl_us_calculation_result set bloodglucose='"+parseInt(Score)+"' where Userid='"+usersessiondata+"'";
        connection.query(glucosequery,function(err,result,data)
        {
          if(err)
              { 
                throw err;
              }
              else
              {
                const flashMessage = req.app.get('flashMessage');
                req.flash('message',[message,flashMessage])
                res.render('admin/bloodglucose',{message,flashMessage});      
              }
        })
      }
      else{
        bglucose=parseInt(Score);
        const usersessiondata=req.session.sessname
  glucosequery="insert into tbl_us_calculation_result(Userid,bloodglucose) values('"+usersessiondata+"','"+bglucose+"')";
  connection.query(glucosequery,function(err,result,data)
  {
    if(err)
        { 
          console.log(Score);
          console.log(usersessiondata)
          throw err;
          
        }
    else
        {
          const flashMessage = req.app.get('flashMessage');
          req.flash('message',[message,flashMessage])
          res.render('admin/bloodglucose',{message,flashMessage});       
        }
     })
      }
    }
  })
       
});

router.post("/calsleepusunits",function(req,res)
    {
      var user_age=req.body.user_age
      var user_inch=req.body.user_inch
      var user_feet=req.body.user_feet
      var user_weight=req.body.user_weight
      var user_sleeps=req.body.user_sleeps
      var user_gender=req.body.user_gender
      var user_category=req.body.user_category

      const usersessiondata=req.session.sessname
      var Score=Math.trunc((user_sleeps/10)*100)

      if(user_category=="Adult"){
        if(user_gender=="Male"){
          if(user_sleeps>=7 && user_sleeps<=9)
          {
            message="you are sleeping the required time"
          }
          else if(user_sleeps<7)
          {
            message="you are not sleeping the required time which can lead to heart stroke and high blood pressure"
          }
          else if(user_sleeps>9)
          {
            message="you are sleeping more than the required time which can lead to diabetes and heart stroke"
          }
          else
          {
            message="Give a Valid Input"
          }
        }
      
        else if(user_gender=="Female"){
          if(user_sleeps>=7 && user_sleeps<=8)
          {
            message="you are sleeping the required time"
          }
          else if(user_sleeps<7)
          {
            message="you are not sleeping the required time which can lead to heart stroke and high blood pressure"
          }
          else if(user_sleeps>8)
          {
            message="you are sleeping more than the required time which can lead to diabetes and heart stroke"
          }
          else
          {
            message="Give a Valid Input"
          }
        }
        else
          {
            message="Give a Valid Input"
          } 
      }
      
      else if(user_category=="Child"){
        if(user_gender=="Male" || user_gender=="Female"){
          if(user_sleeps>=11 && user_sleeps<=14)
          {
            message="the baby is sleeping the required time"
          }
          else if(user_sleeps<11)
          {
            message="the child needs more sleep"
          }
          else if(user_sleeps>14)
          {
            message="the child is sleeping too much"
          }else
          {
            message="Give a Valid Input"
          }
        }else
        {
          message="Give a Valid Input"
        }
      }
      
      else if(user_category=="Teenager"){
        if(user_gender=="Male" || user_gender=="Female"){
          if(user_sleeps>=9 && user_sleeps<=10)
          {
            message="you are sleeping the required time"
          }
          else if(user_sleeps<9)
          {
            message="(you are not sleeping the required time which can lead to heart stroke and high blood pressure"
          }
          else if(user_sleeps>10)
          {
            message="you are sleeping more than the required time which can lead to diabetes and heart stroke"
          }
          else
          {
            message="Give a Valid Input"
          }
        }
        else
          {
            message="Give a Valid Input"
          }
      }
      else
          {
            message="Give a Valid Input"
          }

           selectquery="select * from tbl_us_calculation_result where Userid='"+usersessiondata+"'";
  connection.query(selectquery,function(err,result)
  {
    if(err)
    {
      throw err;
    }
    else{
      if (result.length>0)
      {
        sleepquery="update tbl_us_calculation_result set sleeptracker='"+parseInt(Score)+"' where Userid='"+usersessiondata+"'";
        connection.query(sleepquery,function(err,result,data)
        {
          if(err)
              { 
                throw err;
              }
              else
              {
                const flashMessage = req.app.get('flashMessage');
                req.flash('message',[message,flashMessage]);
                res.render('admin/sleeptracker',{message,flashMessage});    
              }
        })
      }
      else{
        sleep=parseInt(Score);
        const usersessiondata=req.session.sessname
  sleepquery="insert into tbl_us_calculation_result(Userid,sleeptracker) values('"+usersessiondata+"','"+sleep+"')";
  connection.query(sleepquery,function(err,result,data)
  {
    if(err)
        { 
          console.log(Score);
          console.log(usersessiondata)
          throw err;
          
        }
    else
        {
          const flashMessage = req.app.get('flashMessage');
                req.flash('message',[message,flashMessage]);
                res.render('admin/sleeptracker',{message,flashMessage});    
        }
     })
      }
    }
  })
});

//forgetpassword
router.post('/updatepassword', function(req, res, next) {
  var user_email=req.body.user_email;
  var user_npwd=req.body.user_npwd;
  var user_cpwd=req.body.user_cpwd;
  var user_type=req.body.user_type;

if(user_npwd!=user_cpwd)
{
  req.flash('message','Confirm Password Does not Match')
  res.render('user/forgotpassword',{message:req.flash('message')});
}
if (user_type=="Patient")
  {
   selectquery="select * from  tbl_user_registration where emailid='"+user_email+"'";
   connection.query(selectquery,function(err,result){
     if(err)
     {
       throw err;
     }
     else
     {
        updatequery="update tbl_user_registration set password='"+user_npwd+"'where emailid='"+user_email+"' ";
        connection.query(updatequery,function(err,result,data)
        {
          if(err)
              {
                throw err;
              }
          else
              {
                console.log(updatequery);
                req.flash('message','Updated Successfully..!')
                res.render('user/forgotpassword',{message:req.flash('message')});    
              }
        })

     }
   })
  }
  else if (user_type=="Practitioner")
  {
   selectquery="select * from   tbl_health_practitioner_registration where emailid='"+user_email+"'";
   connection.query(selectquery,function(err,result){
     if(err)
     {
       throw err;
     }
     else
     {
       
         updatequery="update  tbl_health_practitioner_registration set password='"+user_npwd+"'where emailid='"+user_email+"' ";
         connection.query(updatequery,function(err,result)
       {
         if(err)
             {
               throw err;
             }
         else
             {
               console.log(updatequery)
               req.flash('message','Updated Successfully..!')
              res.render('user/forgotpassword',{message:req.flash('message')}); 
             }
       })
     }
   })
  }
  else{
    req.flash('message','Invalid Credentials')
    res.render('user/forgotpassword',{message:req.flash('message')}); 
  }
})


router.post("/calbodymetricunits", function(req, res) {
  var user_age = req.body.user_age;
  var user_height = req.body.user_height;
  var user_weight = req.body.user_weight;
  var user_gender = req.body.user_gender;
  var user_temp = req.body.user_temp;
  var message;
  score=Math.round(parseFloat((user_temp)/37)*100)

  if(user_gender=="Child"||user_gender=="Male"||user_gender=="Female")
{
  
  if (user_temp == 37) {
      message = "Normal temperature"
  } 
  else if (user_temp > 37) {
      message = "You might have a fever, you must check with a doctor";
  }

   else if (user_temp < 37 ) {
      message = "You might be affected by hypothermia and you are losing more heat than your body can produce";
  } 
  else{
    message="Give a Valid Input";
  }
} 
else
{
  message="Give a Valid Input";
}


const usersessiondata=req.session.sessname;
selectquery="select * from tbl_metrics_calculation_result where Userid='"+usersessiondata+"'";
  connection.query(selectquery,function(err,result)
  {
    if(err)
    {
      throw err;
    }
    else{
      if (result.length>0)
      {
        tempquery="update  tbl_metrics_calculation_result set bodytemp='"+parseInt(score)+"' where Userid='"+usersessiondata+"'";
        connection.query(tempquery,function(err,result,data)
        {
          if(err)
              {
                throw err;
              }
          else
              {
                const flashMessage = req.app.get('flashMessage');
                req.flash('message',[message,flashMessage]);
                res.render('admin/bodytemperature',{message,flashMessage});
              }
        })
      }
      else{
        const usersessiondata=req.session.sessname;   
  tempquery="insert into tbl_metrics_calculation_result(Userid,bodytemp) values('"+usersessiondata+"','"+parseInt(score)+"')";
  connection.query(tempquery,function(err,result,data)
  {
    if(err)
        {
          console.log(score);
          throw err;
          
        }
    else
        {
          const flashMessage = req.app.get('flashMessage');
                req.flash('message',[message,flashMessage]);
                res.render('admin/bodytemperature',{message,flashMessage});   
        }
  })
      }
    }
  })
// Send response back to client
//res.json({ temp: score, message: message });
})


//body temp us

router.post("/calbodyusunits", function(req, res) {
  var user_age = req.body.user_age;
  var user_inch = req.body.user_inch;
  var user_feet = req.body.user_feet;
  var user_weight = req.body.user_weight;
  var user_gender = req.body.user_gender;
  var user_temp = req.body.user_temp;
  var message;
  score=Math.round(parseFloat((user_temp)/37)*100)

  if(user_gender=="Child"||user_gender=="Male"||user_gender=="Female")
{
  
  if (user_temp == 37) {
      message = "Normal temperature"
  } 
  else if (user_temp > 37) {
      message = "(you might have a fever, you must check with a doctor)";
  }

   else if (user_temp < 37 ) {
      message = "(you might be affected by hypothermia and you are losing more heat than your body can produce";
  } 
  else{
    message="Give a Valid Input";
  }
} 
else{
  message="Give a Valid Input";
}


const usersessiondata=req.session.sessname;
selectquery="select * from tbl_us_calculation_result where Userid='"+usersessiondata+"'";
  connection.query(selectquery,function(err,result)
  {
    if(err)
    {
      throw err;
    }
    else{
      if (result.length>0)
      {
        tempquery="update  tbl_us_calculation_result set bodytemp='"+parseInt(score)+"' where Userid='"+usersessiondata+"'";
        connection.query(tempquery,function(err,result,data)
        {
          if(err)
              {
                throw err;
              }
          else
              {
                const flashMessage = req.app.get('flashMessage');
                req.flash('message',[message,flashMessage]);
                res.render('admin/bodytemperature',{message,flashMessage});   
              }
        })
      }
      else{
        const usersessiondata=req.session.sessname;  
  tempquery="insert into tbl_us_calculation_result(Userid,bodytemp) values('"+usersessiondata+"','"+parseInt(score)+"')";
  connection.query(tempquery,function(err,result,data)
  {
    if(err)
        {
          console.log(score);
          throw err;
          
        }
    else
        {
          const flashMessage = req.app.get('flashMessage');
                req.flash('message',[message,flashMessage]);
                res.render('admin/bodytemperature',{message,flashMessage});  
        }
  })
      }
    }
  })
// Send response back to client
//res.json({ temp: score, message: message });
})


router.post("/calwatermetricunits", function(req, res) {
  var user_age = req.body.user_age;
  var user_height = req.body.user_height;
  var user_weight = req.body.user_weight;
  var user_gender = req.body.user_gender;
  var user_water = req.body.user_water;
  var user_category = req.body.user_category;
  var message;
  score=Math.round(parseFloat(user_water/15)*100)


if(user_category=="Child")
{
  if(user_gender=="Male" || user_gender=="Female")
  {
    if (user_water == 8) 
    {
      message = "You are drinking enough water";
    } 
    else if (user_water < 8) 
    {
      message = "You are drinking less water which canlead to headache and dehydration";
    }
    else if (user_water > 8 && user_water == 10) 
    {
      message = "You are drinking more water,reduce cups to 8";
    } 
    else if (user_water > 10) {
      message = "You are drinking too much water can lead to intoxication,causing nausea,vomiting etc";
    } 
    else
    {
      message = " Give a Valid Input";
    }
  }
  else
  {
    message = " Give a Valid Input";
  }
}
else if(user_category=="Adult")
{
  if (user_gender == "Male")
  {
    if (user_water == 13) 
    {
      message = "You are drinking enough water";
    } 
    else if (user_water < 13) 
    {
      message = "You are drinking less water which canlead to headache and dehydration";
    }
    else if (user_water > 13 && user_water <= 15) 
    {
      message = "You are drinking more water,reduce few cups";
    }
    else if (user_water > 15) 
    {
      message = "You are drinking too much water can lead to intoxication,causing nausea,vomiting,etc";
    } 
    else
    {
      message = " Give a Valid Input";
    }
  }
  else if (user_gender == "Female")
  {
    if (user_water == 9) 
    {
      message = "You are drinking enough water";
    } 
    else if (user_water < 9) 
    {
      message = "You are drinking less water which canlead to headache and dehydration";
    }
    else if (user_water > 9 && user_water <= 11) 
    {
      message = "You are drinking more water,reduce few cups";
    }
    else if (user_water > 11) 
    {
      message = "You are drinking too much water can lead to intoxication,causing nausea,vomiting,etc";
    } 
    else
    {
      message = " Give a Valid Input";
    }
  } 
  else
  { 
    message = " Give a Valid Input";
  }
}
else
{ 
  message = " Give a Valid Input";
}


const usersessiondata=req.session.sessname;
selectquery="select * from tbl_metrics_calculation_result where Userid='"+usersessiondata+"'";
  connection.query(selectquery,function(err,result)
  {
    if(err)
    {
      throw err;
    }
    else{
      if (result.length>0)
      {
        waterquery="update  tbl_metrics_calculation_result set waterintake='"+parseInt(score)+"' where Userid='"+usersessiondata+"'";
        connection.query(waterquery,function(err,result,data)
        {
          if(err)
              {
                throw err;
              }
          else
              {
                const flashMessage = req.app.get('flashMessage'); 
                console.log(" username is" +flashMessage);
                req.flash('message',[message,flashMessage])
                res.render('admin/waterintake',{message,flashMessage}); 
              }
        })
      }
      else{
        const usersessiondata=req.session.sessname; 
  waterquery="insert into tbl_metrics_calculation_result(Userid,waterintake) values('"+usersessiondata+"','"+parseInt(score)+"')";
  connection.query(waterquery,function(err,result,data)
  {
    if(err)
        {
          console.log(score);
          throw err;
          
        }
    else
        {
                const flashMessage = req.app.get('flashMessage'); 
                console.log(" username is" +flashMessage);
                req.flash('message',[message,flashMessage]);
                res.render('admin/waterintake',{message,flashMessage});     
        }
  })
      }
    }
  })
})
//water intake us

router.post("/calwaterusunits", function(req, res) {
  var user_age = req.body.user_age;
  var user_inch = req.body.user_inch;
  var user_feet=req.body.user_feet;
  var user_weight = req.body.user_weight;
  var user_gender = req.body.user_gender;
  var user_water = req.body.user_water;
  var user_category = req.body.user_category;
  var message;
  

 
  score=Math.round(parseFloat(user_water/15)*100)

  if(user_category=="Child")
  {
    if(user_gender=="Male" || user_gender=="Female")
    {
      if (user_water == 8) 
      {
        message = "You are drinking enough water";
      } 
      else if (user_water < 8) 
      {
        message = "You are drinking less water which canlead to headache and dehydration";
      }
      else if (user_water > 8 && user_water == 10) 
      {
        message = "You are drinking more water,reduce cups to 8";
      } 
      else if (user_water > 10) {
        message = "You are drinking too much water can lead to intoxication,causing nausea,vomiting etc";
      } 
      else
      {
        message = " Give a Valid Input";
      }
    }
    else
    {
      message = " Give a Valid Input";
    }
  }
  else if(user_category=="Adult")
  {
    if (user_gender == "Male")
    {
      if (user_water == 13) 
      {
        message = "You are drinking enough water";
      } 
      else if (user_water < 13) 
      {
        message = "You are drinking less water which canlead to headache and dehydration";
      }
      else if (user_water > 13 && user_water <= 15) 
      {
        message = "You are drinking more water,reduce few cups";
      }
      else if (user_water > 15) 
      {
        message = "You are drinking too much water can lead to intoxication,causing nausea,vomiting,etc";
      } 
      else
      {
        message = " Give a Valid Input";
      }
    }
    else if (user_gender == "Female")
    {
      if (user_water == 9) 
      {
        message = "You are drinking enough water";
      } 
      else if (user_water < 9) 
      {
        message = "You are drinking less water which canlead to headache and dehydration";
      }
      else if (user_water > 9 && user_water <= 11) 
      {
        message = "You are drinking more water,reduce few cups";
      }
      else if (user_water > 11) 
      {
        message = "You are drinking too much water can lead to intoxication,causing nausea,vomiting,etc";
      } 
      else
      {
        message = " Give a Valid Input";
      }
    } 
    else
    { 
      message = " Give a Valid Input";
    }
  }
  else
  { 
    message = " Give a Valid Input";
  }


const usersessiondata=req.session.sessname;
selectquery="select * from tbl_us_calculation_result where Userid='"+usersessiondata+"'";
  connection.query(selectquery,function(err,result)
  {
    if(err)
    {
      throw err;
    }
    else{
      if (result.length>0)
      {
        waterquery="update  tbl_us_calculation_result set waterintake='"+parseInt(score)+"' where Userid='"+usersessiondata+"'";
        connection.query(waterquery,function(err,result,data)
        {
          if(err)
              {
                throw err;
              }
          else
              {
                res.render('admin/waterintake');    
              }
        })
      }
      else{
        const usersessiondata=req.session.sessname;    
  waterquery="insert into tbl_us_calculation_result(Userid,waterintake) values('"+usersessiondata+"','"+parseInt(score)+"')";
  connection.query(waterquery,function(err,result,data)
  {
    if(err)
        {
          console.log(score);
          throw err;
          
        }
    else
        {
          res.render('admin/waterintake');    
        }
  })
      }
    }
  })
})

router.post("/calwalkmetricunits", function(req, res) {
  var user_age = req.body.user_age;
  var user_height = req.body.user_height;
  var user_weight = req.body.user_weight;
  var user_gender = req.body.user_gender;
  var user_walks = req.body.user_walks;
  var user_category = req.body.user_category;
  var message;

  
  score=Math.round(parseFloat(user_walks/3000)*100) 


if(user_category=="SeniorCitizen")
{
  if (user_gender == "Male"|| user_gender =="Female")
   {
  if (user_walks == 8000) {
      message = "You are walking average steps"
  } 
  else if (user_walks < 8000) {
      message = "You must walk more steps to avoid body fat accumulation";
  }
   else if (user_walks > 8000) {
      message = "Good to walk more and make sure to rest more too";
  } 
  else{
      message = "Give a Valid Input";
  }
} 
else{
  message = "Give a Valid Input";
}
}
else if(user_category=="Man" ||user_category=="Woman")
{
  if (user_gender == "Male"|| user_gender =="Female")
   {
  if (user_walks == 5000) {
      message = "you are walking average steps"
  } 
  else if (user_walks < 5000) {
      message = "You must walk more steps to avoid body fat accumulation";
  }
   else if (user_walks > 5000) {
      message = "Good to walk more and make sure to rest more too";
  } 
  else{
    message = "Give a Valid Input";
  }
} 
else{
  message = "Give a Valid Input";
}
}
else if(user_category=="Child")
{
  if (user_gender == "Male")
   {
  if (user_walks == 15000) {
      message = "The baby is walking average steps";
  } 
  else if (user_walks < 15000) {
      message = "The child needs to walk more steps";
  }
   else if (user_walks > 15000) {
      message = "The child is walking more steps,and needs to rest more too";
  } 
  else{
    message = "Give a Valid Input";
  }
} 
else{
  message = "Give a Valid Input";
}
}
else if (user_gender == "Female")
   {
  if (user_walks == 12000) {
      message = "The baby is walking average steps";
  } 
  else if (user_walks < 12000) {
      message = "The child needs to walk more steps";
  }
   else if (user_walks > 12000) {
      message = "The child is walking more steps,and needs to rest more too";
  } 
  else{
    message = "Give a Valid Input";
  }
} 
else{
  message = "Give a Valid Input";
}

const usersessiondata=req.session.sessname;
selectquery="select * from tbl_metrics_calculation_result where Userid='"+usersessiondata+"'";
  connection.query(selectquery,function(err,result)
  {
    if(err)
    {
      throw err;
    }
    else{
      if (result.length>0)
      {
        const usersessiondata=req.session.sessname;
        stepsqueryquery="update  tbl_metrics_calculation_result set walkingsteps='"+parseInt(score)+"' where Userid='"+usersessiondata+"'";
        connection.query(stepsqueryquery,function(err,result,data)
        {
          if(err)
              {
                throw err;
              }
          else
              {
                //console.log("Hi Hello"+message)
                const flashMessage = req.app.get('flashMessage');
                req.flash('message',[message,flashMessage])
                res.render('admin/walkingsteps',{message,flashMessage});   
              }
        })
      }
      else{
     const usersessiondata=req.session.sessname;  
  stepsquery="insert into tbl_metrics_calculation_result(Userid,walkingsteps) values('"+usersessiondata+"','"+parseInt(score)+"')";
  connection.query(stepsquery,function(err,result,data)
  {
    if(err)
        {
          console.log(score);
          throw err;
          
        }
    else
        {
          const flashMessage = req.app.get('flashMessage'); // Retrieve the first message from the array
          console.log(" username is" +flashMessage);
          req.flash('message',[message,flashMessage])
          res.render('admin/walkingsteps',{message,flashMessage});   
        }
  })
      }
    }
  })
  // Send response back to client
  //res.json({ bmi: score, message: message });

});

//walkingsteps us


router.post('/calwalkusunits', function(req, res) {
  var user_age = req.body.user_age;
  var user_inch = req.body.user_inch;
  var user_feet = req.body.user_feet;
  var user_weight = req.body.user_weight;
  var user_gender = req.body.user_gender;
  var user_walks = req.body.user_walks;
  var user_category = req.body.user_category;
  var message;

  score=Math.round(parseFloat(user_walks)/3000*100) 


  if(user_category=="SeniorCitizen")
  {
    if (user_gender == "Male"|| user_gender =="Female")
     {
    if (user_walks == 8000) {
        message = "You are walking average steps"
    } 
    else if (user_walks < 8000) {
        message = "You must walk more steps to avoid body fat accumulation";
    }
     else if (user_walks > 8000) {
        message = "Good to walk more and make sure to rest more too";
    } 
    else{
        message = "Give a Valid Input";
    }
  } 
  else{
    message = "Give a Valid Input";
  }
  }
  else if(user_category=="Man" ||user_category=="Woman")
  {
    if (user_gender == "Male"|| user_gender =="Female")
     {
    if (user_walks == 5000) {
        message = "You are walking average steps"
    } 
    else if (user_walks < 5000) {
        message = "You must walk more steps to avoid body fat accumulation";
    }
     else if (user_walks > 5000) {
        message = "Good to walk more and make sure to rest more too)";
    } 
    else{
      message = "Give a Valid Input";
    }
  } 
  else{
    message = "Give a Valid Input";
  }
  }
  else if(user_category=="Child")
  {
    if (user_gender == "Male")
     {
    if (user_walks == 15000) {
        message = "The baby is walking average steps)";
    } 
    else if (user_walks < 15000) {
        message = "The child needs to walk more steps)";
    }
     else if (user_walks > 15000) {
        message = "The child is walking more steps,and needs to rest more too)";
    } 
    else{
      message = "Give a Valid Input";
    }
  } 
  else{
    message = "Give a Valid Input";
  }
  }
  else if (user_gender == "Female")
     {
    if (user_walks == 12000) {
        message = "The baby is walking average steps";
    } 
    else if (user_walks < 12000) {
        message = "The child needs to walk more steps";
    }
     else if (user_walks > 12000) {
        message = "The child is walking more steps,and needs to rest more too";
    } 
    else{
      message = "Give a Valid Input";
    }
  } 
  else{
    message = "Give a Valid Input";
  }

const usersessiondata=req.session.sessname;
selectquery="select * from tbl_us_calculation_result where Userid='"+usersessiondata+"'";
  connection.query(selectquery,function(err,result)
  {
    if(err)
    {
      throw err;
    }
    else{
      if (result.length>0)
      {
        stepsqueryquery="update  tbl_us_calculation_result set walkingsteps='"+parseInt(score)+"' where Userid='"+usersessiondata+"'";
        connection.query(stepsqueryquery,function(err,result,data)
        {
          if(err)
              {
                throw err;
              }
          else
              {
                const flashMessage = req.app.get('flashMessage'); // Retrieve the first message from the array
                console.log(" username is" +flashMessage);
                req.flash('message',[message,flashMessage])
                res.render('admin/walkingsteps',{message,flashMessage});     
              }
        })
      }
      else{
        const usersessiondata=req.session.sessname;
  stepsquery="insert into tbl_us_calculation_result(Userid,walkingsteps) values('"+usersessiondata+"','"+parseInt(score)+"')";
  connection.query(stepsquery,function(err,result,data)
  {
    if(err)
        {
          console.log(score);
          throw err;
          
        }
    else
        {
          const flashMessage = req.app.get('flashMessage'); // Retrieve the first message from the array
                console.log(" username is" +flashMessage);
                req.flash('message',[message,flashMessage])
                res.render('admin/walkingsteps',{message,flashMessage});  
        }
  })
      }
    }
  })
  // Send response back to client
  //res.json({ bmi: score, message: message }); 
});

router.get('/fixappointment', function(req, res, next) {
  const flashMessage = req.app.get('flashMessage'); 
  const doctorid=req.query.Userid;
  res.render('admin/fixappointment',{result:doctorid,flashMessage})
})

router.get('/viewstatus', function(req, res, next) {
  const userid=req.query.Userid;
  var patientid=req.session.sessname;
  selectquery= "select aid,practitionerid,practitionername,specialization,adate,atime,problem,status from tbl_appointment where practitionerid='"+userid+"'and patientid='"+patientid+"'";
 // console.log(selectquery)
  connection.query(selectquery,function(err,result){
    if(err)
    {
      throw err;
    }
    else
    {
      const flashMessage = req.app.get('flashMessage'); 
      obj={ print : result };
      res.render("admin/viewstatus",{ obj,flashMessage })
    }
  })
  })

router.post('/insertfixappointment', function(req, res, next) {

  var practitionerid=req.body.practitionerid;
  var appdate =req.body.appdate;
  var apptime=req.body.apptime;
  var patproblem=req.body.patproblem;
  var userid=req.session.sessname;
  var practitionername="",practitionerspec="",patname="",patemail="",patmobile="",patientid="";
 selectquery= "select username,specialization from tbl_health_practitioner_registration where userid = '"+practitionerid+"'";
//console.log(selectquery)
connection.query(selectquery,function(err,result1){
  if(err)
  {
    throw err;
  }
  else
  {
    obj={print:result1};
    practitionername=result1[0].username
    practitionerspec=result1[0].specialization
    console.log(obj)
    // console.log(result[0].username)
     
  }
selectquery1= "select Userid,username,mobile,emailid from tbl_user_registration where Userid = '"+userid+"'";
console.log(selectquery1)
  connection.query(selectquery1,function(err,result2){
    if(err)
    {
      throw err;
    }
    else
    {
      obj1={print:result2};
      
      patname=result2[0].username
      patmobile=result2[0].mobile
      patemail=result2[0].emailid
      patientid=result2[0].Userid
      console.log(obj1)

     
    
  
  
  insertquery="insert into tbl_appointment(patientid,practitionerid,practitionername,specialization,patientname,patientemail, patientmobile,adate,atime,problem) values('"+patientid+"','"+practitionerid+"','"+result1[0].username+"','"+practitionerspec+"','"+patname+"','"+patemail+"','"+patmobile+"','"+appdate+"','"+apptime+"','"+patproblem+"')";
  connection.query(insertquery,function(err,result,data)
    {
      if(err)
          { 
            
            throw err;
            
          }
      else
       {
        const flashMessage = req.app.get('flashMessage'); 
        res.render("admin/fixappointment", { flashMessage })
      }
    })
  } 
    });
    
  });

})

router.get('/viewmetricresult',function(req,res,next){
  const usersessiondata=req.session.sessname
  connection.query("select * from  tbl_metrics_calculation_result  where Userid='"+usersessiondata+"'",function(err,result){
    if(err)
    {
      throw err;
    }
    else
    {
      const flashMessage = req.app.get('flashMessage'); 
      obj={ print : result };
      res.render("admin/viewmetricresult",{ obj,flashMessage })
     // console.log(obj);
    }
  })
  
});

router.get('/viewusresult',function(req,res,next){
  
  const usersessiondata=req.session.sessname
  connection.query("select * from  tbl_us_calculation_result  where Userid='"+usersessiondata+"'",function(err,result){
    if(err)
    {
      throw err;
    }
    else
    {
      const flashMessage = req.app.get('flashMessage'); 
      obj={ print : result };
      res.render("admin/viewusresult",{obj,flashMessage})
     //console.log(obj);
    }
  })
 
});

router.get('/viewhealthappointment', function(req, res, next) {
  const usersessiondata=req.session.sessname
  var selectquery="select aid,patientname,patientemail,patientmobile,adate,atime,problem,status from tbl_appointment where  practitionerid ='"+usersessiondata+"'"
  console.log(selectquery)  
  connection.query(selectquery,function(err,result,data){
    if(err)
    {
      throw err;
    }
    else
    {
      //practitionername=                        [0].practitionername
      obj={print:result};
      res.render("admin/viewhealthappointment",obj)
    }
  })
});

router.get('/allowappointment',function(req,res,next)
{
  const usersessiondata=req.session.sessname
  var aid=req.query.aid

  var updatequery="update tbl_appointment set status='Allow' where aid='"+aid+"'";
  connection.query(updatequery,function(err,result,data)
{
  if(err)
  {
    throw err;
  }
  else
  {
    var selectquery="select aid,patientname,patientemail,patientmobile,adate,atime,problem,status from tbl_appointment where  practitionerid ='"+usersessiondata+"'"
  console.log(selectquery)  
  connection.query(selectquery,function(err,result,data){
    if(err)
    {
      throw err;
    }
    else
    {
      //practitionername=result[0].practitionername
      obj={print:result};
      res.render("admin/viewhealthappointment",obj)
    }
  })
  }
})
})


router.get('/denyappointment',function(req,res,next)
{
  const usersessiondata=req.session.sessname
  var aid=req.query.aid

  var updatequery="update tbl_appointment set status='Denied' where aid='"+aid+"'";
  connection.query(updatequery,function(err,result,data)
{
  if(err)
  {
    throw err;
  }
  else
  {
    var selectquery="select aid,patientname,patientemail,patientmobile,adate,atime,problem,status from tbl_appointment where  practitionerid ='"+usersessiondata+"'"
  //console.log(selectquery)  
  connection.query(selectquery,function(err,result,data){
    if(err)
    {
      throw err;
    }
    else
    {
      //practitionername=result[0].practitionername
      obj={print:result};
      res.render("admin/viewhealthappointment",obj)
    }
  })
  }
})
})




//bmi tracker metrics
router.post("/calbmimetricunits", function(req, res) {
  var user_age = req.body.user_age;
  var user_height = req.body.user_height;
  var user_weight = req.body.user_weight;
  var user_gender = req.body.user_gender;
  var message;
  var height = parseFloat(user_height) / 100; // Convert height to meters
var heightsq = height * height; // Calculate square of height
var bmicondition = parseFloat(user_weight) / heightsq; // Calculate BMI
score=bmicondition/35*100;
 // Round BMI to nearest integer


  if (user_gender == "Male") {
      if (bmicondition < 18.5) {
          message = "Your BMI suggests underweight, prompting attention to nutritional intake and potential health risks";
      } else if (bmicondition >= 18.5 && bmicondition <= 24.9) {
          message = "You have a healthy BMI within the normal weight range, reflecting good overall health and well-being.";
      } else if (bmicondition >= 25 && bmicondition <= 29.9) {
          message = "Your BMI indicates overweight, but small lifestyle changes can make a big difference!" ;
      } else if (bmicondition >= 30 && bmicondition <= 34.9) {
          message = "Your BMI shows obesity, which means it's time to focus on healthier habits for better well-being.";
      } else if (bmicondition >= 35) {
          message = "Your BMI indicates extreme obesity, signaling the critical importance of immediate attention to health and lifestyle changes";
      }
      else{
        message="Please give valid details";
      }
  } else if (user_gender == "Female") {
      if (bmicondition < 18.5) {
          message = "Your BMI suggests underweight, prompting attention to nutritional intake and potential health risks";
      } else if (bmicondition >= 18.5 && bmicondition <= 24.9) {
          message = "You have a healthy BMI within the normal weight range, reflecting good overall health and well-being.Normal weight";
      } else if (bmicondition >= 25 && bmicondition <= 29.9) {
          message = "Your BMI indicates overweight, but small lifestyle changes can make a big difference!";
      } else if (bmicondition >= 30 && bmicondition <= 34.9) {
          message = "Your BMI shows obesity, which means it's time to focus on healthier habits for better well-being.";
      } else if (bmicondition >= 35) {
          message = "Your BMI indicates extreme obesity, signaling the critical importance of immediate attention to health and lifestyle changes";
      }
      else
      {
        message="Plese give valid details";
      }
  }
  else
  {
    message="Plese give valid details";
  }
  
  const usersessiondata=req.session.sessname;
  selectquery="select * from tbl_metrics_calculation_result where Userid='"+usersessiondata+"'";
  connection.query(selectquery,function(err,result)
  {
    if(err)
    {
      throw err;
    }
    else{
      if (result.length>0)
      {
        bmiquery="update  tbl_metrics_calculation_result set bmi='"+parseInt(score)+"' where Userid='"+usersessiondata+"'";
        connection.query(bmiquery,function(err,result,data)
        {
          if(err)
              {
                throw err;
              }
          else
              {
                const flashMessage = req.app.get('flashMessage');
                req.flash('message',[message,flashMessage]);
                res.render('admin/bmitracker',{message,flashMessage});     
              }
        })
      }
      else{
       
  bmiquery="insert into tbl_metrics_calculation_result(Userid,bmi) values('"+usersessiondata+"','"+parseInt(score)+"')";
  connection.query(bmiquery,function(err,result,data)
  {
    if(err)
        {
          console.log(score);
          throw err;
          
        }
    else
        {
          const flashMessage = req.app.get('flashMessage');
                req.flash('message',[message,flashMessage]);
                res.render('admin/bmitracker',{message,flashMessage});   
        }
  })
      }
    }
  })

  // Send response back to client
  //res.json({ bmi: score, message: message });
});

//bmitracker us
router.post("/calbmiusunits", function(req, res) {
  var user_age = req.body.user_age;
  var user_inch = req.body.user_inch;
  var user_feet = req.body.user_feet;
  var user_weight = req.body.user_weight;
  var user_gender = req.body.user_gender;
  var message;
  lbsweight=Math.round(parseFloat(user_weight)*0.45359237,2)
  var userfeet=parseFloat(user_feet)*12
  usfeetinch=parseFloat(userfeet)+parseFloat(user_inch)
  usfi=math.round(float(usfeetinch)*2.45,2)
  heightinmeter=parseFloat(usfi)/100
  heightsq=heightinmeter*heightinmeter
  bmicondition=round(lbsweight/heightsq,2)
score=bmicondition/35*100;
// Round BMI to nearest integer


 if (user_gender == "Male") {
     if (bmicondition < 18.5) {
         message = "Your BMI suggests Underweight, prompting attention to nutritional intake and potential health risks";
     } else if (bmicondition >= 18.5 && bmicondition <= 24.9) {
         message = "You have a healthy BMI within the Normal weight range, reflecting good overall health and well-being.";
     } else if (bmicondition >= 25 && bmicondition <= 29.9) {
         message = "Your BMI indicates Overweight, but small lifestyle changes can make a big difference!";
     } else if (bmicondition >= 30 && bmicondition <= 34.9) {
         message = "Your BMI shows Obesity, which means it's time to focus on healthier habits for better well-being.";
     } else if (bmicondition >= 35) {
         message = "Your BMI indicates Extreme obesity, signaling the critical importance of immediate attention to health and lifestyle changes";
     }
     else{
       message="PLease give valid details";
     }
 } else if (user_gender == "Female") {
     if (bmicondition < 18.5) {
         message = "Your BMI suggests underweight, prompting attention to nutritional intake and potential health risks";
     } else if (bmicondition >= 18.5 && bmicondition <= 24.9) {
         message = "You have a healthy BMI within the Normal weight range, reflecting good overall health and well-being.";
     } else if (bmicondition >= 25 && bmicondition <= 29.9) {
         message = "Your BMI indicates Overweight, but small lifestyle changes can make a big difference!";
     } else if (bmicondition >= 30 && bmicondition <= 34.9) {
         message = "Your BMI shows Obesity, which means it's time to focus on healthier habits for better well-being.";
     } else if (bmicondition >= 35) {
         message = "Your BMI indicates Extreme obesity, signaling the critical importance of immediate attention to health and lifestyle changes";
     }
     else{
       message="please give the valid details";
     }
    }
    else{
      message="please give the valid details";
    }
  
  const usersessiondata=req.session.sessname;
  selectquery="select * from tbl_us_calculation_result where Userid='"+usersessiondata+"'";
  connection.query(selectquery,function(err,result)
  {
    if(err)
    {
      throw err;
    }
    else{
      if (result.length>0)
      {
        bmiquery="update   tbl_us_calculation_result set bmi='"+parseInt(score)+"' where Userid='"+usersessiondata+"'";
        connection.query(bmiquery,function(err,result,data)
        {
          if(err)
              {
                throw err;
              }
          else
              {
                const flashMessage = req.app.get('flashMessage');
                req.flash('message',[message,flashMessage]);
                res.render('admin/bmitracker',{message,flashMessage});    
              }
        })
      }
      else{
       
  bmiquery="insert into tbl_us_calculation_result(Userid,bmi) values('"+usersessiondata+"','"+parseInt(score)+"')";
  connection.query(bmiquery,function(err,result,data)
  {
    if(err)
        {
          console.log(score);
          throw err;
          
        }
    else
        {
          const flashMessage = req.app.get('flashMessage');
          req.flash('message',[message,flashMessage]);
          res.render('admin/bmitracker',{message,flashMessage});   
        }
  })
      }
    }
  })
});


router.get('/LoginPOI', function(req, res, next) {
  
  
  res.render('admin/LoginPOI');
});


module.exports = router;