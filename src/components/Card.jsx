import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.a`
  background: #f1f1f1;
  display: flex;
  margin-bottom: 10px;
  border-radius: 4px;
  text-decoration: none;
  color: #333;

  img {
    width: 200px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;

    @media only screen and (max-width: 600px) {
      width: 100px
    }
  }
`

const CardContent = styled.div`
  display: flex;
  width: calc(100% - 200px);
  flex-direction: column;

  @media only screen and (max-width: 600px) {
    width: calc(100% - 100px);
  }

  & > span {
    text-align: left;
    padding-left: 10px;

    @media only screen and (max-width: 600px) {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-left: 5px;
      font-size: 12px;
    } 
  }
`

const ContentTitle = styled.span`
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid #0101012e;
  font-weight: 600;

  @media only screen and (max-width: 600px) {
    padding: 5px 0;
  }
`

const ContentDesc = styled.span`
  padding-bottom: 10px;

  @media only screen and (max-width: 600px) {
    padding-bottom: 5px;
  }
`

const ContentSource = styled.div`
  text-align: right;
  padding-right: 10px;
  padding-bottom: 10px;
  font-weight: bold;

  @media only screen and (max-width: 600px) {
    font-size: 12px;
    padding-right: 5px;
    padding-bottom: 5px;
  }
`

const Card = props => {
  return (
    <CardWrapper
      href={props.article.url}
      onClick={() => props.addHistory(props.article)}
      target="_blank" 
      rel="noopener noreferrer"
    >
      <img src={props.article.urlToImage} alt="img" />
      <CardContent>
        <ContentTitle>{props.article.title}</ContentTitle>
        <ContentDesc>{props.article.description}</ContentDesc>
        <ContentSource>{props.article.source}</ContentSource>
      </CardContent>
    </CardWrapper>
  )
}

export default Card;