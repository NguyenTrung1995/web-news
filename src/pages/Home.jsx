import React from 'react';
import Card from '../components/Card';
import { connect } from "react-redux";
import { fetchNews, addHistory } from "../actions";
import styled from 'styled-components';

const Input = styled.input`
  border: none;
  border: 1px solid #000;
  padding-left: 10px;
  font-size: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  width: 300px;
  outline: none;
`

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      searchResult: []
    }
  }

  componentDidMount() {
    this.props.fetchNews()
  }

  generatorNews = () => {
    return this.props.news.map((x, i) => 
      <Card key={i} article={x} addHistory={this.props.addHistory} />
    )
  }

  handleSearchInput = e => {
    this.setState({
      searchValue: e.target.value
    })
  }

  searchedList = () => {
    const result = this.props.news.filter(article => {
      const titleLower = article.title.toLowerCase();
      const descLower = article.description ? article.description.toLowerCase() : '';
      const searchValueLower = this.state.searchValue.toLowerCase();

      if ((titleLower.indexOf(searchValueLower) !== -1) || (descLower.indexOf(searchValueLower) !== -1)) {
        return true;
      }
      return false;
    })
    return result.map((x, i) => 
      <Card key={i} article={x} addHistory={this.props.addHistory} />
    )
  }

  render() {
    const { searchValue } = this.state;
    return (
      <div>
        <Input
          value={searchValue}
          placeholder="Search"
          onChange={this.handleSearchInput}
        />
        {!searchValue &&
          this.generatorNews()
        }
        {searchValue &&
          this.searchedList()
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  news: state.news
})

export default connect(mapStateToProps, { fetchNews, addHistory })(Home);