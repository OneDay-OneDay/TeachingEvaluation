var mongoose=require("mongoose");
var models=require("./models.js");
var Schema=mongoose.Schema;

for(var modelName in models){
	mongoose.model(modelName,new Schema(models[modelName]));
};

var _getModel=function(modelName){
	return mongoose.model(modelName);
};

module.exports={
	getModel: function(modelName){
		return _getModel(modelName);
	}
};