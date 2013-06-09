var sapiUrl = 'http://sapi.edelight.biz/api/?Output=json';
var imgParam = 'resized/normal/220/';

syf = {
	init: function(){
		syf.pageInit();
		$("#searchRow").hide();
		$("#searchBtn").on('tap', function(){
			$('#searchRow').toggle();
			$("#searchBtn").toggleClass('ui-btn-active');
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
		
	pageInit: function(){
	    var ecatn = syf.urlVars()['ecatn'];
	    if(!ecatn){
	    	ecatn = '27weky56okebmq37';
	    }
	    
	    $('#navbar a[data-ecatn="'+ecatn+'"]').addClass('ui-btn-active');
	    
		syf.loadProducts('&Items=30&TypedTags=ecatn%3A('+ecatn+')');
	},
	
	loadProducts: function(attributes){
		$.getJSON(sapiUrl+attributes, function(data){
			$('#products').empty();
			$.each(data.itemsearchresponse.items.item , function(key, item){
				if(key%3) {
					if(key%3 == 1){
						className = "b";
					} else {
						className = "c";
					}
				} else {
					className = "a";
				}
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
		});
	
	}
	
}
$().ready(function(){
	syf.init();
});