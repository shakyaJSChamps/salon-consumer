"use client";

import { useEffect, useState } from "react";
import { getSalonLists } from "@/api/account.api";
import { GoLocation } from "react-icons/go";
import { ShopsCategory, Rating, Distance, Category } from "./data"; // Adjust the path as needed
import Img from "@/assets/images/salonImage.svg";
import calendraImages from "@/assets/images/Group 1000003690.svg";
import Lists from "../lists/lists";
import Session from "@/service/session";

const SalonList = ({ initialData }) => {
  const [lists, setLists] = useState(initialData || []);
  console.log("listed", lists);
  const [page, setPage] = useState(2); // Starting from 2 because initial data is already loaded
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const filteredSalon = Session.getObject('filteredSalon');

  useEffect(() => {
      if (filteredSalon) {
          setLists(filteredSalon.items || []);
      }
  }, [filteredSalon]);

  const loadMoreItems = async () => {
      if (isLoading || !hasMoreData) return;
      setIsLoading(true);
      try {
          const response = await getSalonLists(page, pageSize);
          const responseData = response?.data?.data?.items || [];
          if (responseData.length > 0) {
              const filteredData = responseData.filter(item => !lists.some(existingItem => existingItem.id === item.id));
              setPage(page + 1);
              setLists(prevLists => [...prevLists, ...filteredData]);
          } else {
              setHasMoreData(false);
          }
      } catch (error) {
          console.error("Error fetching salon data:", error);
      } finally {
          setIsLoading(false);
      }
  };

  return (
    <Lists
      title="Salon"
      buttonLabel="View Details"
      imageSrc={Img}
      lists={lists}
      ShopsCategory={ShopsCategory}
      Rating={Rating}
      Distance={Distance}
      Category={Category}
      GoLocation={GoLocation}
      calendraImages={calendraImages}
      detailsLinkBase="/salonlist"
      setLists={setLists}
      page={page}
      setPage={setPage}
      pageSize={pageSize}
      setPageSize={setPageSize}
      isLoading={isLoading}
       loadMoreItems={loadMoreItems}
       lazyLoadingThreshold={0.5}
      hasMoreData={hasMoreData}
    />
  );
};

export default SalonList;
