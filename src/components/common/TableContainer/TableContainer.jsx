import * as React from "react";

import style from "./tableContainer.module.scss";

const TableContainer = ({ title, children }) => {
  return (
    <div className={style.tableContainer}>
      <div className={style.tableTitle}>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
};

export default TableContainer;