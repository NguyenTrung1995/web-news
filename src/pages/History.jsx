import React from 'react';
import { connect } from "react-redux";
import Card from '../components/Card';
import {addHistory } from "../actions";

class History extends React.Component {

  generatorNews = () => {
    return this.props.history.map((x, i) => 
      <Card key={i} article={x} />
    )
  }

  render() {
    return(
      <div>
        <h1>History Page</h1>
        {this.generatorNews()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  history: state.history
})

export default connect(mapStateToProps, { addHistory })(History);