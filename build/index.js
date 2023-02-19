/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/contextMenu.jsx":
/*!****************************************!*\
  !*** ./src/components/contextMenu.jsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ContextMenu; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mediaUpload__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../mediaUpload */ "./src/mediaUpload.jsx");






const replaceMediaUpload = () => _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload;
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.addFilter)('editor.MediaUpload', 'core/edit-post/components/media-upload/replace-media-upload', replaceMediaUpload);
function ContextMenu(_ref) {
  let {
    position,
    onUpload,
    placeText,
    toggleGrid,
    isGridVisible,
    hideContextMenu,
    visible
  } = _ref;
  const {
    x,
    y
  } = position;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('context-menu', visible ? 'visible' : 'hidden'),
    style: {
      left: x + 10,
      top: y + 10
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_mediaUpload__WEBPACK_IMPORTED_MODULE_5__["default"], {
    onUpload: onUpload
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    icon: 'editor-textcolor',
    showTooltip: true,
    label: "Voeg tekst toe",
    onClick: placeText
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    icon: "screenoptions",
    showTooltip: true,
    label: isGridVisible ? 'Verberg raster' : 'Toon raster',
    isPressed: isGridVisible,
    onClick: toggleGrid
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    icon: 'no',
    showTooltip: true,
    label: "Sluit menu",
    onClick: hideContextMenu
  }));
}

/***/ }),

/***/ "./src/components/grid.jsx":
/*!*********************************!*\
  !*** ./src/components/grid.jsx ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Grid; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);


function Grid(_ref) {
  let {
    children,
    gridSize,
    canvasWidth,
    canvasHeight,
    grid,
    mouseState,
    cellState,
    isGridVisible,
    hideContextMenu,
    showContextMenu
  } = _ref;
  const [mousePos, setMousePos] = mouseState;
  const [targetCell, setTargetCell] = cellState;
  const getGridPos = e => {
    const bounds = grid.current.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    const offsetX = bounds.left;
    const offsetY = bounds.top;
    let col = Math.ceil(Math.round(x - offsetX) / gridSize);
    let row = Math.ceil(Math.round(y - offsetY) / gridSize);
    col = col < 1 ? 1 : col;
    row = row < 1 ? 1 : row;
    return {
      x: col,
      y: row
    };
  };
  const trackMouse = e => {
    const bounds = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top
    });
  };
  const trackDrag = e => {
    const pos = getGridPos(e);
    if (pos.x === targetCell.x && pos.y === targetCell.y) return;
    setTargetCell(pos);
  };
  const handleContextMenu = e => {
    e.preventDefault();
    showContextMenu(mousePos);
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: grid,
    onMouseMove: e => {
      trackMouse(e);
      trackDrag(e);
    },
    onDragOver: e => {
      trackMouse(e);
      trackDrag(e);
    },
    onContextMenu: handleContextMenu,
    className: "grid expo-canvas",
    style: {
      gridTemplateColumns: `repeat(${canvasWidth}, ${gridSize}px)`,
      gridTemplateRows: `repeat(${canvasHeight}, ${gridSize}px)`
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    onClick: hideContextMenu,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('grid-bg', isGridVisible && 'show'),
    style: {
      backgroundSize: `${gridSize}px`
    }
  }), children);
}

/***/ }),

/***/ "./src/components/propControl.jsx":
/*!****************************************!*\
  !*** ./src/components/propControl.jsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ PropControl; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);


function PropControl(_ref) {
  let {
    prop,
    selectedItem,
    transformItem,
    label
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "prop-control"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalInputControl, {
    label: label,
    value: selectedItem[prop],
    type: "number",
    onChange: val => {
      transformItem({
        [prop]: val
      });
    }
  }));
}

/***/ }),

/***/ "./src/draggableItem.jsx":
/*!*******************************!*\
  !*** ./src/draggableItem.jsx ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);




const DraggableItem = _ref => {
  let {
    initItem,
    mouseState,
    cellState,
    onDragEnd,
    onDragStart,
    onChange,
    select,
    isSelected,
    isDragging
  } = _ref;
  const ref = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const {
    x,
    y,
    w,
    h,
    z,
    content,
    contentType
  } = initItem;
  const [mousePos, setMousePos] = mouseState;
  const [targetCell, setTargetCell] = cellState;
  const [editableText, setEditableText] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(content);
  const handleDragStart = e => {
    e.dataTransfer.setDragImage(new Image(0, 0), 0, 0);
    onDragStart();
  };
  const handleDrop = () => {
    onDragEnd(targetCell);
  };
  let Child;
  switch (contentType) {
    case 'text':
      {
        Child = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
          onClick: e => {
            // e.stopPropagation();
          },
          style: {
            background: 'transparent',
            resize: 'none',
            width: '100%',
            height: '100%'
          },
          onChange: e => {
            setEditableText(e.currentTarget.value);
          },
          onBlur: () => {
            onChange(editableText);
          },
          value: editableText
        });
        break;
      }
    case 'image':
      {
        Child = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
          className: "content-image",
          src: content,
          alt: ""
        });
        break;
      }
    default:
      {
        Child = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, content);
      }
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('draggable-root', isDragging ? 'dragging' : 'placed', isSelected && 'selected', 'has-' + contentType),
    style: {
      gridColumn: `${x} / span ${w}`,
      gridRow: `${y} / span ${h}`,
      zIndex: z
    },
    draggable: true,
    onDragStart: handleDragStart
    // onDrag={handleDrag}
    ,
    onDragEnd: handleDrop
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "content-wrapper",
    style: isDragging ? {
      left: `${mousePos.x}px`,
      top: `${mousePos.y}px`
    } : {},
    onClick: select
  }, Child));
};
/* harmony default export */ __webpack_exports__["default"] = (DraggableItem);

