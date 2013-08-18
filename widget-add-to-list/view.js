var app = app || {};

app.ListToListView = function (model) {
    "use strict";

    if (!(this instanceof app.ListToListView)) {
        return new app.ListToListView();
    } 

    var self = this;

    this.$domElementForDestinationList = $("*[data-list-to-list-destination-name='" + model.name + "']");
    this.$domElementsThatToggle = $("*[data-list-to-list-action='toggle'][data-list-to-list-name='" + model.name + "']");
    this.$domElementsThatAdd = $("*[data-list-to-list-action='add'][data-list-to-list-name='" + model.name + "']");
    this.$domElementsThatRemove = $("*[data-list-to-list-action='remove'][data-list-to-list-name='" + model.name + "']");
    
    this.onAdd = function (e) {        
        self.Model.addItem($(e.target).attr('data-list-to-list-item-id'));
    };

    this.onRemove = function (e) {
        self.Model.removeItem($(e.target).attr('data-list-to-list-item-id'));
    };

    this.onToggle = function (e) {
        var id = $(e.target).attr('data-list-to-list-item-id');

        if(self.$domElementForDestinationList.find('[data-list-to-list-item-id=' + id + ']').length > 0)
        {
           self.onRemove(e);
        }
        else
        {
           self.onAdd(e);  
        }
    };    

    this.render = function () {
        self.$domElementForDestinationList.empty();
        
        $("*[data-list-to-list-action='add'][data-list-to-list-name='" + self.Model.name + "']").removeAttr('disabled');
        $("*[data-list-to-list-action='remove'][data-list-to-list-name='" + self.Model.name + "']").attr('disabled', 'disabled');
        $("*[data-list-to-list-action='toggle'][data-list-to-list-name='" + self.Model.name + "']").removeClass('is-selected');    

        for (var i = 0; i < self.Model.items.length; i++) {
            var element = $('#template-list-item-id-' + self.Model.items[i]).html();
            self.$domElementForDestinationList.append(element);

            //set the selected status of the toggle elements
            var $domElementsThatToggleItem = $("*[data-list-to-list-action='toggle'][data-list-to-list-name='" + self.Model.name + "'][data-list-to-list-item-id='" + self.Model.items[i] + "']");
            $domElementsThatToggleItem.addClass('is-selected');

            $("*[data-list-to-list-action='remove'][data-list-to-list-name='" + self.Model.name + "'][data-list-to-list-item-id='" + self.Model.items[i] + "']").removeAttr('disabled');
            $("*[data-list-to-list-action='add'][data-list-to-list-name='" + self.Model.name + "'][data-list-to-list-item-id='" + self.Model.items[i] + "']").attr('disabled', 'disabled');
        }
    };    

    function init() {
        self.Model = model;
        self.$domElementsThatToggle.click(self.onToggle);
        self.$domElementsThatAdd.click(self.onAdd);
        self.$domElementsThatRemove.click(self.onRemove);
        self.render();

        $.subscribe(self.Model.updateNotificationUri, self.render);

        return self;
    }

    return init();
};
