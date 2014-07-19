var config={
	dev:{
		elasticsearch:{
			host: 'http://localhost:9200/' // elasticsearch location
		},
		port: 3032, //used for running nodejs 
		env : "development"
	},
	prod:{
		elasticsearch:{
			host: 'http://localhost:9200/'
		},
		port: 8080,
		env : "production"
	}
};

module.exports=function(){
	var environment=process.env.ENV;
	if(!(environment in config)){
		environment="dev";
	}
	return config[environment];	
}