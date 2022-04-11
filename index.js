"use strict";
exports.__esModule = true;
var DraggableElement = /** @class */ (function () {
    function DraggableElement(element, payload) {
        var _this = this;
        this.element = element;
        this.payload = payload;
        this.element.addEventListener('touchstart', function (e) { return _this.touchDrag(e); });
        this.element.addEventListener('mousedown', function (e) { return _this.mouseDrag(e); });
    }
    DraggableElement.prototype.touchDrag = function (touchStartEvent) {
        var _this = this;
        touchStartEvent.preventDefault();
        var _a = touchStartEvent.changedTouches[0], pageX = _a.pageX, pageY = _a.pageY;
        this.element.classList.add('v-draggable-drag');
        var _b = this.element.getClientRects()[0], width = _b.width, height = _b.height;
        this.element.style.left = pageX - width / 2 + 'px';
        this.element.style.top = pageY - height / 2 + 'px';
        var handleTouchMove = function (touchMoveEvent) {
            var _a, _b, _c;
            var _d = touchMoveEvent.changedTouches[0], pageX = _d.pageX, pageY = _d.pageY;
            _this.element.style.left = pageX - width / 2 + 'px';
            _this.element.style.top = pageY - height / 2 + 'px';
            var targetElements = document.elementsFromPoint(pageX, pageY);
            var dropArea = targetElements.find(function (element) { return element === null || element === void 0 ? void 0 : element.isDropArea; });
            if (dropArea && !_this.isIntersecting) {
                if (_this.payload.arg)
                    (_a = _this.payload) === null || _a === void 0 ? void 0 : _a.arg('ENTER', dropArea);
                _this.lastDropArea = dropArea;
                _this.isIntersecting = true;
                dropArea === null || dropArea === void 0 ? void 0 : dropArea.dropAreaHandler({ type: 'ENTER', value: _this.payload.value });
            }
            if (!dropArea && _this.isIntersecting) {
                if (_this.payload.arg)
                    (_b = _this.payload) === null || _b === void 0 ? void 0 : _b.arg('LEAVE', _this.lastDropArea);
                _this.isIntersecting = false;
                (_c = _this.lastDropArea) === null || _c === void 0 ? void 0 : _c.dropAreaHandler({ type: 'LEAVE', value: _this.payload.value });
                _this.lastDropArea = undefined;
            }
        };
        var handleTouchEnd = function (touchEndEvent) {
            touchEndEvent.preventDefault();
            _this.element.classList.remove('v-draggable-drag');
            _this.element.style.left = null;
            _this.element.style.top = null;
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('touchcancel', handleTouchEnd);
            _this.touchDrop(touchEndEvent);
        };
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);
        window.addEventListener('touchcancel', handleTouchEnd);
    };
    DraggableElement.prototype.touchDrop = function (event) {
        var _a;
        var _b = event.changedTouches[0], pageX = _b.pageX, pageY = _b.pageY;
        var targetElements = document.elementsFromPoint(pageX, pageY);
        var dropArea = targetElements.find(function (element) { return element === null || element === void 0 ? void 0 : element.isDropArea; });
        if (dropArea) {
            if (this.payload.arg)
                (_a = this.payload) === null || _a === void 0 ? void 0 : _a.arg('DROP', dropArea);
            dropArea === null || dropArea === void 0 ? void 0 : dropArea.dropAreaHandler({ type: 'DROP', value: this.payload.value });
        }
    };
    DraggableElement.prototype.mouseDrag = function (mouseStartEvent) {
        var _this = this;
        mouseStartEvent.preventDefault();
        var pageX = mouseStartEvent.pageX, pageY = mouseStartEvent.pageY;
        this.element.classList.add('v-draggable-drag');
        var _a = this.element.getClientRects()[0], width = _a.width, height = _a.height;
        this.element.style.left = pageX - width / 2 + 'px';
        this.element.style.top = pageY - height / 2 + 'px';
        var handleMouseMove = function (mouseMoveEvent) {
            var _a, _b, _c;
            var pageX = mouseMoveEvent.pageX, pageY = mouseMoveEvent.pageY;
            _this.element.style.left = pageX - width / 2 + 'px';
            _this.element.style.top = pageY - height / 2 + 'px';
            var targetElements = document.elementsFromPoint(pageX, pageY);
            var dropArea = targetElements.find(function (element) { return element === null || element === void 0 ? void 0 : element.isDropArea; });
            if (dropArea && !_this.isIntersecting) {
                if (_this.payload.arg)
                    (_a = _this.payload) === null || _a === void 0 ? void 0 : _a.arg('ENTER', dropArea);
                _this.lastDropArea = dropArea;
                _this.isIntersecting = true;
                dropArea === null || dropArea === void 0 ? void 0 : dropArea.dropAreaHandler({ type: 'ENTER', value: _this.payload.value });
            }
            if (!dropArea && _this.isIntersecting) {
                if (_this.payload.arg)
                    (_b = _this.payload) === null || _b === void 0 ? void 0 : _b.arg('LEAVE', _this.lastDropArea);
                _this.isIntersecting = false;
                (_c = _this.lastDropArea) === null || _c === void 0 ? void 0 : _c.dropAreaHandler({ type: 'LEAVE', value: _this.payload.value });
                _this.lastDropArea = undefined;
            }
        };
        var handleMouseEnd = function (mouseEndEvent) {
            mouseEndEvent.preventDefault();
            _this.element.classList.remove('v-draggable-drag');
            _this.element.style.left = null;
            _this.element.style.top = null;
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseEnd);
            _this.mouseDrop(mouseEndEvent);
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseEnd);
    };
    DraggableElement.prototype.mouseDrop = function (event) {
        var _a;
        var pageX = event.pageX, pageY = event.pageY;
        var targetElements = document.elementsFromPoint(pageX, pageY);
        var dropArea = targetElements.find(function (element) { return element === null || element === void 0 ? void 0 : element.isDropArea; });
        if (dropArea) {
            if (this.payload.arg)
                (_a = this.payload) === null || _a === void 0 ? void 0 : _a.arg('DROP', dropArea);
            dropArea === null || dropArea === void 0 ? void 0 : dropArea.dropAreaHandler({ type: 'DROP', value: this.payload.value });
        }
    };
    return DraggableElement;
}());
var DroppableElement = /** @class */ (function () {
    function DroppableElement(element, handler) {
        this.element = element;
        this.handler = handler;
        this.element.isDropArea = true;
        if (!handler || typeof handler !== 'function') {
            console.error('v-droppable handler is missing');
        }
        this.element.dropAreaHandler = this.handler;
    }
    return DroppableElement;
}());
exports["default"] = {
    install: function (app) {
        app.directive("draggable", {
            mounted: function (element, payload) {
                new DraggableElement(element, payload);
            }
        });
        app.directive("droppable", {
            mounted: function (element, handler) {
                new DroppableElement(element, handler.value);
            }
        });
    }
};
