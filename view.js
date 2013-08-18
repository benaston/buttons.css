var app = app || {};

app.DialogView = function (model) {
    "use strict";

    if (!(this instanceof app.DialogView)) {
        return new app.DialogView();
    }

    var self = this;

    this.$el = $("#example");
    this.$grayCurtain = $("#gray-curtain");
    this.$btnSuccess = self.$el.find(".circular-btn[data-action='success']");
    this.$btnShow = $(".btn-show-dialog");
    this.$btnHide = self.$el.find(".circular-btn[data-action='cancel']");
    this.$form = self.$el.find("form");    
    this.$title = self.$el.find(".dialog h3");    
    this.$strings = self.$el.data("strings");
    this.$messages = self.$el.find(".message");
	this.$positionedElement = self.$el.find(".dialog.front");

    this.onShow = function (e) {               		
        self.Model.exampleCustomLogic();
        $(document).keyup(self.onKeyUp);        
		self.Model.setDialogVisibility(true);
		self.Model.setCurtainVisibility(true);		
		self.Model.setIsFlipped(false);		
    };

    this.onHide = function () {
        self.Model.setCurtainVisibility(false);
        self.Model.setDialogVisibility(false);		
		setTimeout(function() { self.Model.setIsFlipped(true) }, 350);
        $(document).unbind("keyup");
    };

    this.onKeyUp = function (e) {
        if (e.keyCode == 27) {
            self.onHide();
        }
    };

    this.onSuccess = function () {
        self.Model.setIsFlipped(true);
		self.Model.setCurtainVisibility(false);
		setTimeout(function() { self.Model.setDialogVisibility(false) }, 350);
    };

    this.render = function () {        
        self.$el.attr("data-state", self.Model.getState());        

        if (self.Model.getCurtainVisibility()) {
            self.$grayCurtain.addClass("active");
        } else {
            self.$grayCurtain.removeClass("active");            
        }
		
		if (self.Model.getDialogVisibility()) {
            self.$el.addClass("active");
        } else {
            self.$el.removeClass("active");
			self.resetDialogPosition();
        }
		
		if (self.Model.getIsFlipped()) {
            self.$form.addClass("flipped");
        } else {
            self.$form.removeClass("flipped");            
        }
    };    
	
	this.resetDialogPosition = function () {                
		setTimeout(function() { self.$positionedElement.removeAttr('style'); }, 100);
	}
	
    this.initStrings = function () {                
        self.$title.html(self.$strings["title"]);
        self.$messages.each(
			function (index) { 
				$(this).html(self.$strings["message-" + $(this).parent("article").attr("class").split(' ')[0]]); 
			});
    };

    function init() {
        self.Model = model;
        self.$btnShow.click(self.onShow);
        self.$btnHide.click(self.onHide);
        self.$btnSuccess.click(self.onSuccess);        
		self.initStrings();
		self.$el.drags({handle:"header"});
		
        $.subscribe(self.Model.updateNotificationUri, self.render);

        return self;
    }

    return init();
};
