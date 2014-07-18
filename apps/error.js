module.exports={
	'404': function(msg,response){
		sendError(404,msg,response);
	}
}


var sendError=function(status_code,message,response){
 	res.setHeader('Content-Type', 'application/json');
	response.end(status_code,JSON.stringify({error:{message:message}});
}