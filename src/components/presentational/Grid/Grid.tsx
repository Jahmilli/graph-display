import React from "react";
import styles from "./Grid.module.css";
import { SearchOptions } from "../../pages/HomePage/HomePage";

type GridProps = {
  size: number;
  searchOption: string;
  getPathLength: Function;
}

interface IVisited {
  [key: string]: boolean;
}

interface UnprocessedVertex {
  key: number[];
  path: number[][];
}

interface Blocked {
  [key: string]: number[];
}

const Grid: React.FunctionComponent<GridProps> = ({ size, searchOption, getPathLength }) => {
  const [selectedStart, setSelectedStart] = React.useState<number[]>([0, 0]);
  const [selectedDestination, setSelectedDestination] = React.useState<number[]>([0, 0]);
  const [isCurrentPosition, setIsCurrentPosition] = React.useState(false);
  const [grid, setGrid] = React.useState([]);
  const [blocked, setBlocked] = React.useState<Blocked>({});

  // Styles
  const columnStyle = styles.column;
  const columnBlockedStyle = styles.columnBlocked;
  const columnPathStyle = styles.columnPath;
  const startStyle = styles.start;
  const destinationStyle = styles.destination;

  const getAdjacent = (vertex: number[]) => {
    const x = vertex[0], y = vertex[1];
    const adjacentVals = {
      top: [x, y - 1],
      right: [x + 1, y],
      bottom: [x, y + 1],
      left: [x - 1, y]
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
    const path: number[][] = [];
    const visited: IVisited = {} // needs to be size of vertices and initialised to false
    const unprocessed: number[][] = []; // Queue that contains unprocesseed vertices which needs to be checked
  
    unprocessed.push(vertex);
    while (unprocessed.length !== 0) {
      let u: number[] = unprocessed.shift() || [];
      if (u[0] === selectedDestination[0] && u[1] === selectedDestination[1]) {
        break;
      }
      if (!visited[u.toString()]) {
        path.push(u);
        visited[u.toString()] = true;
        unprocessed.push(...getAdjacent(u));
      }
    }
    return path;
  }

  const shortestDistance = (vertex: number[]) => {
    const path: number[] = [];
    const visited: any = {} // needs to be size of vertices and initialised to false
    const unprocessed: UnprocessedVertex[] = []; // Queue that contains unprocesseed vertices which needs to be checked
  
    unprocessed.push({
      key: vertex,
      path: [vertex]
    });

    while (unprocessed.length !== 0) {
      // @ts-ignore
      let u: UnprocessedVertex = unprocessed.shift();
      if (u.key[0] === selectedDestination[0] && u.key[1] === selectedDestination[1]) {
        return u.path;
      }
      if (!visited[u.key.toString()]) {
        visited[u.key.toString()] = true;
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
  let getClass = (arr: number[], result: any = []) => {
    if (isBlocked(arr)) {
      return columnBlockedStyle;
    } else if (arr[0] === selectedStart[0] && arr[1] === selectedStart[1]) {
      return startStyle;
    } else if (arr[0] === selectedDestination[0] && arr[1] === selectedDestination[1]) {
      return destinationStyle;
    } else if (result[arr.toString()]) {
      return columnPathStyle;
    } else {
      return columnStyle;
    }
  }

  React.useEffect(() => {
    let result: any = {};
    if (selectedStart.length > 0) {
      let tmpPath: any[] = [];
      switch(searchOption) {
        case SearchOptions.BREADTH_FIRST_SEARCH: tmpPath = breadthFirstTraversal(selectedStart);
          break;
        case SearchOptions.SHORTEST_PATH: tmpPath = shortestDistance(selectedStart);
          break;
        default: tmpPath = breadthFirstTraversal(selectedStart)
      }

      for(let i of tmpPath) {
        result[i] = true
      }
      
      getPathLength(Object.keys(result).length);
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
              onMouseOver={handleMouseOver([i,j])}
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
  }, [size, selectedStart, selectedDestination, blocked]);

  const handleMouseOver = (position: any) => (event: any) => {
    if (event.metaKey) {
      setBlocked({
        ...blocked,
        [position]: !blocked[position]
      });
      return;
    }
  }
  
  const handleSetSelectedPosition = (position: number[]) => (event: React.MouseEvent) => {
    if (!isBlocked(position)) {
      if (isCurrentPosition) {
        setSelectedStart(position);
        setIsCurrentPosition(false);
      } else {
        setSelectedDestination(position);
        setIsCurrentPosition(true);
      }
    }
  };

  return (
    <div className={styles.grid}>
      { grid }
    </div>
  );
}

export default Grid;