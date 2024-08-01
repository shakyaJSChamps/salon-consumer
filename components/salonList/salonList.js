"use client";
import { useEffect, useState, useMemo } from "react";
import { GoLocation } from "react-icons/go";
import { Distance } from "./data";
import Img from "@/assets/images/salonImage.svg";
import calendraImages from "@/assets/images/Group 1000003690.svg";
import Lists from "../lists/lists";
import Session from "@/service/session";
import { fetchSalonList } from "./salonListServer";

const SalonList = ({
  initialLists,
  page: initialPage,
  pageSize: initialPageSize,
}) => {
  const [lists, setLists] = useState([]);
  const [allSalon, setAllSalon] = useState([]);

  const [page, setPage] = useState(initialPage || 1);
  const [pageSize, setPageSize] = useState(initialPageSize || 10);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

  // Memoize filteredSalon to prevent unnecessary recalculations
  const filteredSalon = useMemo(() => Session.getObject("filteredSalon"), []);
  const salonService = useMemo(() => Session.getObject("salonService"), []);
  const selectedBannerSalons = useMemo(
    () => Session.getObject("selectedBannerSalons"),
    []
  );

  useEffect(() => {
    if (salonService) {
      setLists(salonService || []);
    } else if (filteredSalon) {
      setLists(filteredSalon.items || []);
    } else if (selectedBannerSalons) {
      setLists(selectedBannerSalons.items || []);
    } else {
      setLists(allSalon);
    }
  }, [filteredSalon, salonService, allSalon, selectedBannerSalons]);

  const fetchSalonLists = async () => {
    if (isLoading || !hasMoreData) return;
    setIsLoading(true);
    try {
      if (initialLists.length > 0) {
        const filteredData = initialLists.filter(
          (item) => !lists.some((existingItem) => existingItem.id === item.id)
        );

        const updatedLists = [...lists, ...filteredData];
        setAllSalon(updatedLists);

        Session.setObject("salonList", { items: updatedLists });
      } else {
        setHasMoreData(false);
      }
    } catch (error) {
      Notify.error(error.message);
      setIsLoading(true);
    }
  };
  useEffect(() => {
    fetchSalonLists();
  }, [page, pageSize]);

  const loadMoreItems = () => {
    if (!isLoading && hasMoreData) {
      setPageSize(pageSize+10);
      setPage(page + 1);
    }

  };

  return (
    <Lists
      title="Salon"
      buttonLabel="View Details"
      imageSrc={Img}
      lists={lists}
      Distance={Distance}
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
      hasMoreData={hasMoreData}
    />
  );
};

export default SalonList;
