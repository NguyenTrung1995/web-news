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
  }
`

const CardContent = styled.div`
  display: flex;
  width: calc(100% - 200px);
  flex-direction: column;

  & > span {
    text-align: left;
    padding-left: 10px;
  }
`

const ContentTitle = styled.span`
  padding-bottom: 10px;
  margin-bottom: 10px;
  padding-top: 10px;
  border-bottom: 1px solid black;
  font-weight: 600;
`

const ContentDesc = styled.span`
  padding-bottom: 10px;
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
      </CardContent>
    </CardWrapper>
  )
}

export default Card;