var _=require('underscore');

var starts=function(str){
	return str.charAt(0);
}
var ends=function(str){
	return str.charAt(str.length-1);

}

var isArray=function(str){
	return ((starts(str)=="[") && (ends(str)=="]")); 
}

var format = function(str){
	if(isArray(str)){
		var r_str=str.replace("[","").replace("]","");
		var tosend=r_str.split(",");
		return tosend;
	}else{
		return str;
	}
}

/**
* This function changes the response from elasticsearch, to easy display for front. 
*  like : combine list items (if items are not object), display first object elsewise
*
*/  
var displaytofront=function(obj){
	if(_.isArray(obj)){
		var isFirst=true;
		var toSend;
		var toTerminate=false;
		_.each(obj,function(k){
			if(!toTerminate){
				if(_.isObject(k)){
					toTerminate=true;
					toSend=displaytofront(k);
				}else{
					if(isFirst){
						isFirst=false;
						toSend="";
					}else{
						toSend+=",";
					}
					toSend+=k;
				}
			}
		});
		return toSend;
	}else{
		if(_.isObject(obj)){
			var newobj={};
			_.each(obj,function(v,k){
				var val=displaytofront(v);
				newobj[k]=val;
			});
			return newobj;
		}
		else{
			return obj;
		}
	}

}

module.exports = {
	starts : starts ,
	ends : ends ,
	isArray : isArray,
	format : format,
	displaytofront : displaytofront
};