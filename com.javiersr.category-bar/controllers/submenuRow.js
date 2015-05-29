var args = arguments[0] || {};

$.title.text = args.title.toUpperCase() || "";
$.image.image = args.image || "";
$.borderBottom.backgroundColor = args.color || "#888888";