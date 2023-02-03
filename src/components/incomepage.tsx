import React, { useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import { AllContextType } from "../types";
import { AllContext } from "./context";
import Incomedetails from "./incomedetails";
import Input from "./input";

const Incomepage = () => {
  const { income } = useContext(AllContext) as AllContextType;

  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage] = useState<number>(10);

  const endOffset = itemOffset + itemsPerPage;
  const pageCount = Math.ceil(income.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % income.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <Input />
      <div className="category">
        <h2>Income</h2>
      </div>
      <ul>
        <li className="listdetails">
          <div className="detailsDate">
            <h4>Date</h4>
          </div>
          <div className="detailsCategory">
            <h4>Category</h4>
          </div>
          <div className="detailsDescription">
            <h4>Description</h4>
          </div>
          <div className="detailsAmount">
            <h4>Amount</h4>
          </div>
          <div className="detailsButton">
            <h4>Edit</h4>
          </div>
        </li>
        {income.slice(itemOffset, endOffset).map((inc, index) => (
          <div key={index}>
            <Incomedetails inc={inc} />
          </div>
        ))}
        {pageCount > 1 && (
          <div className="paging">
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              pageCount={Math.ceil(pageCount)}
              previousLabel="< Previous"
            />
          </div>
        )}
      </ul>
    </div>
  );
};

export default Incomepage;
