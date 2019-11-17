import React from "react";
import styles from "./Grid.module.css";

type GridProps = {
  height: number;
  width: number;
}

const Grid: React.FunctionComponent<GridProps> = ({ height, width }) => {
  const [selectedPosition, setSelectedPosition] = React.useState<number[]>([]);
  const [selectedDestination, setSelectedDestination] = React.useState<number[]>([]);
  const [grid, setGrid] = React.useState([]);

  
  React.useEffect(() => {
    const columnStyle = styles.column;
    const columnSelectedStyle = styles.columnSelected;

    const createMatrix = () => {
      let tmpGrid: any = [];
      for (let i = 0; i < height; i++) {
        tmpGrid.push([]);
        const row = [];
        for (let j = 0; j < width; j++) {
          row.push(
            <div
              key={`${i}-${j}`}
              onClick={() => handleSetSelectedPosition([i,j])} 
              className={i === selectedPosition[0] && j === selectedPosition[1] ? columnSelectedStyle : columnStyle}
              style={{ height: `${100/height}vh`, width: `${100/width}vh`, margin: '0.1em'}}>
            </div>
          );
        }
      tmpGrid[i].push(<div className={styles.row}>{row}</div>)
      }
      return tmpGrid;
    }

    let matrix = createMatrix();
    setGrid(matrix);
  }, [height, width, selectedPosition]);

  const handleSetSelectedPosition = (position: number[]) => {
    setSelectedPosition(position);
  };

  return (
    <div className={styles.grid}>
      {/* <h1>{selectedPosition}</h1> */}
      {/* <h1>Hello World</h1> */}
      { grid }
    </div>
  );
}

export default Grid;