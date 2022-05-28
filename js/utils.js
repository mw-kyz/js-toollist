// 封装兼容性绑定事件的函数
function addEvent(el, type, fn){
	if(el.addEventListener){
		el.addEventListener(type, fn, false);
	}else if(el.attachEvent){
		el.attachEvent('on' + type, function() {
			fn.call(el);
		});
	}else{
		el['on' + type] = fn;
	}
}

// 封装找出一个元素所有孩子元素节点的方法
function elemChildren(node) {
	var arr = [],
		children = node.childNodes,
		len = children.length,
		item;
	
	for(var i = 0; i < len; i++) {
		item = children[i];
		
		if(item.nodeType === 1) {
			arr.push(item);
		}
	}
	return arr;
}

// 封装找元素第n个父级的方法
function elemParent(node, n) {
	var type = typeof(n);

	if(type === 'undefined') {
		return node.parentNode;
	}else if(n <= 0 || type !== 'number') {
		return undefined;
	}

	while(n) {
		node = node.parentNode;
		n--;
	}
	return node;
}