/***/ }),

/***/ "./src/expoCanvas.jsx":
/*!****************************!*\
  !*** ./src/expoCanvas.jsx ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _draggableItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./draggableItem */ "./src/draggableItem.jsx");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_propControl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/propControl */ "./src/components/propControl.jsx");
/* harmony import */ var _components_grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/grid */ "./src/components/grid.jsx");
/* harmony import */ var _components_contextMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/contextMenu */ "./src/components/contextMenu.jsx");








const deleteItem = () => {};
const ExpoCanvas = _ref => {
  let {
    attributes,
    setAttributes
  } = _ref;
  const {
    items
  } = attributes;
  const grid = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const [selectedIndex, setSelectedIndex] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(undefined);
  const [draggingItemIndex, setDraggingItemIndex] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(undefined);
  const [isContextMenuVisible, setContextMenuVisible] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isGridVisible, setGridVisible] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [menuPos, setMenuPos] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
    x: 0,
    y: 0
  });
  const mouseState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
    x: 0,
    y: 0
  });
  const cellState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
    x: 0,
    y: 0
  });
  const [targetSquare] = cellState;
  const canvasWidth = Number(attributes.canvasWidth || attributes.columnCount);
  const canvasHeight = Number(attributes.canvasHeight);
  const gridSize = Number(attributes.gridSize);
  const getSelectedItem = () => {
    return items[selectedIndex];
  };
  const getDraggingItem = () => {
    return items[draggingItemIndex];
  };
  const toggleGrid = () => {
    setGridVisible(prev => !prev);
  };
  const transformItem = function (newProps) {
    let index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : selectedIndex;
    let newItems = items;
    let editedItem = {
      ...newItems[index],
      ...newProps
    };
    const x = Math.max(editedItem.x, 1);
    const y = Math.max(editedItem.y, 1);
    const w = Math.max(editedItem.w, 1);
    const h = Math.max(editedItem.h, 1);
    const xMax = Math.max(canvasWidth - w + 1, 1);
    const yMax = Math.max(canvasHeight - h + 1, 1);
    editedItem.w = w > canvasWidth ? canvasWidth : w;
    editedItem.h = h > canvasHeight ? canvasHeight : h;
    editedItem.x = x > xMax ? xMax : x;
    editedItem.y = y > yMax ? yMax : y;
    newItems[index] = {
      ...editedItem
    };
    setAttributes({
      items: [...newItems]
    });
  };
  const appendItem = item => {
    let newItems = items;
    newItems.push(item);
    setAttributes({
      items: [...newItems]
    });
  };
  const uploadImage = media => {
    setContextMenuVisible(false);
    appendItem({
      ...targetSquare,
      w: 4,
      h: 4,
      contentType: 'image',
      content: media.url
    });
    setSelectedIndex(items.length - 1);
    transformItem(targetSquare, items.length - 1);
  };
  const placeText = () => {
    setContextMenuVisible(false);
    appendItem({
      ...targetSquare,
      w: 4,
      h: 4,
      contentType: 'text',
      content: 'Typ hier'
    });
    setSelectedIndex(items.length - 1);
    transformItem(targetSquare, items.length - 1);
  };
  const deleteItem = () => {
    const indexToDelete = selectedIndex;
    setSelectedIndex(undefined);
    let newItems = items.filter((item, i) => i !== indexToDelete);
    setAttributes({
      items: [...newItems]
    });
  };
  const hideContextMenu = () => {
    setContextMenuVisible(false);
    setSelectedIndex(undefined);
  };
  const showContextMenu = pos => {
    setMenuPos(pos);
    setContextMenuVisible(true);
  };
  const handleDrop = pos => {
    transformItem(pos, draggingItemIndex);
    setDraggingItemIndex(undefined);
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "expo-root"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('expo-menu', 'active')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Canvasinstellingen"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "prop-control"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalInputControl, {
    label: "Canvashoogte",
    value: canvasHeight,
    type: "number",
    onChange: nextValue => setAttributes({
      canvasHeight: nextValue
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "prop-control"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalInputControl, {
    label: "Canvasbreedte",
    value: canvasWidth,
    type: "number",
    onChange: nextValue => setAttributes({
      canvasWidth: nextValue
    })
  })), getSelectedItem() ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Objectinstellingen"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "Formaat"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_propControl__WEBPACK_IMPORTED_MODULE_4__["default"], {
    selectedItem: getSelectedItem(),
    transformItem: transformItem,
    prop: "w",
    label: "Breedte"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_propControl__WEBPACK_IMPORTED_MODULE_4__["default"], {
    selectedItem: getSelectedItem(),
    transformItem: transformItem,
    prop: "h",
    label: "Hoogte"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "Positie"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_propControl__WEBPACK_IMPORTED_MODULE_4__["default"], {
    selectedItem: getSelectedItem(),
    transformItem: transformItem,
    prop: "x",
    label: "X-as"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_propControl__WEBPACK_IMPORTED_MODULE_4__["default"], {
    selectedItem: getSelectedItem(),
    transformItem: transformItem,
    prop: "y",
    label: "Y-as"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_propControl__WEBPACK_IMPORTED_MODULE_4__["default"], {
    selectedItem: getSelectedItem(),
    transformItem: transformItem,
    prop: "z",
    label: "Z-as"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "Functies"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: "delete",
    icon: 'trash',
    showTooltip: true,
    label: "Verwijder item",
    isDestructive: true,
    onClick: deleteItem
  })) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
    grid: grid,
    gridSize: gridSize,
    canvasWidth: canvasWidth,
    canvasHeight: canvasHeight,
    mouseState: mouseState,
    cellState: cellState,
    hideContextMenu: hideContextMenu,
    showContextMenu: showContextMenu,
    isGridVisible: isGridVisible
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_contextMenu__WEBPACK_IMPORTED_MODULE_6__["default"], {
    toggleGrid: toggleGrid,
    onUpload: uploadImage,
    placeText: placeText,
    position: menuPos,
    hideContextMenu: hideContextMenu,
    visible: isContextMenuVisible,
    isGridVisible: isGridVisible
  }), items.map((item, i) => {
    const isCurrentItemDragging = i === draggingItemIndex;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_draggableItem__WEBPACK_IMPORTED_MODULE_1__["default"], {
      mouseState: mouseState,
      cellState: cellState,
      key: i,
      grid: grid,
      initItem: item,
      select: () => {
        setSelectedIndex(prev => prev === i ? undefined : i);
      },
      onDragStart: () => {
        setDraggingItemIndex(i);
      },
      onDragEnd: handleDrop,
      onChange: val => {
        let items = attributes.items;
        items[i].content = val;
        setAttributes({
          items: [...items]
        });
      },
      isSelected: i === selectedIndex,
      isDragging: isCurrentItemDragging
    });
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (ExpoCanvas);

/***/ }),

