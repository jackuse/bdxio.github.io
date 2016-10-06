import {ICFPEventModel} from "../../../models/int/ICFPEventModel";
import {ICFPEvent} from "../../../models/int/ICFPEvent";
import {ICFPPresentation} from "../../../models/int/ICFPPresentation";
import {ISharedModel} from "../../../models/int/ISharedModel";
import {IConfig} from "../../../models/int/ISharedModel";
import * as moment from 'moment';
import * as _ from 'lodash';
import {ProgramOptions} from "./ProgramOptions";
import IHttpService = angular.IHttpService;
import ILocationService = angular.ILocationService;
import {ICFPDay} from "../../../models/int/ICFPDay";

export class ProgramPrintPageComponent implements ng.IDirective {

    public controller:Function = ProgramPrintPageController;
    public controllerAs:string = '$ctrl';
    public bindToController:boolean = true;

    public template:string = `
    <section>
        <table class="cfp-program-print">
            <thead>
                <tr>
                    <th class="slot-print">Slot</th>
                    <th class="room-print" ng-repeat="room in $ctrl.currentDay.rooms">
                        {{ room }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat="slot in $ctrl.currentDay.slots"">
                    <td class="time-slot-print">{{ slot.from.toDate() | date: $ctrl.timePattern }} - {{ slot.to.toDate() | date: $ctrl.timePattern }}</td>
                    <td ng-repeat="prez in slot.presentations" rowspan="{{ prez.overflowThrough && !prez.isBreak ? 3 : 1 }}" ng-hide="prez.overflow"
                        ng-class="$ctrl.talkClasses(prez)">
                        <div class="slot-content" ng-show="prez.title">
                            <p class="title">{{ prez.title }}</p>
                            <div ng-show="!prez.isBreak">
                                <div class="name-speaker-print">{{ prez.toSpeakersList() }}</div>
                                <div class="name-track-print" ng-class="$ctrl.options.trackClasses[prez.track]"></div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>


        <div class="container-legend">
               <!-- Types Legend -->
                <ul class="legend-list">
                    <li ng-repeat="(type, class) in $ctrl.options.typeClasses" ng-class="class"><span class="bullet-type"></span> {{ type }}</li>
                </ul>

                <!-- Tracks Legend -->
                <ul class="legend-tracks">
                    <li ng-repeat="(track, class) in $ctrl.options.trackClasses" ng-class="class">{{ track }}</li>
                </ul>
        </div>

    </section>
    `
}

export class ProgramPrintPageController {

    public static $inject:Array<string> = ['ISharedModel'];

    public event:ICFPEvent;
    public currentDay:ICFPDay;
    public config:IConfig;
    public options:ProgramOptions;

    public timePattern:string = 'HH:mm';
    public now:moment.Moment = moment();

    public constructor(private sharedModel:ISharedModel) {
        this.options = ProgramOptions.buildDefault();
        sharedModel.dataLoaded.then(() => {
            this.event = sharedModel.data.event;
            this.currentDay = this.event.days[0];
        });
    }

    public talkClasses(prez:ICFPPresentation):any {
        var classes = [];
        if (prez && prez.isBreak) {
            classes.push('break')
        }
        if (prez && prez.type && this.options) {
            classes.push(this.options.typeClasses[prez.type])
        }
        return classes;
    }
}