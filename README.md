# Alloy Category Bar Widget [![Appcelerator Titanium](http://www-static.appcelerator.com/badges/titanium-git-badge-sq.png)](http://appcelerator.com/titanium/) [![Appcelerator Alloy](http://www-static.appcelerator.com/badges/alloy-git-badge-sq.png)](http://appcelerator.com/alloy/)

A widget for the [Alloy](http://projects.appcelerator.com/alloy/docs/Alloy-bootstrap/index.html) MVC framework of [Appcelerator](http://www.appcelerator.com)'s [Titanium](http://www.appcelerator.com/platform) platform.

Simple and fast widget for creating a scrollable categories dropdownable menu.

## Install
### Manual installation

1. Download `/com.javiersr.category-bar folder and place it in the `/app/widgets` folder
2. Add `"com.javiersr.category-bar": "1.0"` in dependencies into your project's `config.json` file


### Usage
#### 1. Declare in view
Declare as an Alloy markup tag

   <Require type="widget" src="category-bar" id="bar"/>
    
#### 2. Usage in controller

    var fontColor = "black"; //color of category title
    var backgroundColor = "white"; color of menu bar
    var selectorColor = "red"; //default color of selection border

    $.bar.init(fontColor, backgroundColor, selectorColor); 

    var categories = []; //Dropdown elements list
    
    var categoryDropdownObj = { //Dropdown element
    	title : "First element",
    	image : "/images/icons/element-icon.png",
    	customProperty1 : "customValue1", //custom properties for use in addCategory callback
    	color : "#55AAFF", // Row border color
    }

    categories.push(categoryDropDownObj);
    
    // [...] push as many rows as you want

    $.bar.addCategory({
    	title : "CATEGORIES",  //title of category
    	image : "/images/icons/categories.png",     //icon of category
    	color : "#55AAFF",     //color of selection border
    	items : categories,    //dropdown table elements rows as array (created above)
    	width: $.index.rect.width  //width of the table
    }, "dropdown",  //"dropdown" for a dropdown menu (when click on category a dropdown appear), "general" for not dropdown 
    callback(event, row));  //callback first argument is click event object and second arg is dropdown TableViewRow object.
    
    $.bar.addCategory(portada, "general", callback(e));     //simple category in menu
    	$.table.scrollToIndex(0,{animated:true});
    });
 

## License

<pre>
Copyright 2015 Javier Sánchez Riquelme

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
</pre>
