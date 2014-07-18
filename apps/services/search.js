var __sutils=require('./support/searchutils');
var __gutils=require('./../gutils');
var __strutils=require('./../strutils');

var client=require('elasticsearch').Client();
var _= require('underscore');


var makeresponse=function(response,callback){
	
	var res_sets={};
	var nhit={};
	var i=0;
	_.each(response.hits.hits,function(ahit){
		var hkeys=_.keys(ahit);
		if(_.contains(hkeys,"fields")){
			nhit=ahit.fields;
		} else if(_.contains(hkeys,"_source")) {
			nhit=ahit["_source"];
		}
		if(!_.isEmpty(nhit)){
			res_sets[i] = nhit;
			i++;
		}
	});
	var res ={
		status : 200 , 
		doc_counts : response.hits.total ,
		result_sets : res_sets  
	};
	callback(res);
};


var configureParams=function(req){
	var newparams={};
	_.each(req,function(v,k){
		var nv=__strutils.format(v);
		newparams[k] =nv;
	});
	return newparams;
}

module.exports=search=function(req,res){
	var params=configureParams(req.params);

	var query=configureParams(req.query);
	var nq={};
	var clientId=params.clientId;
	var type=params.type;
	__sutils(query,function(esquery,bval){
		// console.log(esquery);
		client.search({
			index : clientId, 
			type : type ,
			body : esquery
		}).then(function(resp){
			makeresponse(resp,function(robj){
				__gutils.sendjsonobj(200,robj,res);
			});
		},function(err){
			__gutils.sendjson(500,err,res);
		});
	});
};