var querybuilders={
	'startsWith':function(k,v,cb){
		var query={
			match :{
				k : v
			}
		};
		cb(query,'must');
	},
	maq:{
		"match_all": {}
	}

};

module.exports=querybuilders;