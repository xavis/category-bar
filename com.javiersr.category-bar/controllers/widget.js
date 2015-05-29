var catsCount = 0;
var catsOffset = 0;

var init = function(fontColor, backgroundColor, selectorColor){
	$.cbView.backgroundColor = backgroundColor;
	$.cbView.color = fontColor;	
	$.cbView.selectorColor = selectorColor;	
};

var addCategory = function(object, type, event){
			
	 var arg = {
		object: object,
		event: event,
		count: catsCount,
		offset: catsOffset,
		parent: $.cbView,
		submenu: $.submenu,
		type: type
	};
	
	var c =  Widget.createController('category', arg).getView();
	$.cbView.add(c);
	if(c.active) {
		c.scrollToActive();
	}
	
	
	catsCount++;
	catsOffset=c.offs1;
	console.log(catsOffset);
	
};

$.cbView.addEventListener("click",function(e){
	if ($.cbView.children) {
        for (var c = 0 ; c < $.cbView.children.length; c++) {
           var child = $.cbView.children[c];
           if(child.zIndex != Ti.App.Properties.getString("JSUItabSelected")){
	         child.selector.backgroundColor="transparent";
           }
        }
    }
});


exports.init = init;
exports.addCategory = addCategory;
