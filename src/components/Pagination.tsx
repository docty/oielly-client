import { useState } from "react";

const Pagination = (props: IPagination) => {
    const [state, setState] = useState<{ currentPage: number }>({ currentPage: 1 });
    const LEFT_PAGE = 'LEFT';
    const RIGHT_PAGE = 'RIGHT';

    let { totalRecords, pageLimit, pageNeighbours } = props;
    pageNeighbours = Math.max(0, Math.min(pageNeighbours, 2));

    let totalPages = Math.ceil(totalRecords / pageLimit);


    console.log(state)
    return null;
}


const range = (from:number, to:number, step = 1) => {
    let i = from;
    const range = [];
  
    while (i <= to) {
      range.push(i);
      i += step;
    }
  
    return range;
  }


export interface IPagination {
    totalRecords: number;
    pageLimit: number;
    pageNeighbours: number;
}

Pagination.defaultProps = {
    totalRecords: 0,
    pageLimit: 30,
    pageNeighbours: 0
}

export default Pagination;