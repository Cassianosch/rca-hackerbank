import React, { useState, useCallback, useMemo } from "react";

function TransactionTable({ txns }) {

  const [data, setData] = useState(txns);
  const [sortByKey, setSortByKey] = useState(data[0]);
  const [sortByOrd, setSortByOrd] = useState(false);
  const [inputValue, setInputValue] = useState('2019-11-29');

  const itemsToShow = useMemo(
    () =>
      data.sort((a, b) => {
        if (sortByOrd)
          return a[sortByKey] > b[sortByKey] ? 1 : -1;
        return a[sortByKey] > b[sortByKey] ? -1 : 1;
      }),
    [data, sortByKey, sortByOrd],
  );

  const sort = useCallback(
    (key) => {
      if (key === sortByKey) {
        setSortByOrd((prev) => !prev);
      }
      else {
        setSortByKey(key);
        setSortByOrd('asc');
      }
    },
    [sortByKey],
  );

  const handleFilterByDate = useCallback(
    (type) => {
      if (!!inputValue) {
        if (type === 'filter') {
          let filteredElements = txns.filter(el => el.date === inputValue);
          setData(filteredElements);
        } else {
          setData(txns);
        }
      }
    },
    [inputValue, txns],
  );
  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <label className="mr-10">Transaction Date</label>
        <input id="date" type="date" defaultValue={inputValue} onChange={e => setInputValue(e.target.value)} />
        <button className="small" id="filter" onClick={() => handleFilterByDate('filter')}>Filter</button>
        <button className="small" onClick={() => handleFilterByDate('reset')}>Reset</button>
      </section>

      <div className="card mt-50">
        <table className="table">
          <thead>
            <tr className="table">
              <th className="table-header" id="date" onClick={() => sort('date')}>
                Date
              </th>
              <th className="table-header">Description</th>
              <th className="table-header">Type</th>
              <th className="table-header">
                <span id="amount" onClick={() => sort('amount')}>Amount ($)</span>
              </th>
              <th className="table-header">Available Balance</th>
            </tr>
          </thead>
          <tbody>
            {
              itemsToShow.map((el, i) => (
                <tr key={i} >
                  <td>{el.date}</td>
                  <td>{el.description}</td>
                  <td>{el.type === 1 ? "Debit" : "Credit"}</td>
                  <td>{el.amount}</td>
                  <td>{el.balance}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionTable;