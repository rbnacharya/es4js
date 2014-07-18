var _search=require('./services/search');
var _suggest=require('./services/suggest');
var _admin=require('./services/admin');

var __error=require('./error');

var serviceList={
	search : _search,
	suggest : _suggest,
	admin: _admin
}

module.exports=function(service,req,res){
	if(service in serviceList){
		serviceList[service](req,res);
	}
	else{
		__error(404,"Service ["+service+"] not found");
	}
}