import React, { Component } from 'react';
import Moment from 'moment';
import { Constants } from '../constants';

class Countdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            intervalId: null,
            timeRemaining: null
        };
        this.tick = this.tick.bind(this);
    }

    componentWillMount() {
        const intervalId = setInterval(this.tick, 1000);
        this.setState({ intervalId });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    tick() {
        this.setState({
            timeRemaining: Moment.duration(Constants.eventDate.diff(Moment.now()))
        })
    }

    render() {
        const { timeRemaining } = this.state;
        return (
            <div className="row">
                <div className={'columns small-12 align-center countdown'}>
                    <div className="small-2 medium-1 text-center">
                        {timeRemaining &&
                            <h2 className="">{timeRemaining._data.months}</h2>
                        }
                        <div className="">mois</div>
                    </div>

                    <div className="small-2 medium-1 text-center countdown-border">
                        {timeRemaining &&
                            <h2 className="">{timeRemaining._data.days}</h2>
                        }
                        <div className="">jours</div>
                    </div>

                    <div className="small-2 medium-1 text-center">

                        {timeRemaining &&
                            <h2 className="">{timeRemaining._data.hours}</h2>
                        }
                        <div className="">heures</div>
                    </div>

                    <div className="small-2 medium-1 text-center countdown-border">

                        {timeRemaining &&
                            <h2 className="">{timeRemaining._data.minutes}</h2>
                        }
                        <div className="">minutes</div>
                    </div>

                    <div className="small-2 medium-1 text-center">

                        {timeRemaining &&
                            <h2 className="">{timeRemaining._data.seconds}</h2>
                        }
                        <div className="">secondes</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Countdown