var ejs=require('elastic.js');
var _=require('underscore');

var filterbuilders={
	'eq' : function(k,v,cb){
		cb(ejs.TermsFilter(k,v),true);
	},
	'between':function(k,v,cb){
		if(_.isArray(v) && (v.length=2)){
			var lower=v[0];
			var upper=v[1];
			cb(ejs.RangeFilter(k).from(lower).to(upper),true);
		}else{
			cb(null,false);
		}
	},
	'gt': function(k,v,cb){
		cb(ejs.RangeFilter(k).gt(v),true);
	},
	maf:function(cb) {
		cb(ejs.MatchAllFilter(),true);
		
	}
};

module.exports=filterbuilders;