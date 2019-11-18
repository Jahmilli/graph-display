import React from "react";
import styles from "./Grid.module.css";

type GridProps = {
  size: number;
}

interface IVisited {
  [key: string]: boolean;
}

const Grid: React.FunctionComponent<GridProps> = ({ size }) => {
  const [selectedPosition, setSelectedPosition] = React.useState<number[]>([]);
  const [selectedDestination, setSelectedDestination] = React.useState<number[]>([]);
  const [gridPath, setGridPath] = React.useState<any>({});
  const [grid, setGrid] = React.useState([]);
  const [blocked, setBlocked] = React.useState<any>({
    "5,0": true,
    "5,1": true,
    "5,2": true,
    "5,3": true,
    "5,4": true,
    "5,5": true,
    "5,7": true,
    "5,8": true,
    "5,9": true,
  });

  console.log('blocked is ', blocked);
  let testArr = [5,9];
  
  
  // Styles
  const columnStyle = styles.column;
  const columnBlockedStyle = styles.columnBlocked;
  const columnPathStyle = styles.columnPath;
  const columnSelectedStyle = styles.columnSelected;

  const getAdjacent = (vertex: number[]) => {
    const x = vertex[0], y = vertex[1];
    const adjacentVals = {
      top: [x, y-1],
      right: [x+1, y],
      bottom: [x, y+1],
      left: [x-1, y]
    };
    const arr = [];
    if (!isBlocked(adjacentVals.top) && adjacentVals.top[1] >= 0) {
      arr.push(adjacentVals.top);
    }
    if (!isBlocked(adjacentVals.right) && adjacentVals.right[0] <= size - 1) {
      arr.push(adjacentVals.right);
    }
    if (!isBlocked(adjacentVals.bottom) && adjacentVals.bottom[1] <= size - 1) {
      arr.push(adjacentVals.bottom);
    }
    if (!isBlocked(adjacentVals.left) && adjacentVals.left[0] >= 0) {
        arr.push(adjacentVals.left);
    }
    // console.log('arr is ', arr);
    return arr;
  }

  const breadthFirstTraversal = (vertex: number[]) => {
    const path = []; // Contains the path of vertices the depth_first search.
    const pathMap: any = {};
    const visited: IVisited = {} // needs to be size of vertices and initialised to false
    const unprocessed: number[][] = []; // Queue that contains unprocesseed vertices which needs to be checked
  
    unprocessed.push(vertex);
    while (unprocessed.length !== 0) {
      let u: any = unprocessed.shift();
      if (u[0] === selectedPosition[0] && u[1] === selectedPosition[1]) {
        break;
      }
      // console.log('u is ', u, 'selected is ', selectedPosition);
      if (!visited[u]) {
        path.push(u);
        pathMap[u] = true;
        visited[u] = true;
        unprocessed.push(...getAdjacent(u));
      }
    }
    // return path;
    return pathMap;
  }
  
  let isBlocked = (arr: any) => {
    return blocked[arr];
  }

  // Returns the class based on what position we're viewing
  let getClass = (arr: any, result: any = []) => {
    if (isBlocked(arr)) {
      console.log('is blocked', arr);
      return columnBlockedStyle;
    } else if (arr[0] === selectedPosition[0] && arr[1] === selectedPosition[1]) {
      return columnSelectedStyle;
    } else if (result[arr]) {
      return columnPathStyle;
    } else {
      return columnStyle;
    }
  }

  React.useEffect(() => {
    let result = {};
    if (selectedPosition.length > 0) {
      result = breadthFirstTraversal([0,0]);
      setGridPath(result);
    }
    const createMatrix = () => {
      let tmpGrid: any = [];
      for (let i = 0; i < size; i++) {
        tmpGrid.push([]);
        const row = [];
        for (let j = 0; j < size; j++) {          
          row.push(
            <div
              key={`${i}-${j}`}
              onClick={() => handleSetSelectedPosition([i,j])} 
              className={getClass([i, j], result)}
              style={{ height: `${100/size}vh`, width: `${100/size}vh`, margin: '0.1em'}}>
            </div>
          );
        }
        tmpGrid[i].push(<div className={styles.row}>{row}</div>);
      }
      return tmpGrid;
    }

    let matrix = createMatrix();
    setGrid(matrix);
  }, [size, selectedPosition, blocked]);


  const handleSetSelectedPosition = (position: number[]) => {
    if (!isBlocked(position)) {
      setSelectedPosition(position);
    }
  };

  return (
    <div className={styles.grid}>
      { grid }
    </div>
  );
}

export default Grid;