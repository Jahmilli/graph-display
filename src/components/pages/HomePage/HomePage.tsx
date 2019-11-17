import React from "react";
import Grid from "../../presentational/Grid/Grid";
import styles from "./HomePage.module.css";


const HomePage: React.FunctionComponent = () => {
  return (
    <div className={styles.homePageLockup}>
      <Grid height={20} width={20}/>
    </div>
  );
}

export default HomePage;