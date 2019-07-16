import React from 'react';
import Card from '../components/Card';
import { connect } from "react-redux";
import { fetchNews } from "../actions";

class Home extends React.Component {

  componentDidMount() {
    this.props.fetchNews()
  }

  generatorNews = () => {
    return this.props.news.map((x, i) => 
      <Card key={i} arcticle={x} />
    )
  }

  render() {
    return (
      <div>
        {this.generatorNews()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  news: state.news
})

export default connect(mapStateToProps, { fetchNews })(Home);