var sapiUrl = 'http://sapi.edelight.biz/api/?SecretKey=q756wwalabkbyz580mtk8chuqo50fg9l&Locale=de_DE&Operation=Itemsearch&AccessKey=g7ch8ydjicqr6ibvcfa3f9q3561drh0v&Output=json';
var imgParam = 'resized/normal/220/';

syf = {
	init: function(){
		syf.baseInit();
		syf.router();
	},
	
	baseInit: function(){
		$("#searchRow").hide();
		$("#searchBtn").on('tap', function(){
			$('#searchRow').toggle();
			$("#searchBtn").toggleClass('ui-btn-active');
		});
		$('#searchDoBtn').on('tap', function(){
			var str = $.trim($('#searchInput').val());
			if(str != ''){
				syf.search(str);
			}
		});
	}, 
	
	urlVars: function(){
	    var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	    for(var i = 0; i < hashes.length; i++)
	    {
	        hash = hashes[i].split('=');
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
	    }
	    return vars;
	},
	
	router: function(){
		var parameters = syf.urlVars();
		if("search" in parameters){
			syf.search(parameters);
		} else if("ecatn" in parameters){
			syf.category(parameters);
		} else {
			syf.category({"ecatn": "27weky56okebmq37"});
		}
	},
	
	search: function(queryParameter){
		$('#navbar a').removeClass('ui-btn-active');
		q = '&Items=30&Query='+encodeURIComponent(queryParameter);
		syf.loadProducts(q, syf.fillCategory);
	},
	
	fillSearch: function(data){
		
	},
	
	category: function(parameters){
		var ecatn = parameters['ecatn'];
		var query = '&Items=30&TypedTags=ecatn%3A('+ecatn+')';
		
		$('#navbar a[data-ecatn="'+ecatn+'"]').addClass('ui-btn-active');
		syf.loadProducts(query, syf.fillCategory);
	},
	
	fillCategory: function(data){
		$('#products').empty();
		$.each(data.itemsearchresponse.items.item , function(key, item){
			className = syf.getClassName(key);
			
			var img = item.imagebaseurl+imgParam+item.ein+'.jpg';
			$('#products').append('<div class="ui-block-'+className+'">'
									+'<a data-rel="dialog" data-transition="pop" href="'+item.detailpageurl+'" rel="external">'
									+'<img src="'+img+'" />'
									+'<span class="brand">'
									+item.brand
									+'</span>'
									+'<span class="name">'
									+item.title
									+'</span></a></div>');
		});
	},
	
	getClassName:function(key){
		if(key%3) {
			if(key%3 == 1){
				return "b";
			} else {
				return "c";
			}
		} else {
			return "a";
		}
	},
		
	loadProducts: function(attributes, callback){
		alert(sapiUrl+attributes);
		$.getJSON(sapiUrl+attributes, callback);
	
	}
	
}

$().ready(function(){
	syf.init();
});