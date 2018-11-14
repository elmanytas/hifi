//  draggableNumber.js
//
//  Created by David Back on 7 Nov 2018
//  Copyright 2018 High Fidelity, Inc.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html

const DELTA_X_FOCUS_THRESHOLD = 2;

function DraggableNumber(min, max, step) {
    this.min = min;
    this.max = max;
    this.step = step !== undefined ? step : 1;
	this.initialMouseEvent = null;
    this.lastMouseEvent = null;
    this.valueChangeFunction = null;
    this.initialize();
}

DraggableNumber.prototype = {
    mouseDown: function(event) {
		if (event.target === this.elText) {
			this.initialMouseEvent = event;
			this.lastMouseEvent = event;
			document.addEventListener("mousemove", this.onMouseMove);
			document.addEventListener("mouseup", this.onMouseUp);
		}
    },
    
    mouseMove: function(event) {
        if (this.lastMouseEvent) {
            let dx = event.clientX - this.lastMouseEvent.clientX;
			let inputChanged = dx !== 0;
			if (inputChanged) {
				while (dx !== 0) {
					if (dx > 0) {
						this.stepUp();
						--dx;
					} else {
						this.stepDown();
						++dx;
					}
				}
				if (this.valueChangeFunction) {
					this.valueChangeFunction();
				}
			}
            this.lastMouseEvent = event;
        }
    },
    
    mouseUp: function(event) {
		if (this.initialMouseEvent) {
			let dx = event.clientX - this.initialMouseEvent.clientX;
			if (dx <= DELTA_X_FOCUS_THRESHOLD) {
				this.elInput.style.visibility = "visible";
				this.elText.style.visibility = "hidden";
			}
			this.initialMouseEvent = null;
			this.lastMouseEvent = null;
			document.removeEventListener("mousemove", this.onMouseMove);
			document.removeEventListener("mouseup", this.onMouseUp);
		}
    },
	
	stepUp: function() {
		this.elInput.stepUp();
		this.inputChange();
	},
	
	stepDown: function() {
		this.elInput.stepDown();
		this.inputChange();
	},
	
	setValue: function(newValue) {
		this.elInput.value = newValue;
        this.elText.firstChild.data = newValue;
	},

    setValueChangeFunction: function(valueChangeFunction) {
        if (this.valueChangeFunction) {
            this.elInput.removeEventListener("change", this.valueChangeFunction);
        }
        this.valueChangeFunction = valueChangeFunction.bind(this.elInput);
        this.elInput.addEventListener("change", this.valueChangeFunction);
    },
	
	inputChange: function() {
		this.setValue(this.elInput.value);
	},
	
	inputBlur: function() {
		this.elInput.style.visibility = "hidden";
		this.elText.style.visibility = "visible";
	},
    
    initialize: function() {
		this.onMouseDown = this.mouseDown.bind(this);
        this.onMouseMove = this.mouseMove.bind(this);
        this.onMouseUp = this.mouseUp.bind(this);
		this.onStepUp = this.stepUp.bind(this);
		this.onStepDown = this.stepDown.bind(this);
		this.onInputChange = this.inputChange.bind(this);
		this.onInputBlur = this.inputBlur.bind(this);
        
        this.elDiv = document.createElement('div');
        this.elDiv.className = "draggable-number";
		
		this.elText = document.createElement('label');
		this.elText.className = "draggable-number text";
		this.elText.innerText = " ";
		this.elText.style.visibility = "visible";
		this.elText.addEventListener("mousedown", this.onMouseDown);
		
		this.elLeftArrow = document.createElement('span');
        this.elRightArrow = document.createElement('span');
        this.elLeftArrow.className = 'draggable-number left-arrow';
        this.elLeftArrow.innerHTML = 'D';
		this.elLeftArrow.addEventListener("click", this.onStepDown);
        this.elRightArrow.className = 'draggable-number right-arrow';
        this.elRightArrow.innerHTML = 'D';
		this.elRightArrow.addEventListener("click", this.onStepUp);
        
        this.elInput = document.createElement('input');
		this.elInput.className = "draggable-number input";
        this.elInput.setAttribute("type", "number");
        if (this.min !== undefined) {
            this.elInput.setAttribute("min", this.min);
        }
        if (this.max !== undefined) {
            this.elInput.setAttribute("max", this.max);
        }
        if (this.step !== undefined) {
            this.elInput.setAttribute("step", this.step);
        }
		this.elInput.style.visibility = "hidden";
		this.elInput.addEventListener("change", this.onInputChange);
		this.elInput.addEventListener("blur", this.onInputBlur);
        
        this.elText.appendChild(this.elLeftArrow);
        this.elText.appendChild(this.elInput);
        this.elText.appendChild(this.elRightArrow);
		this.elDiv.appendChild(this.elText);
    }
};
