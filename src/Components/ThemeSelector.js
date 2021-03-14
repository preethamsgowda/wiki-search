import { Grid } from "semantic-ui-react";

import "./../css/ThemeSelector.css";

const ThemeSelector = props => {
  return (
    <Grid className="mt-10 theme-selector">
      <Grid.Column floated="left"></Grid.Column>
      <Grid.Column>
        <div
          className="theme-selector-button theme-white border-black"
          onClick={e => props.setTheme("theme-white")}
        />
      </Grid.Column>
      <Grid.Column>
        <div
          className="theme-selector-button theme-green border-black"
          onClick={e => props.setTheme("theme-green")}
        />
      </Grid.Column>
      <Grid.Column>
        <div
          className="theme-selector-button theme-blue border-black"
          onClick={e => props.setTheme("theme-blue")}
        />
      </Grid.Column>
      <Grid.Column>
        <div
          className="theme-selector-button theme-red border-black"
          onClick={e => props.setTheme("theme-red")}
        />
      </Grid.Column>
      <Grid.Column>
        <div
          className="theme-selector-button theme-orange border-black"
          onClick={e => props.setTheme("theme-orange")}
        />
      </Grid.Column>
    </Grid>
  );
};

export default ThemeSelector;
