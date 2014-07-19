var __sutils=require('./support/searchutils');
var __gutils=require('./../../gutils');
var __strutils=require('./../../strutils');

var es=require('elasticsearch');
var _= require('underscore');
var __responsehanlder=require('./../support/responsehandler');
var __config=require("./../../../conf/config")();




var configureParams=function(req){
	var newparams={};
	_.each(req,function(v,k){
		var nv=__strutils.format(v);
		newparams[k] =nv;
	});
	return newparams;
}

var client=es.Client(__config.elasticsearch);
module.exports=search=function(req,res){
	var params=req.params;
	var query=configureParams(req.query);
	var nq={};
	var clientId=params.clientId;
	var type=__strutils.format(params.type);



	__sutils(query,function(esquery,bval){
		// console.log(esquery);
		
		client.search({
			index : clientId, 
			type : type ,
			body : esquery
		}).then(function(resp){
			__responsehanlder(resp,req,function(robj){
				__gutils.sendjsonobj(200,robj,res);
			});
		},function(err){
			__gutils.sendjson(500,err,res);
		});
	});
};