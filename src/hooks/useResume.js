/** @typedef {import("@rubeniskov/resume-parser").ResumeOutputFormat} ResumeOutputFormat*/
import { useEffect, useState } from "react";
import path from "path";
import resumeParser from "@rubeniskov/resume-parser";
import useFetch from "../hooks/useFetch";

/**
 * Resolve and parse resume resource
 * @param {string} resumePath resume static resource path from public directory, ei: /<filename>.(yml,json)
 * @param {ResumeOutputFormat} format desired output format
 */
export const useResume = (resumePath, format = "md") => {
  const inputFormat = path.extname(resumePath).replace(/^\.*/, "");
  const { data: resourceData, error: resourceError, loading: resourceLoading } = useFetch(
    resumePath
  );
  const [
    { data: resumeData, error: resumeError, loading: resumeLoading },
    setResumeData,
  ] = useState({ loading: true });

  useEffect(() => {
    if (resourceData) {
      resumeParser(resourceData, inputFormat, format, (error, data) => {
        if (error) {
          return setResumeData({ error, loading: false });
        }
        const parsedData = data.toString("utf8");
        setResumeData({ data: parsedData, loading: false });
      });
    }
  }, [resourceData, inputFormat, format]);

  return {
    loading: resourceLoading || resumeLoading,
    data: resumeData,
    error: resourceError || resumeError,
  };
};

export default useResume;
