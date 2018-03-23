"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var AddTackingComponent = (function () {
    function AddTackingComponent() {
        this.isActive = false;
        this.addTrackingTO = {};
        this.bookingList = [{ bookingId: 213, locationFrom: 'CBE', locationTo: 'CHN' },
        ];
    }
    AddTackingComponent.prototype.toggleaddTracking = function (condition) {
        if (condition == 'ongoing')
            this.isActive = false;
        else
            this.isActive = true;
    };
    AddTackingComponent.prototype.ngOnInit = function () {
    };
    AddTackingComponent.prototype.addTracking = function () {
        console.log(this.addTrackingTO);
    };
    AddTackingComponent.prototype.viewTracking = function () {
        console.log(this.addTrackingTO);
    };
    AddTackingComponent = __decorate([
        core_1.Component({
            selector: 'app-add-tacking',
            templateUrl: './add-tacking.component.html',
            styleUrls: ['./add-tacking.component.css']
        })
    ], AddTackingComponent);
    return AddTackingComponent;
}());
exports.AddTackingComponent = AddTackingComponent;
