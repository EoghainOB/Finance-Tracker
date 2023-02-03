import React, { useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import { AllContextType } from "../types";
import { AllContext } from "./context";
import Expensedetails from "./expensedetails";
import Input from "./input";

const Expensespage = () => {
  const { expenses } = useContext(AllContext) as AllContextType;

  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage] = useState<number>(10);

  const endOffset = itemOffset + itemsPerPage;
  const pageCount = Math.ceil(expenses.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % expenses.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <ul>
        <Input />
      </ul>
      <div className="category">
        <h2>Expenses</h2>
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
        {expenses.slice(itemOffset, endOffset).map((exp, index) => (
          <div key={index}>
            <Expensedetails exp={exp} />
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

export default Expensespage;
