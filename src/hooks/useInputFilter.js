import { useState, useCallback } from "react";

const useInputFilter = (data = [], keys = Object.keys(data[0] || {})) => {
  const [filter, setFilter] = useState();

  return [
    data.filter((item) => keys.some((key) => new RegExp(filter, "ig").test(item[key]))),
    useCallback(({ target: { value } }) => {
      setFilter(value);
    }, []),
  ];
};
// .filter((item) => Object.values(item).some((value) => new RegExp(filter, "ig").test(value)))
export default useInputFilter;
