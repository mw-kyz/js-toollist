init();

function init() {
	initToDOList;
}

var initToDOList = (function() {
	var showInput = document.getElementsByClassName('j-show-input')[0],
		inputWrap = document.getElementsByClassName('input-wrap')[0],
		addItem = document.getElementsByClassName('j-add-item')[0],
		textInput = document.getElementById('textInput'),
		oList = document.getElementsByClassName('j-list')[0],
		inputShow = false, //存储输入框是否是显示的状态
		isEdit = false, //判断是否是编辑状态
		curIdx = null; //存储当前编辑中的li的下标

	addEvent(showInput, 'click', function() {
		if(inputShow) {
			inputTrigger('close');
			restoreStatus();
			removeEditStatus();
		}else {
			inputTrigger('open');
		}
	});

	addEvent(addItem, 'click', function() {
		var oItems = document.getElementsByClassName('item'),
			val = textInput.value,
			len = val.length,
			itemLen = oItems.length;

		// 如果输入框没有值，就跳出这个点击事件，不做增加li的操作
		if(len <= 0 && !isEdit) {
			return;
		}

		if(isEdit) {
			var itemContent = elemChildren(oItems[curIdx])[0];
			if(len <= 0) {

			}else if(textInput.value === itemContent.innerText) {
				
			}else {
				itemContent.innerText = val;
			}
			addItem.innerText = '增加项目';
			removeEditStatus();

		}else {
			if(itemLen > 0) {
				for (var i = 0; i < itemLen; i++) {
					// 选中li标签里的p标签
					itemText = elemChildren(oItems[i])[0].innerText;

					if(val === itemText) {
						alert('已存在此项目');
						return;//必须退出点击事件，不然还是会在下面添加这一项 
					}

				}
			}
			var oLi = document.createElement('li');
			oLi.className = 'item';
			oLi.innerHTML = itemTpl(val);
			oList.appendChild(oLi);
		}

		// 添加完后，隐藏输入框
		inputTrigger('close');
		restoreStatus();

	});

	addEvent(oList, 'click', function(e) {
		var e = e || window.event,
			tar = e.target || e.srcElement,
			className = tar.className,
			oItems = document.getElementsByClassName('item'),
			liParent = elemParent(tar, 2);

		if(className === 'edit-btn fa fa-edit') {
			var itemLen = oItems.length,
				tarIndex = Array.prototype.indexOf.call(oItems, liParent),
				item;

			inputTrigger('open');
			textInput.value = elemChildren(oItems[tarIndex])[0].innerText;
			// 去除编辑状态
			removeEditStatus();

			curIdx = tarIndex;
			liParent.className += ' active';
			addItem.innerText = '编辑第' + (tarIndex + 1) + '项';
			isEdit = true;

		}else if(className === 'remove-btn fa fa-times') {
			liParent.remove();
			restoreStatus();
		}
	});

	// 关闭和显示输入框
	function inputTrigger(action) {
		if(action === 'close') {
			inputWrap.style.display = 'none';
			inputShow = false;
		}else if(action === 'open'){
			inputWrap.style.display = 'block';
			inputShow = true;
		}
	}

	//重置状态
	function restoreStatus() {
		isEdit = false;
		curIdx = null;
		textInput.value = '';
		addItem.innerText = '增加项目';
	}

	function itemTpl(text) {
		return(
			'<p class="item-content">' + text + '</p>' + 
			'<div class="btn-group">' +
				'<a href"javascript:;" class="edit-btn fa fa-edit"></a>' +
				'<a href"javascript:;" class="remove-btn fa fa-times"></a>' +
			'</div>'
		)
	}

	// 去除编辑状态
	function removeEditStatus() {
		var oItems = document.getElementsByClassName('item'),
			itemLen = oItems.length,
			item;

		for (var i = 0; i < itemLen; i++) {
			item = oItems[i];
			item.className = 'item';
		}
	}
})();