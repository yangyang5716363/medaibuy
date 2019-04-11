function pasreEnDate(dateStr, forwardDate) {  
  try {  
      if (dateStr && dateStr.trim().length != 7) {  
          return;  
      }  
      var dd = dateStr.substring(0, 2);  
      var mm = dateStr.substring(2, 5);  
      var yy = dateStr.substring(5, 7);  
      mm = mm.toUpperCase();  
      var em = new Array("JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC");  
      switch (mm) {  
        case em[0]:  
          mm = 1;  
          break;  
        case em[1]:  
          mm = 2;  
          break;  
        case em[2]:  
          mm = 3;  
          break;  
        case em[3]:  
          mm = 4;  
          break;  
        case em[4]:  
          mm = 5;  
          break;  
        case em[5]:  
          mm = 6;  
          break;  
        case em[6]:  
          mm = 7;  
          break;  
        case em[7]:  
          mm = 8;  
          break;  
        case em[8]:  
          mm = 9;  
          break;  
        case em[9]:  
          mm = 10;  
          break;  
        case em[10]:  
          mm = 11;  
          break;  
        case em[11]:  
          mm = 12;  
          break;  
      }  
      var now = new Date();  
      var year = now.getFullYear();  
      if (yy.length == 2) {  
          //指定为10进制否则出问题  
          yy = parseInt(yy,10);   
          if (forwardDate) {   
              //只是当前日期以后的日期  
              yy = 2000 + yy;  
          } else {  
              //如出生日期  
              var miny = year - (2000 + yy);  
              var maxy = year - (1900 + yy);  
              if (miny > 0 || maxy < 100) {  
                  yy = 1900 + yy;  
              } else {  
                  yy = 2000 + yy;  
              }  
          }  
      }  
      var nd = mm + "/" + dd + "/" + yy;  
      var date2 = new Date(nd);  
      return myGetDateText(date2);  
  }  
  catch (e) {  
      return "";  
  }  
}  

//将日期转化为2010-04-09格式的字符串  
function myGetDateText(date1) {  
  var dateStr = "";  
  if (date1) {  
      dateStr = date1.getFullYear();  
      var month = date1.getMonth() + 1;  
      var day = date1.getDate();  
      if (month < 10) {  
          dateStr += "-0" + month;  
      } else {  
          dateStr += "-" + month;  
      }  
      if (day < 10) {  
          dateStr += "-0" + day;  
      } else {  
          dateStr += "-" + day;  
      }  
  }  
  return dateStr;  
}  