"use client";

import { useEffect, useState } from "react";
import { getSalonLists } from "@/api/account.api";
import { GoLocation } from "react-icons/go";
import { ShopsCategory, Rating, Distance, Category } from "./data";
import Img from "@/assets/images/salonImage.svg";
import calendraImages from "@/assets/images/Group 1000003690.svg";
import Lists from "../lists/lists";
import Session from "@/service/session";

const SalonList = () => {
    const [lists, setLists] = useState([]);
    console.log("list", lists);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);
    const filteredSalon = Session.getObject('filteredSalon');
    //const filteredSalon = Session.getObject('filteredSalon')?.items || [];

    console.log("filtered hhh", filteredSalon);
    const loadMoreItems = async () => {
        if (isLoading || !isInitialDataLoaded || !hasMoreData) return;
        setIsLoading(true);
        try {
            const response = await getSalonLists(page, pageSize);
            const responseData = response?.data?.data?.items;
            if (responseData.length > 0) {
                // Filter out duplicates before appending to the existing list
                const filteredData = responseData.filter(item => !lists.some(existingItem => existingItem.id === item.id));
                setPage(page + 1);
                setLists(prevLists => [...prevLists, ...filteredData]);
            } else {
                console.log("No more data available.");
                setHasMoreData(false);
            }
        } catch (error) {
            console.error("Error fetching salon data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const loadInitialData = async () => {
            setIsLoading(true);
            try {
                const response = await getSalonLists(page, pageSize);
                setLists(response?.data?.data?.items);
                setIsInitialDataLoaded(true);
            } catch (error) {
                console.error("Error fetching salon data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        if (!isInitialDataLoaded) {
            loadInitialData();
        }
    }, [page, pageSize, isInitialDataLoaded]);

    useEffect(() => {
        if (filteredSalon) {
            // Update the lists state with data from filteredSalon
            setLists(filteredSalon.items || []);
        }
    }, [filteredSalon]);

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
