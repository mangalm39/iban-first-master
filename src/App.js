import React, {Component} from 'react';
import WorldMap from "./components/WorldMap";
import Accounts from "./components/Accounts";
import ReactTooltip from "react-tooltip";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            rates: [],
            isLoaded: false,
            filteredByCountry: "",
            tooltipContent: ""
        };
    }

    async componentDidMount() {
        await fetch('dataTestDevFront.json')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    accounts: json,
                })
            });
        await fetch('dataApiRate.json')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    rates: json,
                    isLoaded: true
                })
            });
    }

    // this function handle the clicking by country
    handleClick = (geography) => {
        this.setState({
            filteredByCountry: geography.properties.ISO_A2
        })
    };

    // reset the table when you select a country in the map
    resetTable = () => {
        this.setState({
            filteredByCountry: ""
        })
    };

    // this function display the content according to the country
    setTooltipContent = (tooltipContent) => {
        this.setState({
            tooltipContent
        })
    };


    render() {
        const {isLoaded, accounts, rates, filteredByCountry, tooltipContent} = this.state;

        // checking if the page loading
        if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <div className="card">
                    <div className="card-body">
                        <h2 class="card-title text-center">
                            <b>IbanFirst account</b>
                            <button id="reset" type="button" className="btn btn-secondary btn-sm"
                                    onClick={this.resetTable}>
                                <b>Reset filter</b>
                            </button>
                        </h2>
                        <Accounts accounts={accounts} rates={rates} filteredByCountry={filteredByCountry}/>
                        <div className="text-center">
                            <h4>World Map</h4>
                            <WorldMap handleClick={this.handleClick} setTooltipContent={this.setTooltipContent}
                                      filteredByCountry={filteredByCountry}/>
                            <ReactTooltip>{tooltipContent}</ReactTooltip>
                        </div>
                    </div>
                </div>);
        }
    }
}

export default App;
