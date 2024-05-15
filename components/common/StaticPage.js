"use client"
import { useState, useEffect } from 'react';
import { staticPageUrl } from '@/api/staticPage.api';

const StaticPage = ({endpoint}) => {
  const [pageContent, setPageContent] = useState("");

  useEffect(() => {
    fetchPageContent();
  }, []);

  const fetchPageContent = async () => {
    try {
      const response = await staticPageUrl(endpoint);

      console.log("API Response:", response);
      const htmlResponse = await fetch(response.data.data.filePath);
      const htmlContent = await htmlResponse.text();
      console.log("HTML content ::>", htmlResponse)
      setPageContent(htmlContent);
    } catch (error) {
      console.error("Error fetching page content:", error);
    }
  };

  return (
      <div
        dangerouslySetInnerHTML={{ __html: pageContent }}
      />
  );
};

export default StaticPage;
