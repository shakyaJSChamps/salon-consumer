"use client";
import { useEffect, useState, useMemo } from "react";
import { GoLocation } from "react-icons/go";
import { Distance } from "./data";
import Img from "@/assets/images/salonImage.svg";
import calendraImages from "@/assets/images/Group 1000003690.svg";
import Lists from "../lists/lists";
import Session from "@/service/session";

const SalonList = ({ initialLists }) => {
  const [lists, setLists] = useState(initialLists.slice(0, 10));
  const [allSalon, setAllSalon] = useState(initialLists);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(initialLists.length > 10);
  const filteredSalon = useMemo(() => Session.getObject("filteredSalon"), []);
  const salonService = useMemo(() => Session.getObject("salonService"), []);
  const selectedBannerSalons = useMemo(
    () => Session.getObject("selectedBannerSalons"),
    []
  );

  useEffect(() => {
    if (salonService) {
      setLists(salonService.slice(0, 10));
    } else if (filteredSalon) {
      setLists(filteredSalon.items.slice(0, 10));
    } else if (selectedBannerSalons) {
      setLists(selectedBannerSalons.items.slice(0, 10));
    } else {
      setLists(allSalon.slice(0, 10));
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
  }, []);

  const loadMoreItems = () => {
    const newItems = allSalon.slice(lists.length, lists.length + 5);
    if (newItems.length > 0) {
      setLists((prevLists) => {
        const updatedLists = [...prevLists, ...newItems];
        return updatedLists;
      });
      setHasMoreData(newItems.length === 5);
    } else {
      setHasMoreData(false);
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
      isLoading={isLoading}
      loadMoreItems={loadMoreItems}
      hasMoreData={hasMoreData}
    />
  );
};

export default SalonList;
