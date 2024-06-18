import React from 'react';
import PropTypes from 'prop-types';

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date, source, isFavorite, onAddFavorite, onRemoveFavorite }) => {
  const handleImageError = (e) => {
    e.target.src = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.m.wikipedia.org%2Fwiki%2FFile%3ABlue_question_mark_icon.svg&psig=AOvVaw0GYgMCT5Z5aioaYCFDoQVa&ust=1718792347145000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKjEgc325IYDFQAAAAAdAAAAABAE'; // URL of a broken image link icon
  };  

  return (
    <div className="card my-3">
      <img src={imageUrl} className="card-img-top" alt="..." onError={handleImageError} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">
          <small className="text-muted">
            By {author ? author : 'Unknown'} on {new Date(date).toGMTString()}
          </small>
        </p>
        <p className="card-text">
          <small className="text-muted">Source: {source}</small>
        </p>
        <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">
          Read More
        </a>
        {isFavorite ? (
          <button className="btn btn-sm btn-danger ml-2" onClick={onRemoveFavorite}>
            Remove from Favorites
          </button>
        ) : (
          <button className="btn btn-sm btn-success ml-2" onClick={onAddFavorite}>
            Add to Favorites
          </button>
        )}
      </div>
    </div>
  );
};

NewsItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  newsUrl: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
  source: PropTypes.string,
  isFavorite: PropTypes.bool,
  onAddFavorite: PropTypes.func,
  onRemoveFavorite: PropTypes.func,
};

export default NewsItem;
