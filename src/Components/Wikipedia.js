import React, { useState, useEffect } from "react";
import { Input, Container, Divider, Header, Icon } from "semantic-ui-react";
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
            srsearch: usableTerm,
            format: "json",
          },
        });
        console.log("data: ", data);
        setResults(data.query.search);
        setFetching(false);
      })();
    }
  }, [usableTerm]);

  const renderedResults = results.map((result, index) => {
    return (
      <React.Fragment key={result.pageid}>
        <div className=" container result-card">
          <div
            className="p-10"
            href={`http://en.wikipedia.org/?curid=${result.pageid}`}
          >
            <h3>{result.title}</h3>
            <p>
              <div
                dangerouslySetInnerHTML={{ __html: result.snippet + " ..." }}
              ></div>
            </p>
          </div>
        </div>
        <Divider />
      </React.Fragment>
    );
  });

  return (
    <Container>
      <Divider />
      <Header as="h2">
        Search <Icon fitted name="wikipedia w"></Icon>ikipedia here!
      </Header>
      <Input
        fluid
        loading={fetching}
        placeholder="Enter search term."
        value={term}
        onChange={e => {
          setTerm(e.target.value);
        }}
      />
      <Divider />
      <div>{renderedResults}</div>
      <Divider />
    </Container>
  );
};

export default Wikipedia;
