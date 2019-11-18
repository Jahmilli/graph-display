import React from "react";
import Grid from "../../presentational/Grid/Grid";
import styles from "./HomePage.module.css";

enum SearchOptions {
  BREADTH_FIRST_SEARCH = "Breath First Search",
  SHORTEST_PATH = "Shortest Path"
};

const HomePage: React.FunctionComponent = () => {
  const [searchOption, setSearchOption] = React.useState(SearchOptions.BREADTH_FIRST_SEARCH);
  const [size, setSize] = React.useState(10);



  return (
    <div className={styles.homePageLockup}>
      <div className={styles.infoLockup}>
        <p>Search Option: <strong>{searchOption}</strong></p>
        <p>Size: <strong>{size}</strong></p>
        <div>
          <p>Tool Tip</p>
          <p><strong>Click</strong> to set a marker, this will be the destination endpoint for the initial one to search for</p>
          <p><strong>Control Click</strong> to create a 'blocking' block. Searches will not be able to navigate to a 'blocking' block</p>
        </div>
      </div>    
      <Grid size={size}/>
    </div>
  );
}

export default HomePage;