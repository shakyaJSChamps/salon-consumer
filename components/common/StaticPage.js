"use client";
import { useState, useEffect } from "react";
import { staticPageUrl } from "@/api/staticPage.api";
import Notify from "@/utils/notify";
const StaticPage = ({ endpoint, className }) => {
  const [pageContent, setPageContent] = useState("");

  useEffect(() => {
    fetchPageContent();
  }, []);

  const fetchPageContent = async () => {
    try {
      const response = await staticPageUrl(endpoint);
      const htmlResponse = await fetch(response.data.data.filePath);
      const htmlContent = await htmlResponse.text();
      setPageContent(htmlContent);
    } catch (error) {
      Notify.error(error.message);
    }
  };

  return (
<div
  className={`${className} additional-class`}
  dangerouslySetInnerHTML={{ __html: pageContent }}
/>

  );
};

export default StaticPage;