/***/ "./src/mediaUpload.jsx":
/*!*****************************!*\
  !*** ./src/mediaUpload.jsx ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);



const ALLOWED_MEDIA_TYPES = ['image'];
function MyMediaUploader(_ref) {
  let {
    onUpload
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUploadCheck, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUpload, {
    onSelect: onUpload,
    allowedTypes: ALLOWED_MEDIA_TYPES,
    render: _ref2 => {
      let {
        open
      } = _ref2;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        icon: 'format-image',
        showTooltip: true,
        label: "Voeg afbeelding toe",
        onClick: open
      });
    }
  }));
}
/* harmony default export */ __webpack_exports__["default"] = (MyMediaUploader);

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;
	var nativeCodeString = '[native code]';

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
					classes.push(arg.toString());
					continue;
				}

				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./scss/main.scss":
/*!************************!*\
  !*** ./scss/main.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["hooks"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./block.json":
/*!********************!*\
  !*** ./block.json ***!
  \********************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"webmodu/expo","title":"Expo","attributes":{"items":{"type":"array","default":[{"x":1,"y":1,"w":4,"h":2,"z":100,"contentType":"image","content":"https://via.placeholder.com/550/250"}]},"canvasHeight":{"type":"number","default":30},"canvasWidth":{"type":"number","default":20},"gridSize":{"type":"number","default":25}},"description":"Klik-en-sleep component om exposities vrij in te delen","editorScript":"file:./build/index.js","style":"file:./build/index.css","render":"file:./partials/expo-frontend.php"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!***********************!*\
  !*** ./src/index.jsx ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../block.json */ "./block.json");
/* harmony import */ var _expoCanvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expoCanvas */ "./src/expoCanvas.jsx");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../scss/main.scss */ "./scss/main.scss");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);







(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_1__.name, {
  ..._block_json__WEBPACK_IMPORTED_MODULE_1__,
  edit: _ref => {
    let {
      attributes,
      setAttributes
    } = _ref;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_expoCanvas__WEBPACK_IMPORTED_MODULE_2__["default"], {
      attributes: attributes,
      setAttributes: setAttributes
    }));
  },
  save: () => {
    return null;
  }
});
}();
/******/ })()
;
//# sourceMappingURL=index.js.map