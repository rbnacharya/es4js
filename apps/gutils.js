var senderrasjson = function (status,msg,res) {
	res.setHeader('Content-Type', 'application/json'); 
	var jsontosend= {
		status : status , 
		error : msg
	};
	res.status(status);
	res.end(JSON.stringify(jsontosend));
};

var queryjson = function (status,msg,res) {
	res.setHeader('Content-Type', 'application/json'); 
	var jsontosend= {
		status : status , 
		query : msg
	};
	res.status(status);
	res.end(JSON.stringify(jsontosend));
};

var sendmsgasjson = function (status,msg,res) {
	res.setHeader('Content-Type', 'application/json'); 
	var jsontosend= {
		status : status , 
		message : msg
	};
	res.status(status);
	res.end(JSON.stringify(jsontosend));
};

var sendjsonobj=function(status,obj,res){
	res.setHeader('Content-Type', 'application/json'); 
	res.status(status);
	res.end(JSON.stringify(obj));
};

module.exports= {
	sendjson : sendmsgasjson,
	e404: function(msg,res){
		senderrasjson(404,msg,res);
	},
	sendquery: queryjson,
	sendjsonobj : sendjsonobj
};