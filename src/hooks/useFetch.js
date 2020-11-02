import { useEffect, useState } from "react";

const useResource = (resouce) => {
  const [state, setState] = useState({ loading: true });

  useEffect(() => {
    fetch(resouce)
      .then((res) => res.text())
      .then(
        (data) => {
          setState({ data, loading: false });
        },
        (error) => {
          setState({ error, loading: true });
        }
      );
  }, [resouce]);

  return state;
};

export default useResource;
