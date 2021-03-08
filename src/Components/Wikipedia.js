import React, { useState, useEffect } from "react";
import { Input, Container } from "semantic-ui-react";
import axios from "axios";

const Wikipedia = () => {
  const [term, setTerm] = useState("");
  const [usableTerm, setUsableTerm] = useState("");
  const [fetching, setFetching] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setUsableTerm(term);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  useEffect(() => {
    if (usableTerm) {
      setFetching(true);
      (async () => {
        const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
          params: {
            origin: "*",
            action: "query",
            list: "search",
            format: "json",
            srsearch: usableTerm,
          },
        });
        setResults(data.query.search);
        setFetching(false);
      })();
    }
  }, [usableTerm]);

  const resultDivs = results.map((result, index) => {
    return (
      <div key={result.pageid}>
        <div>{result.title}</div>
        <div>{result.snippet}</div>
      </div>
    );
  });

  return (
    <Container>
      <Input
        fluid
        loading={fetching}
        placeholder="Enter search term."
        value={term}
        onChange={e => {
          setTerm(e.target.value);
        }}
      />
      <div>{resultDivs}</div>
    </Container>
  );
};

export default Wikipedia;
