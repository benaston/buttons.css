var app = app || {};

app.ListToListModel = function (name) {
    "use strict";

    if (!(this instanceof app.ListToListModel)) {
        return new app.ListToListModel();
    }

    var self = this;
    
    this.items = new Array();
    this.name = name;
    this.updateNotificationUri = "update://app.ListToListModel";   

    this.addItem = function (id) {
        self.items.push(id);
        $.publish(self.updateNotificationUri);
    };

    this.removeItem = function (id) {        
        self.items.splice(self.items.indexOf(id), 1);
        $.publish(self.updateNotificationUri);
    };    

    function init() {
        return self;
    }

    return init();
};
