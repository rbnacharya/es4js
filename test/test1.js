var assert = require('assert');
var __strutils=require('./../apps/strutils');

var checkEquals=function (a,b,type){
	console.log('Testing '+type);
	assert.deepEqual(a,b);
	console.log('Test passed!!');
}

var testForStrUtils=function(){
	console.log('test started for stringutils');

	var str1 = "[1,2,3]";
	var str2= "my name is test";

	var arr3=__strutils.format(str1);

	var displayToFrontObj=
	{
		hello : [{
			my : 'name', 
			is : 'test'
		},{
			i : 'am',
			the : 'best'
		}],
		i : ['am ', 'the' , 'best'],
		just : ['checking']
	};

	var shouldBeEqualsTo=
	{
		hello : {
			my : 'name', 
			is : 'test'
		},
		i : 'am ,the,best',
		just : 'checking'
	};


	checkEquals(true,__strutils.isArray(str1),"isArray true");
	checkEquals(false,__strutils.isArray(str2),"isArray false");
	
	checkEquals(["1","2","3"],arr3," format");
	
	checkEquals(shouldBeEqualsTo,__strutils.displaytofront(displayToFrontObj)," checking displaytofront");
	console.log('test passed for stringutils');


};


testForStrUtils();