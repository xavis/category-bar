var args = arguments[0] || {};

var submenu = args.submenu;
$.title.text = (args.type == "dropdown") ? (args.object.title.toUpperCase()+" ▾") :  ( args.object.title.toUpperCase() || "" );
$.image.backgroundImage = args.object.image || "";
$.category.zIndex = args.count || 0;
$.category.offs0 = args.offset;
$.category.selector = $.selector;
if(Ti.Platform.osname=="iphone"||Ti.Platform.osname=="ipad"){
	$.selector.width = 0;
	$.selector.width = $.category.toImage().width;
}

else{
	if(args.object.title){
		$.title.addEventListener('postlayout', function(e) { // not called ...
		  Ti.API.info(e.source.rect.height);
		  $.selector.width = Math.floor(e.source.rect.width+45);
		});
		$.selector.width = 0;
	}
	
	else{
		$.selector.width = 0;
		$.selector.width = $.category.toImage().width;
	}
}

var magicNumber =  1;

if(Titanium.Platform.osname=="android"){
	magicNumber = 3.1; 	
}

$.category.offs1 = args.offset + $.selector.width;


if(args.event && args.type != "dropdown"){
	$.category.addEventListener("click", function(e){
		upSubmenu();$
		var lastChild = args.parent.children[args.parent.children.length-1];
		
		if(typeof lastChild != undefined && lastChild && args.parent.rect.width<(lastChild.offs0+lastChild.rect.width)){
			scrollToThis();
		}
		args.event(e);
		Ti.App.Properties.setString("JSUItabSelected", $.category.zIndex);
		$.selector.backgroundColor = args.object.color || $.selector.backgroundColor;	
	});
}

else if(args.type == "dropdown"){
	
	$.category.addEventListener("click", function(e){
		
		var lastChild = args.parent.children[args.parent.children.length-1];
		if(args.parent.rect.width<(lastChild.offs0+lastChild.rect.width)){
			scrollToThis();
		}
		
		Ti.App.Properties.setString("JSUItabSelected", $.category.zIndex);
		$.selector.backgroundColor = args.object.color;	
		setSubmenu();
		
		if(submenu.height == 0 || submenu.height == 1){
			downSubmenu();
		}
		
		else if(submenu.height == Ti.UI.FILL){
			upSubmenu();
		}
		
	});
}

function scrollToThis(){
	var start;
	if(args.parent.contentOffset == undefined || typeof args.parent.contentOffset.x == undefined)
		start = 0;
	else start = args.parent.contentOffset.x;
	Ti.App.Properties.setString("JSUItabSelected", $.category.zIndex);
	$.selector.backgroundColor = args.object.color;	
	scrollAnimation(300, args.parent, start, $.category.offs0*magicNumber);
}


function scrollAnimation(time, scroll, origin, destiny)
{
	
	destiny = Math.floor(destiny);
	
	if(typeof origin == undefined || origin == undefined){
		origin = 0;
	}

    if(origin > destiny)
    {
        var frequency = (origin - destiny) / time;
 
        for(var i = origin; i > destiny; i-=frequency)
        {
            scroll.scrollTo(i, 0);
        }
    }
    
    else
    {
        var frequency = (destiny - origin) / time;
 
        for(var i = origin; i < destiny; i+=frequency)
        {
            scroll.scrollTo(i, 0);
        }
    }
}

function setSubmenu(){
	if(args.object.items){
		var items = args.object.items;
		var rows = [];
		items.forEach(function(row,i){
			var sbArgs = {
				title : row.title,
				image : row.image,
				color: row.color
			}
			var r = Widget.createController("submenuRow", sbArgs).getView();
			if(args.event){
				r.addEventListener("click",function(e){
						args.event(e,row);
					  	upSubmenu();
					});
			}
			rows.push(r);
		});
	
		submenu.setData(rows);	
	
	}
}

function downSubmenu(){
	submenu.show();
	submenu.getParent().height = Ti.UI.FILL;
	var animation = Titanium.UI.createAnimation({
		height: 600,
		duration: 300
	});
	
	var animationHandler = function() {
		submenu.height = Ti.UI.FILL;
		console.log(submenu.height+"----"+submenu.getParent().height);
	};
	
	animation.addEventListener('complete',animationHandler);
	submenu.animate(animation);

}

function upSubmenu(){
	
	var animation = Titanium.UI.createAnimation({
		height: 1,
		duration: 300
	});
	
	var animationHandler = function() {
		submenu.height = 1;
		submenu.getParent().height = 100;
		console.log(submenu.height+"----"+submenu.getParent().height);
		submenu.hide();
	};
	
	animation.addEventListener('complete',animationHandler);
	submenu.animate(animation);

}

if(args.object.active){
	$.category.fireEvent("click");
}