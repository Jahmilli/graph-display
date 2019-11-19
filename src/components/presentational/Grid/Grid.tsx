import React from "react";
import styles from "./Grid.module.css";
import { SearchOptions } from "../../pages/HomePage/HomePage";

type GridProps = {
  size: number;
  searchOption: string;
}

interface IVisited {
  [key: string]: boolean;
}

const Grid: React.FunctionComponent<GridProps> = ({ size, searchOption }) => {
  const [selectedPosition, setSelectedPosition] = React.useState<number[]>([]);
  const [selectedDestination, setSelectedDestination] = React.useState<number[]>([]);
  const [grid, setGrid] = React.useState([]);
  const [blocked, setBlocked] = React.useState<any>({});

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
    return arr;
  }

  const breadthFirstTraversal = (vertex: number[]) => {
    const path: any = [];
    const visited: IVisited = {} // needs to be size of vertices and initialised to false
    const unprocessed: number[][] = []; // Queue that contains unprocesseed vertices which needs to be checked
  
    unprocessed.push(vertex);
    while (unprocessed.length !== 0) {
      let u: any = unprocessed.shift();
      if (u[0] === selectedPosition[0] && u[1] === selectedPosition[1]) {
        break;
      }
      if (!visited[u]) {
        path.push(u);
        visited[u] = true;
        unprocessed.push(...getAdjacent(u));
      }
    }
    return path;
  }

  const shortestDistance = (vertex: number[]) => {
    const path: any = [];
    const visited: any = {} // needs to be size of vertices and initialised to false
    const unprocessed: any[] = []; // Queue that contains unprocesseed vertices which needs to be checked
  
    unprocessed.push({
      key: vertex,
      path: [vertex]
    });
    while (unprocessed.length !== 0) {
      let u: any = unprocessed.shift();
      if (u.key[0] === selectedPosition[0] && u.key[1] === selectedPosition[1]) {
        // So not expecting this to work correctly, it will find first
        // Question is, is first always shortest?? (may be)
        console.log('found, u is ', u);
        return u.path;
      }
      if (!visited[u.key]) {
        visited[u.key] = true;
        for (let vertex of getAdjacent(u.key)) {
          unprocessed.push({
            key: vertex,
            path: [...u.path, vertex]
          });
        }
      }
    }
    return path;
  }
  
  let isBlocked = (arr: any) => {
    return blocked[arr];
  }

  // Returns the class based on what position we're viewing
  let getClass = (arr: any, result: any = []) => {
    if (isBlocked(arr)) {
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
    let result: any = {};
    if (selectedPosition.length > 0) {
      switch(searchOption) {
        case SearchOptions.BREADTH_FIRST_SEARCH: result = breadthFirstTraversal([0, 0]);
          break;
        case SearchOptions.SHORTEST_PATH: result = shortestDistance([0, 0]);
          break;
        default: result = breadthFirstTraversal([0, 0])
      }
      
      let newResult: any = {}
      for(let i of result) {
        newResult[i] = true
      }
      result = newResult;
      // setGridPath(result);
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
              onClick={handleSetSelectedPosition([i,j])} 
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


  const handleSetSelectedPosition = (position: any) => (event: any) => {
    event.stopPropagation();
    if (event.metaKey) {
      setBlocked({
        ...blocked,
        [position]: !blocked[position]
      });
      return;
    }
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