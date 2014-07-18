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


module.exports = {
	starts : starts ,
	ends : ends ,
	isArray : isArray,
	format : format
};