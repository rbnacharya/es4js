var _=require('underscore');
var __strutils=require('./../../strutils');

module.exports=function(req,esresponse,callback){
	var res_sets={};
	var nhit={};
	var i=0;
	_.each(esresponse.hits.hits,function(ahit){
		var hkeys=_.keys(ahit);
		if(_.contains(hkeys,"fields")){
			nhit=ahit.fields;
		} else if(_.contains(hkeys,"_source")) {
			nhit=ahit["_source"];
		}
		if(!_.isEmpty(nhit)){
			res_sets[i] = __strutils.displaytofront(nhit);
			i++;
		}
	});
	callback(res_sets);
}