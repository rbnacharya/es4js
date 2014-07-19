var __constants=require('./../../../keywords').constants;
var __queryb=require('./querybuilders');
var __filterb=require('./filterbuilders');
var _=require('underscore');
var ejs=require('elastic.js');

var DEFAULT_SIZE=10;
var SEPR="|";
var genquery=function (boolQuery,hasQuery){
	var query;
	if(!hasQuery){
		__queryb.maq(function(q){
			query=q;
		});
	}else{
		query=boolQuery;
	}
	return query;

}
var genfilter=function(filters){
	var fil;
	if(filters.length>0){
		fil= ejs.AndFilter(filters);

	}else{
		__filterb.maf(function(f){
			fil=f;
		}); 
	}
	return fil;

};
var get_operator=function(str){
	if(str.indexOf(SEPR)>0){
		return str.substring(str.lastIndexOf(SEPR)+1)
	}else{
		return "eq";
	}

}
var get_key=function(str){
	if(str.indexOf(SEPR)>0){
		return str.substring(0,str.lastIndexOf(SEPR))
	}else{
		return str;
	}

}
var makequery=function(request){
	var hasQuery=false;
	var boolQuery=ejs.BoolQuery();
	for (key in request){
		var operator=get_operator(key);
		var key_val=get_key(key);

		if(operator in __queryb){
			hasQuery=true;
			__queryb[operator](key_val,request[key],function(query,fn){
				if(fn == 'must'){
					boolQuery.must(query);
				}else if(fn == 'must_not'){
					boolQuery.mustNot(query);
				}
			});
		}
	}
	return genquery(boolQuery,hasQuery);
	// request finalQuery;
};

var makefilter=function(request){
	var andfilter=[];
	// var must_notq=[];
	for (key in request){
		var operator=get_operator(key);
		var key_val=get_key(key);

		if(operator in __filterb){
			__filterb[operator](key_val,request[key],function(query,success){
				if(success){
					andfilter.push(query);
				}
			});
		}
	}

	return genfilter(andfilter);
};

var get_size=function(request){
	if ('size' in request) {
		return request['size'];
	}else{
		return DEFAULT_SIZE;
	}
};

var cleanparams=function(request){
	__constants.push('size');
	__constants.push('_get');
	var newparams={};
	for (k in request){
		if(!(_.contains(__constants,k)) ){
			newparams[k] =request[k];
		}
	}
	return newparams;
};

var getsource=function(request){
	if ('_get' in request) {
		return request['_get'];
	}else{
		return '*';
	}
};

var makebuilder=function(request,callback){
	var size=get_size(request);
	var source=getsource(request);
	var formattedrequest=cleanparams(request);
	var srb=ejs.Request().query(makequery(formattedrequest)).filter(makefilter(formattedrequest))
		.size(size);

	if(source!='*'){
		srb.fields(source);
	}
	
	callback(srb.toString(),true);
};

module.exports=makebuilder;