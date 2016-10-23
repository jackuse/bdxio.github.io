import {ICFPPresentation} from "../int/ICFPPresentation";
import {ICFPSpeaker} from "../int/ICFPSpeaker";
import * as marked from "marked";
import * as moment from 'moment';
import {ITalkAsset} from "../int/ISharedModel";

export class CFPPresentation implements ICFPPresentation {

    id:string;
    title:string;
    summary:string;
    speakers:Array<ICFPSpeaker>;
    track:string;
    type:string;
    from:moment.Moment;
    to:moment.Moment;
    room:string;
    overflow:boolean;
    overflowThrough:boolean;
    assets:Array<ITalkAsset>;

    isBreak:boolean;
    isLunch:boolean;

    public toSpeakersList():string {
        return _.map(this.speakers, (speaker:ICFPSpeaker) => (speaker.fullName()) + (speaker.company ? ' (' + speaker.company + ')' : '')).join(', ');
    }

    public markedSummary() {
        return marked(this.summary);
    }
}