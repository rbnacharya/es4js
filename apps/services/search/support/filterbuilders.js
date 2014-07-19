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
	exists : function(k,v,cb){
		cb(ejs.ExistsFilter(k),true);
	},
	distance : function(k,v,cb){
		if(_.isArray(v) && (v.length>=3)){
			var lat=v[0];
			var lon=v[1];
			var dist1=parseFloat(v[2]);
			var dist2=null;
			if(v.length==4){
				dist2=parseFloat(v[3]);
			}
			var geofilter=ejs.GeoDistanceRangeFilter(k);
			geofilter.point(ejs.GeoPoint([lon,lat]));

			if(!_.isUndefined(dist1)){
				geofilter.from(dist1);
				geofilter.to(dist2);
				
			}else{
				geofilter.to(dist2);
				geofilter.from(0);
			}
			cb(geofilter,true);
		}else{
			cb(null,false);
		}
	},
	not : function(k,v,cb){
		cb(ejs.NotFilter(ejs.TermsFilter(k,v)),true);

	},
	maf:function(cb) {
		cb(ejs.MatchAllFilter(),true);
	}
};

module.exports=filterbuilders;