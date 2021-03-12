import React, { useState, useEffect } from "react";
import {
  Input,
  Container,
  Card,
  Divider,
  Header,
  Icon,
} from "semantic-ui-react";
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

  const resultDivs = results.map((result, index) => {
    return (
      <Card
        fluid
        key={result.pageid}
        href={`http://en.wikipedia.org/?curid=${result.pageid}`}
      >
        <Card.Content header={result.title} />
        <Card.Content extra>
          <div dangerouslySetInnerHTML={{ __html: result.snippet }}></div>
        </Card.Content>
      </Card>
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
      <div>{resultDivs}</div>
    </Container>
  );
};

export default Wikipedia;
