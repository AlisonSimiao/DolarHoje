var entradaDevalores = {
	"dolar": 0,
	"real":   2,
	"linkreal": "",
	"linkdolar": "" 
};

function init(argument) {
	let dataAtual 	= new Date();
	var dia 		= dataAtual.getDate();
	var mes 		= (dataAtual.getMonth() + 1);
	var ano 		= dataAtual.getFullYear();
	let url 		= "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='" +mes+"-"+dia+"-"+ano+"'&$format=json"

	let request 	= new XMLHttpRequest();
	request.open('GET', url, true);
	request.send();

	request.onload 	= function() {
	    if (request.readyState == 4 && request.status == 200) {
	 		let resp = JSON.parse(request.responseText);
	 		console.log(resp.value[0].cotacaoCompra);

	 		entradaDevalores.real 				= resp.value[0].cotacaoCompra;
	 		entradaDevalores.dolar   			= 1/entradaDevalores.real;
	 		

	 	} 
	 	else{
	 		console.log("ERR> carregamento do XMLHttpRequest")
	 	}

	entradaDevalores.linkdolar			= document.querySelector("#drl");
	entradaDevalores.linkreal			= document.querySelector("#brl");
	entradaDevalores.linkdolar.value 	= 1;
	entradaDevalores.linkreal.value 	= entradaDevalores.real;

	entradaDevalores.linkdolar.addEventListener('keyup', function(ev) {
	 	entradaDevalores.linkreal.value	= entradaDevalores.real *entradaDevalores.linkdolar.value;
	});

	entradaDevalores.linkreal.addEventListener('keyup', function(ev) {
		entradaDevalores.linkdolar.value= entradaDevalores.dolar *entradaDevalores.linkreal.value;
	}); 
	}
	
}