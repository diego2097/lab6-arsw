apimock=(function(){
	var mockdata=[];
   mockdata["author2"]=[{"author":"author2","points":[{"x":20,"y":1},{"x":110,"y":15},{"x":0,"y":1},{"x":8,"y":9},{"x":10,"y":15}],"name":"Blues"},{"author":"author2","points":[{"x":20,"y":1},{"x":110,"y":15},{"x":0,"y":1},{"x":8,"y":9},{"x":50,"y":250}],"name":"Blu"}];
   mockdata["author1"]=[{"author":"author1","points":[{"x":120,"y":15},{"x":5,"y":1},{"x":8,"y":4},{"x":10,"y":15}],"name":"Blueprits"}];
   return {
	getBlueprintsByAuthor:function(name,callback){
			callback(
				name,
				mockdata[name]
			);
		},
	
		getBlueprintsByNameAndAuthor:function(author, name, callback){
			mockdata[author].map(function(f){
				if(f['name']==name){
					callback(
						f
					);
				}
			})
			
		}

}})();