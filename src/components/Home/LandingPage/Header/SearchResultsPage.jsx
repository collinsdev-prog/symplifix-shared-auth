import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { mockData } from '../../../../data/MockData'; 
import "./SearchResultsPage.css";

const SearchResultsPage = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Extract search parameters
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query"); // Example: City name
  const searchLocation = queryParams.get("location"); // Example: Lagos

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError("");

      try {
        // Filter mock data based on query and location
        const filteredResults = mockData.filter((item) => {
          const matchesQuery = searchQuery
            ? item.title.toLowerCase().includes(searchQuery.toLowerCase())
            : true;
          const matchesLocation = searchLocation
            ? item.location.toLowerCase().includes(searchLocation.toLowerCase())
            : true;
          return matchesQuery && matchesLocation;
        });

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setResults(filteredResults);
      } catch (err) {
        setError("Failed to fetch search results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery, searchLocation]);

  return (
    <div className="search_results_page">
      <h1>Search Results</h1>

      <p className="search_query">
        Results for:{" "}
        <span className="query_text">
          {searchQuery || "All"} in {searchLocation || "All Locations"}
        </span>
      </p>

      {loading && <p>Loading...</p>}
      {error && <p className="error_message">{error}</p>}

      {!loading && !error && results.length > 0 ? (
        <ul className="results_list">
          {results.map((item) => (
            <li key={item.id} className="result_item">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>
                <strong>Location:</strong> {item.location}
              </p>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                View More
              </a>
            </li>
          ))}
        </ul>
      ) : (
        !loading && !error && <p>No results found for your search criteria.</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
