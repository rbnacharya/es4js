var ejs=require('elastic.js');

var querybuilders={
	startsWith:function(k,v,cb){
		cb(ejs.PrefixQuery(k,v),'must');
	},
	maq:function(cb){
		cb(ejs.MatchAllQuery())
	}

};

module.exports=querybuilders;