var __searchhandler=require('./../search/handler');

// handlers can be registered for any report; 
// it is of format function(esresponse,request,callback)
// it is used to manipulate the response from elasticsearch

var handlers = {
	search : __searchhandler
};
var formatresponse=function(esreponse,result_sets,callback){
	var res ={
		status : 200 , 
		doc_counts : esreponse.hits.total ,
		result_sets : result_sets  
	};
	callback(res);
};

module.exports=function(esresponse,request,callback){
	var report = request["report"];
	if(!(report in handlers)){
		report= "search";
	}
	handlers[report](request,esresponse,function(res){
		formatresponse(esresponse,res,callback);
	});
};