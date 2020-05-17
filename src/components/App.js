import React, { Component } from "react";
import AddAppointments from "./add-appointment/add-appointment.components";
import ListAppointments from "./list-appointment/list-appointmemt.components";
import SearchAppointments from "./search-appointment/search-appointment.components";
import "../css/App.css";

import { without } from "lodash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myAppointments: [],
      lastIndex: 0,
    };
    this.deleteAppointment = this.deleteAppointment.bind(this);
  }

  componentDidMount() {
    fetch("./data.json")
      .then((response) => response.json())
      .then((result) => {
        const apts = result.map((item) => {
          item.aptId = this.state.lastIndex;
          this.setState({ lastIndex: this.state.lastIndex + 1 });
          return item;
        });
        this.setState({ myAppointments: apts });
      });
  }
  deleteAppointment(apt) {
    let tempApts = this.state.myAppointments;
    tempApts = without(tempApts, apt);

    this.setState({
      myAppointments: tempApts,
    });
  }
  render() {
    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments />
                <SearchAppointments />
                <ListAppointments
                  appointments={this.state.myAppointments}
                  deleteAppointment={this.deleteAppointment}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
