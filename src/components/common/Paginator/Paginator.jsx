import React, {useState} from 'react';
import classes from './Paginator.module.css';

const Paginator = (props) => {

    let pagesCount = Math.ceil(props.usersAmount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / props.portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
    let rightPortionPageNumber = portionNumber * props.portionSize;

    console.log(props);

    return (
            <div className={classes.paginator}>
                {portionNumber > 1 && <button onClick={() => {setPortionNumber(portionNumber - 1)}}>PREV</button>}
                {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map((page) => {
                    return <span onClick={(e) => props.onSetCurrentPage(page)}
                                 className={props.currentPage === page && classes.selected}>{page}</span>
                })}
                {portionCount > portionNumber && <button onClick={() => {setPortionNumber(portionNumber + 1)}}>NEXT</button>}
            </div>
    );
}

export default Paginator;
