import useInputFilter from "../../hooks/useInputFilter";
import { excludeItems } from "../../utils";

const useResumeHtmlInputFilter = (data = []) => {
  return useInputFilter(data, excludeItems(Object.keys(data[0]), ["dates", "date"]));
};

export default useResumeHtmlInputFilter;
