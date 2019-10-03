var api=apiclient;
blueprintOpen = false

var BlueprintsModule = (function(){
	var plano="";
	var autor="";
	var point=[];
	var currentBlueprint; 
	var points=[];
	var graficarPlano = function(funcion){
		
		blueprintOpen = true;
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.beginPath()
		ctx.clearRect(0, 0, c.width, c.height);
		console.log(c.width, c.height);
		currentBlueprint=funcion
		funcion['points'].map(function(f){
			console.log(f.x)
			ctx.lineTo(f.x,f.y);
			ctx.stroke();
		})
		point.map(function(f){
			console.log("memoria puntos "+ f.x)
			ctx.lineTo(f.x,f.y);
			ctx.stroke();
		})
		ctx.closePath()
		$("#blueprintname").text(funcion['name'])
		plano=funcion['name'];
		autor=funcion['author'];
	

	};
	var graficarPlano2 = function(){
		
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.beginPath()
		console.log(c.width, c.height)
		
		ctx.closePath()
		
	};
	var getBlueprints = function(funcion){
		return funcion;
	};

	var getBlueprintsByNameAndAuthor = function (funcion,name) {
		var points=[]
		funcion.map(function(f){
			if(f.name==name){
				points=f.points
				currentBlueprint = f
			}
		});
		return points;
	};

	var getByAuthor = function (funcion) {
		
		return funcion.map(function(f){
			return {name:f.name,points:Object.keys(f.points).length};
		});
	  };

	
	var generarTable = function (name,funcion) {
		console.log(funcion)
		var fun=getByAuthor(funcion);
		console.log("esta fue");
		$("#cuerpo").html("");
		var total=0
		$("#totalPoints").text(total)
		fun.map(function(f) {
			$('#cuerpo')
				.append(
				  `<tr>
					<td>`+f.name+`</td>
					<td>`+f.points+`</td>`+
					"<td><form><button type='button' class='btn btn-primary' onclick='BlueprintsModule.init_canvas( \"" +
				  name +
				  '" , "' +
				  f.name +
				  "\")'>Open</button></form></td>"+
				  `</tr>`
				);
				total+=f.points
		});
		$("#totalPoints").text(total)
		$("#authorname").text(name+"'s")
	  };

	  var initMouse = function(){
		console.info('initialized');
		var canvas = document.getElementById("myCanvas"), 
		context = canvas.getContext("2d");
		

		if (window.PointerEvent) { 
			canvas.addEventListener("pointerdown", draw, false);
		}
	};


	var draw = function () {
		if (blueprintOpen){
			var canvas = document.getElementById("myCanvas"),
			context = canvas.getContext("2d");
			var offsetleft =  parseInt(getOffset(canvas).left, 10);
			var offsettop =  parseInt(getOffset(canvas).top, 10);
			var x = event.pageX-offsetleft;
			var y = event.pageY-offsettop;
			var cordenadas={"x":x,"y":y};
			api.getBlueprintsByNameAndAuthor(autor,plano,graficarPlano);
			point.push(cordenadas)
			
			//api.repaintPoints(autor,plano,graficarPlano2)
			
		}	
	};

	var updateBlueprint=  function(){
		point.map(function(f){
			currentBlueprint.points.push(f)
		});
		point=[]
		api.setBlueprint(autor,plano,JSON.stringify(currentBlueprint),run)
	}


	var init_canvas= function (nombre,nombrep) {
		$("#cuerpoSaveUpdate").css("visibility", "visible");		
		point=[];
		api.getBlueprintsByNameAndAuthor(nombre,nombrep,graficarPlano)
		
	};

	var getOffset = function (obj) {
	  var offsetLeft = 0;
	  var offsetTop = 0;
	  do {
		if (!isNaN(obj.offsetLeft)) {
		  offsetLeft += obj.offsetLeft;
		}
		if (!isNaN(obj.offsetTop)) {
		  offsetTop += obj.offsetTop;
		}     
	  } while(obj = obj.offsetParent );
	  return {left: offsetLeft, top: offsetTop};
	};


	var newBlueprint = function(){
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");		
		ctx.clearRect(0, 0, c.width, c.height);
		graficarPlano("","");
	}
	
	var run = function() {
		var nameAutor = $('#autor').val();
		api.getBlueprintsByAuthor(nameAutor,generarTable);
	}

	  return {
		run: run,
		initMouse: initMouse,
		graficarPlano: graficarPlano,
		init_canvas:init_canvas,
		updateBlueprint: updateBlueprint,
		newBlueprint: newBlueprint
	  };
})();

