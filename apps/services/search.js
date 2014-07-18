var __sutils=require('./support/searchutils');
var __gutils=require('./../gutils');


module.exports=search=function(req,res){
	var params=req.params;

	var query=req.query;
	var nq={};

	var clientId=params.clientId;
	var type=params.type;

	__sutils(query,function(esquery,bval){
		nq=esquery;
		__gutils.sendquery(200,esquery,res);
	});
};