import React from "react";
import Grid from "../../presentational/Grid/Grid";
import styles from "./HomePage.module.css";

export enum SearchOptions {
  BREADTH_FIRST_SEARCH = "Breath First Search",
  SHORTEST_PATH = "Shortest Path"
};


const HomePage: React.FunctionComponent = () => {
  const [searchOption, setSearchOption] = React.useState(SearchOptions.BREADTH_FIRST_SEARCH);
  const [size, setSize] = React.useState(20);
  const [pathLength, setPathLength] = React.useState(0);

  const getPathLength = (length: number) => {
    setPathLength(length);
  }

  const handleInputChange = (event: any) => {
    setSearchOption(event.target.value);
  }

  React.useEffect(() => {

  }, [pathLength]);

  return (
    <div className={styles.homePageLockup}>
      <div className={styles.infoLockup}>
        
        <p>Search Option: <strong>{searchOption}</strong></p>
        <input 
          id="breathFirstSearch"
          type="radio"
          name="searchOption"
          checked={searchOption === SearchOptions.BREADTH_FIRST_SEARCH}
          value={SearchOptions.BREADTH_FIRST_SEARCH}
          onClick={handleInputChange}
          />
        <label htmlFor="breathFirstSearch">{SearchOptions.BREADTH_FIRST_SEARCH}</label>
        <input 
          id="shortestPath"
          type="radio"
          name="searchOption"
          checked={searchOption === SearchOptions.SHORTEST_PATH}
          value={SearchOptions.SHORTEST_PATH}
          onClick={handleInputChange} 
          />
        <label htmlFor="shortestPath">{SearchOptions.SHORTEST_PATH}</label>
        <p>Grid Size: <strong>{size}</strong></p>
        <p>Path Length: <strong>{pathLength}</strong></p>
        <div>
          <p>Tool Tip</p>
          <p><strong>Click</strong> to set a marker, this will be the destination endpoint for the initial one to search for</p>
          <p><strong>Control Click</strong> to create a 'blocking' block. Searches will not be able to navigate to a 'blocking' block</p>
        </div>
      </div>    
      <Grid size={size} searchOption={searchOption} getPathLength={getPathLength} />
    </div>
  );
}

export default HomePage;