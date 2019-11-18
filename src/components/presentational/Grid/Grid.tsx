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
    if (adjacentVals.top[1] >= 0) {
      // TODO: Need to push, something that reflects its a wall
      if (adjacentVals.top[0] === 5 && adjacentVals.top[1] !== 3) {
        // console.log('Trying to go up ' + x + ' y is ' + y);
      } else {
        arr.push(adjacentVals.top);
      }
    }
    if (adjacentVals.right[0] <= size - 1) {
      if (adjacentVals.right[0] === 5 && adjacentVals.right[1] !== 3) {
        // console.log('trying to go right ' + x + ' y is ' + y);
      } else {
        arr.push(adjacentVals.right);
      }
    }
    if (adjacentVals.bottom[1] <= size - 1) {
      if (adjacentVals.bottom[0] === 5 && adjacentVals.bottom[1] !== 3) {
        // console.log('trying to go down ' + x + ' y is ' + y);
      } else {
        arr.push(adjacentVals.bottom);
      }
    }
    if (adjacentVals.left[0] >= 0) {
      if (adjacentVals.left[0] === 5 && adjacentVals.left[1] !== 3) {
        // console.log('trying to go left ' + x + ' and y is ' + y);
      } else {
        arr.push(adjacentVals.left);
      }
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
        console.log('selected:', selectedPosition, ' was found at position', u);
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
      console.log('gridpath was selected', arr, gridPath[arr], gridPath);
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
      console.log('result is ', result);
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
    setSelectedPosition(position);
  };
  
  // console.log('testArr', isBlocked(testArr));

  return (
    <div className={styles.grid}>
      { grid }
    </div>
  );
}

export default Grid;