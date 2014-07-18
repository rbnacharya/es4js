var filterbuilders={
	'eq' : function(k,v,cb){
		console.log(k);
		var termsF={};
		termsF[k]=v;
		
		
		cb({"terms":termsF});
	},
	'between':function(k,v,cb){
		eq(k,v,cb);
	},
	'gt': function(k,v,cb){
		var gtf={};
		gtf[k]={'gt':v};

		
		cb({'range':gtf});
	},
	maf: {
		"match_all": {}
	}
};

module.exports=filterbuilders;