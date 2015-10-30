var tabsAdminController = function(){

	this.tabActive = 1;

	this.changeTab = function(id){
		this.tabActive = id;
	};

	this.isValueTab = function(id){
		return this.tabActive === id;
	};

};