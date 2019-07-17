import React from 'react';
import Card from '../components/Card';
import { connect } from "react-redux";
import { addHistory } from "../actions";
import styled from 'styled-components';
import request from "superagent";

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
      searchResult: [],
      hasMore: true,
      isLoading: false,
      error: false,
      news: [],
      initPage: 1
    }

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
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
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

  handleSearchInput = e => {
    this.setState({
      searchValue: e.target.value
    })
  }

  searchedList = () => {
    const result = this.state.news.filter(article => {
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
    const {
      error,
      hasMore,
      isLoading,
      searchValue
    } = this.state;
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
        {searchValue &&
          this.searchedList()
        }
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   news: state.news
// })

export default connect(null, { addHistory })(Home);