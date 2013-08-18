var app = app || {};

app.DialogModel = function () {
    "use strict";

    if (!(this instanceof app.DialogModel)) {
        return new app.DialogModel();
    }

    var self = this;

    this.updateNotificationUri = "update://app.DialogModel";

    self.isVisible = false;

    this.getCurtainVisibility = function () {
        return self.isCurtainVisible;
    };

    this.setCurtainVisibility = function (isVisible) {
        self.isCurtainVisible = isVisible;
        $.publish(self.updateNotificationUri);
    };

	this.getDialogVisibility = function () {
        return self.isDialogVisible;
    };

    this.setDialogVisibility = function (isVisible) {
        self.isDialogVisible = isVisible;
        $.publish(self.updateNotificationUri);
    };
    
    this.getState = function () {
        return self.state;
    };

    this.setState = function (state) {
        self.state = state;
        $.publish(self.updateNotificationUri);
    };

	this.getIsFlipped = function () {
        return self.isFlipped;
    };

    this.setIsFlipped = function (isFlipped) {	
        self.isFlipped = isFlipped;
        $.publish(self.updateNotificationUri);
    };
   
    this.exampleCustomLogic = function () {
        self.setState("waiting");
		setTimeout(function(){
			self.setState('success');
		}, 2000);
    };

    function init() {
        return self;
    }

    return init();
};
