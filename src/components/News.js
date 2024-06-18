import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';
import Newsitem from './Newsitem.js';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const capitalFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    document.title = `${capitalFirstLetter(props.category)} - News World`;
    fetchNews();
    loadFavorites();
  }, [props.category, props.country, props.pageSize, props.apikey]); // Dependency array for initial fetch

  useEffect(() => {
    fetchNews();
  }, [query, page]); // Dependency array for search and pagination

  const fetchNews = async () => {
    setLoading(true);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${page}&pageSize=${props.pageSize}&q=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    setArticles(data.articles);
    setTotalResults(data.totalResults);
    setLoading(false);
  };

  const loadFavorites = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset page to 1 when performing a new search
    fetchNews();
  };

  const handleAddFavorite = (article) => {
    const updatedFavorites = [...favorites, article];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleRemoveFavorite = (url) => {
    const updatedFavorites = favorites.filter((fav) => fav.url !== url);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const favoriteArticles = articles.filter((article) => favorites.some((fav) => fav.url === article.url));

  return (
    <>
      <h1 className="text-center" style={{ margin: '30px 0px', marginTop: '50px' }}>
        News World - Top {props.category} Headlines
      </h1>
      <div className="d-flex justify-content-between mb-4">
        <form onSubmit={handleSearch} className="d-flex align-items-center">
          <input
            type="text"
            className="form-control"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary ml-2">
            Search
          </button>
        </form>
        <button className="btn btn-success" onClick={toggleFavorites}>
          {showFavorites ? 'Hide Favorites' : 'Show Favorites'}
        </button>
      </div>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={() => setPage(page + 1)}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {showFavorites
              ? favoriteArticles.map((element) => (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      title={element.title || ''}
                      description={element.description || ''}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                      isFavorite={favorites.some((fav) => fav.url === element.url)}
                      onAddFavorite={() => handleAddFavorite(element)}
                      onRemoveFavorite={() => handleRemoveFavorite(element.url)}
                    />
                  </div>
                ))
              : articles.map((element) => (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      title={element.title || ''}
                      description={element.description || ''}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                      isFavorite={favorites.some((fav) => fav.url === element.url)}
                      onAddFavorite={() => handleAddFavorite(element)}
                      onRemoveFavorite={() => handleRemoveFavorite(element.url)}
                    />
                  </div>
                ))}
          </div>
        </div>
      </InfiniteScroll>
      <div className="container d-flex justify-content-between my-3">
        <button
          disabled={page <= 1}
          className="btn btn-dark"
          onClick={() => setPage(page - 1)}
        >
          &larr; Previous
        </button>
        <button
          disabled={page * props.pageSize >= totalResults}
          className="btn btn-dark"
          onClick={() => setPage(page + 1)}
        >
          Next &rarr;
        </button>
      </div>
    </>
  );
};

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apikey: PropTypes.string.isRequired,
};

export default News;
