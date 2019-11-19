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

  const handleInputChange = (event: React.ChangeEvent<any>) => {
    setSearchOption(event.target.value);
  }
  const handleSetSize = (event: React.ChangeEvent<any>) => {
    if (event.target.value >= 0 && event.target.value <= 40) {
      setSize(event.target.value);
    }
  }

  React.useEffect(() => {

  }, [pathLength]);

  return (
    <div className={styles.homePageLockup}>
      <div className={styles.infoLockup}>
        <p>Search Option: <strong>{searchOption}</strong></p>
        <div className={styles.searchOptions}>
          <input 
            id="breathFirstSearch"
            type="radio"
            name="searchOption"
            checked={searchOption === SearchOptions.BREADTH_FIRST_SEARCH}
            value={SearchOptions.BREADTH_FIRST_SEARCH}
            onClick={handleInputChange}
            />
          <label htmlFor="breathFirstSearch">{SearchOptions.BREADTH_FIRST_SEARCH}</label>
        </div>
        <div className={styles.searchOptions}>
          <input 
            id="shortestPath"
            type="radio"
            name="searchOption"
            checked={searchOption === SearchOptions.SHORTEST_PATH}
            value={SearchOptions.SHORTEST_PATH}
            onClick={handleInputChange} 
            />
          <label htmlFor="shortestPath">{SearchOptions.SHORTEST_PATH}</label>
        </div>

        <div className={styles.gridSize}>
          <label htmlFor="gridSize">Grid Size</label>
          <input 
            id="gridSize"
            type="number"
            name="gridSize"
            value={size}
            onChange={handleSetSize} 
            />
            <p>
              Min: 0
              <br />
              Max: 40
            </p>
        </div>

        {/* <p>Grid Size: <strong>{size}</strong></p> */}

        <p>Path Length: <strong>{pathLength}</strong></p>
        <div>
          <p><strong>Click</strong> to set a marker, this will be either be the starting position or destination position to search for</p>
          <p><strong>Hold 'Control/Command'</strong> whilst moving your mouse to create a 'blocking' block. Searches will not be able to navigate to a 'blocking' block</p>
        </div>
      </div>    
      <Grid size={size} searchOption={searchOption} getPathLength={getPathLength} />
    </div>
  );
}

export default HomePage;