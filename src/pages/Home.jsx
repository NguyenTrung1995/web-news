import React from 'react';
import Card from '../components/Card';
import { connect } from "react-redux";
import { addHistory } from "../actions";
import styled from 'styled-components';
import request from "superagent";
import { debounce } from 'lodash';

const Input = styled.input`
  border: none;
  border: 1px solid #000;
  padding: 10px 20px;
  font-size: 20px;
  margin-bottom: 20px;
  border-radius: 25px;
  width: 300px;
  outline: none;

  @media only screen and (max-width: 600px) {
    padding: 5px 20px;
    font-size: 16px;
    width: 200px;
  }
`

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      searchResult: [],
      hasMore: true,
      isLoading: false,
      error: false,
      news: [],
      initPage: 1,
      inputText: ''
    }

    this.handleSearchInput = debounce(this.handleSearchInput, 500);

    window.onscroll = () => {
      const {
        loadUsers,
        state: {
          error,
          isLoading,
          hasMore,
        },
      } = this;

      if (error || isLoading || !hasMore) return;

      if (
        window.innerHeight + window.scrollY
        === window.document.documentElement.offsetHeight
      ) {
        loadUsers();
      }
    };
  }

  componentWillMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    this.setState({ isLoading: true }, () => {
      request
        .get(`https://newsapi.org/v2/everything?domains=cnn.com,nytimes.com&page=${this.state.initPage}&apiKey=cc4128d9911c4568bab94d7e1d59e2d6`)
        .then((results) => {     
          const nextNews = results.body.articles.map(article => ({
            title: article.title,
            description: article.description,
            source: article.source.name,
            url: article.url,
            urlToImage: article.urlToImage
          }));

          this.setState({
            hasMore: (this.state.news.length < 50),
            isLoading: false,
            news: [
              ...this.state.news,
              ...nextNews,
            ],
            initPage: this.state.initPage + 1
          });
        })
        .catch((err) => {
          this.setState({
            error: err.message,
            isLoading: false,
           });
        })
    });
  }

  generatorNews = () => {
    return this.state.news.map((x, i) => 
      <Card key={i} article={x} addHistory={this.props.addHistory} />
    )
  }

  handleSearchInput = () => {
    const value = this.state.inputText;
    if (value) {
      request
      .get(`https://newsapi.org/v2/everything?q=${encodeURI(value)}&apiKey=cc4128d9911c4568bab94d7e1d59e2d6`)
      .then((results) => {     
        const nextNews = results.body.articles.map(article => ({
          title: article.title,
          description: article.description,
          source: article.source.name,
          url: article.url,
          urlToImage: article.urlToImage
        }));

        this.setState({
          searchResult: [...nextNews],
          isSearching: true
        });
      })
      .catch((err) => {
        this.setState({
          error: err.message,
          });
      })
    } else {
      this.setState({
        isSearching: false
      });
    }
  }

  searchedList = () => {
    return this.state.searchResult.map((x, i) => 
      <Card key={i} article={x} addHistory={this.props.addHistory} />
    )
  }

  handleChange = e => {
    this.setState({
      inputText: e.target.value
    });
    this.handleSearchInput();
  }

  render() {
    const { error, hasMore, isLoading, isSearching } = this.state;
    return (
      <div>
        <Input
          value={this.state.inputText}
          placeholder="Search"
          onChange={this.handleChange}
        />
        {!isSearching &&
          this.generatorNews()
        }
        {isSearching &&
          this.searchedList()
        }
        {error &&
          <div style={{ color: '#900' }}>
            {error}
          </div>
        }
        {isLoading &&
          <div>Loading...</div>
        }
        {!hasMore &&
          <div>You did it! You reached the end!</div>
        }
      </div>
    );
  }
}

export default connect(null, { addHistory })(Home);