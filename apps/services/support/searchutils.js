var __constants=require('../../keywords').constants;
var __queryb=require('./querybuilders');
var __filterb=require('./filterbuilders');
var _=require('underscore');


var DEFAULT_SIZE=10;
var genquery=function (must,must_not){
	var query;
	if(must.length==0 && must_not.length==0){
		query=__queryb.maq;
	}else if(must_not.length==0 && !(must.length==0)){
		query= {must : must} ;
	}else if(must.length==0 && !(must_not.length==0)){
		query= {must_not : must_not};
	}
	return query;

}
var genfilter=function(filters){
	var fil;
	if(filters.length>0){
		fil= {and: filters};

	}else{
		fil=__filterb.maf; 
	}
	return fil;

};
var get_operator=function(str){
	if(str.indexOf(".")>0){
		return str.substring(str.lastIndexOf(".")+1)
	}else{
		return "eq";
	}

}
var get_key=function(str){
	if(str.indexOf(".")>0){
		return str.substring(0,str.lastIndexOf("."))
	}else{
		return str;
	}

}
var makequery=function(request){
	var must_q=[];
	var must_notq=[];
	for (key in request){
		var operator=get_operator(key);
		var key_val=get_key(key);


		if(operator in __queryb){
			__queryb[operator](key_val,request[key],function(query,fn){
				if(fn == 'must'){
					must_q.push(query);
				}else if(fn == 'must_not'){
					must_not.push(query);
				}
			});
		}
	}
	return genquery(must_q,must_notq);
	// request finalQuery;
};

var makefilter=function(request){
	var andfilter=[];
	// var must_notq=[];
	for (key in request){
		var operator=get_operator(key);
		var key_val=get_key(key);

		console.log(operator);
		console.log(key);
		if(operator in __filterb){
			__filterb[operator](key_val,request[key],function(query){
				andfilter.push(query);
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
		return '';
	}
};

var makebuilder=function(request,callback){
	var size=get_size(request);
	var source=getsource(request);
	var formattedrequest=cleanparams(request);

	var srb={
		'size' : size,
		'query' : makequery(formattedrequest),
		'post_filter' : makefilter(formattedrequest),
		'_source' : source
	};
	callback(srb,true);
};

module.exports=makebuilder;