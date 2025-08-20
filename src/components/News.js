// import React, { useEffect, useState } from 'react';
// import NewsItem from './NewsItem';
// import Spinner from './Spinner';
// import PropTypes from 'prop-types';


// const News = (props) => {
//    const [articles, setArticles] = useState([]);
//   const [allArticles, setAllArticles] = useState([]); // keep original articles for search
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [totalResults, setTotalResults] = useState(0);
//   const [searchText, setSearchText] = useState("");

//   const capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   }

//   const updateNews = async () => {
//     props.setProgress(10);
//     const apikey = 'afab3dfd8ab78212dea2097475673b69'; // your GNews key
//     const category = props.category;

//     // ✅ Fetching Indian news with pagination
//     const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=in&max=${props.pageSize}&page=${page}&apikey=${apikey}`;

//     setLoading(true);
//     let data = await fetch(url);
//     props.setProgress(30);
//     let parsedData = await data.json();
//     props.setProgress(70);

//     console.log(parsedData);

//     setArticles(parsedData.articles || []);
//     setAllArticles(parsedData.articles || []); // backup for search
//     setTotalResults(parsedData.totalArticles || 0);
//     setLoading(false);
//     props.setProgress(100);
//   }

//   useEffect(() => {
//     document.title = `${capitalizeFirstLetter(props.category)} - NeighborGood News`;
//     updateNews();
//     // eslint-disable-next-line
//   }, [page, props.category]);

//   const handleSearch = () => {
//     if (searchText.trim() === "") {
//       setArticles(allArticles); // reset if search box is empty
//     } else {
//       const filteredArticles = allArticles.filter(
//         (article) =>
//           article.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
//       );
//       setArticles(filteredArticles);
//     }
//   };

//   const handlePreviousClick = () => {
//     setPage(page - 1);
//   }

//   const handleNextClick = () => {
//     setPage(page + 1);
//   }

//   return (
//     <>
//       <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>
//         NeighborGood News - Top {capitalizeFirstLetter(props.category)} Headlines
//       </h1>

//       <div className="search-box p-2 text-center mb-2">
//         <div className="row justify-content-center">
//           <div className="col-lg-6 col-md-8 col-sm-10">
//             <div className="input-group">
//               <input
//                 onChange={(e) => setSearchText(e.target.value)}
//                 type="text"
//                 name="search"
//                 id="search"
//                 className="form-control"
//                 placeholder="Search"
//               />
//               <button
//                 className="btn btn-primary"
//                 onClick={handleSearch}
//               >
//                 Search
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>



//       {loading && <Spinner />}
//       <div className="container">
//         <div className="row">
//           {articles.map((element, index) => {
//             return (
//               <div className="col-md-4" key={index}>
//                 <NewsItem
//                   title={element.title ? element.title : ""}
//                   description={element.description ? element.description : ""}
//                   imageUrl={element.urlToImage}
//                   newsUrl={element.url}
//                   author={element.author}
//                   date={element.publishedAt}
//                   source={element.source.name}
//                 />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//       <div className="container d-flex justify-content-between">
//         <button
//           disabled={page <= 1}
//           type="button"
//           className="btn btn-dark"
//           onClick={handlePreviousClick}
//         >
//           &larr; Previous
//         </button>
//         <button
//           disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
//           type="button"
//           className="btn btn-dark"
//           onClick={handleNextClick}
//         >
//           Next &rarr;
//         </button>
//       </div>
//     </>
//   );
// }

// News.defaultProps = {
//   country: 'in',
//   pageSize: 8,
//   category: 'general',
// }

// News.propTypes = {
//   country: PropTypes.string,
//   pageSize: PropTypes.number,
//   category: PropTypes.string,
// }

// export default News;


import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchText, setSearchText] = useState("");

  // ✅ Helper function for image handling
  const getImage = (article) => {
    if (article.image && article.image !== "") {
      return article.image;
    }
    return "https://via.placeholder.com/400x200.png?text=No+Image";
  };

  const handleSearch = () => {
    const filteredArticles = articles.filter(
      (article) =>
        article.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
    setArticles(filteredArticles);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    const apikey = 'afab3dfd8ab78212dea2097475673b69';
    const category = props.category || 'general';
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=in&max=${props.pageSize}&apikey=${apikey}`;

    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);

    console.log(parsedData);
    setArticles(parsedData.articles || []);
    setTotalResults(parsedData.totalResults || 0);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NeighborGood News`;
    updateNews();
    // eslint-disable-next-line
  }, [page, props.category]);

  const handlePreviousClick = () => {
    setPage(page - 1);
  }

  const handleNextClick = () => {
    setPage(page + 1);
  }

  return (
    <>
      <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>
        NeighborGood News - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>

      {/* 🔍 Search Box */}
      <div className="search-box p-2 text-center mb-2">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <div className="input-group">
              <input
                onChange={(e) => setSearchText(e.target.value)}
                type="text"
                name="search"
                id="search"
                className="form-control"
                placeholder="Search"
              />
              <button
                className="btn btn-primary"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading && <Spinner />}
      <div className="container">
        <div className="row">
          {articles.map((element, index) => {
            return (
              <div className="col-md-4" key={index}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={getImage(element)}   
                  newsUrl={element.url}
                  author={element.source?.name || "Unknown"}
                  date={element.publishedAt}
                  source={element.source?.name || "News"}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination */}
      <div className="container d-flex justify-content-between">
        <button
          disabled={page <= 1}
          type="button"
          className="btn btn-dark"
          onClick={handlePreviousClick}
        >
          &larr; Previous
        </button>
        <button
          disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
          type="button"
          className="btn btn-dark"
          onClick={handleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    </>
  );
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News;
