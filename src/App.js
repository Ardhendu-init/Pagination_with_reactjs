import "./styles.css";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
const url = "https://dummyjson.com/products";

export default function App() {
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}?limit=${pageIndex * 10}`);

      const fetcheddata = await res.data.products;
      setTotalData(res.data.total);
      setData(fetcheddata);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [pageIndex]);

  useEffect(() => {
    fetchProducts();
  }, [pageIndex]);

  return (
    <div className="main__container">
      {loading ? (
        <h3>loading...</h3>
      ) : (
        <div className="product__container">
          {data.length > 0 &&
            data.slice((pageIndex - 1) * 10, pageIndex * 10).map((item) => {
              return (
                <div key={item.id} className="single__product">
                  <img src={item.thumbnail} alt={item.title} />
                </div>
              );
            })}
        </div>
      )}

      {/* Pagination */}
      <div className="pagination">
        <span
          onClick={() => setPageIndex(pageIndex - 1)}
          className={pageIndex > 1 ? "" : "pagination__disable"}
        >
          ◀
        </span>
        {[...Array(totalData / 10)].map((_, index) => {
          return (
            <span
              key={index}
              onClick={() => setPageIndex(index + 1)}
              className={pageIndex === index + 1 ? "pagination__selected" : ""}
            >
              {index + 1}
            </span>
          );
        })}
        <span
          onClick={() => setPageIndex(pageIndex + 1)}
          className={pageIndex === totalData / 10 ? "pagination__disable" : ""}
        >
          ▶
        </span>
      </div>
    </div>
  );
}
