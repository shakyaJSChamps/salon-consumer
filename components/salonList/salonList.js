"use client";

import { useEffect, useState } from "react";
import { getSalonLists } from "@/api/account.api";
import { GoLocation } from "react-icons/go";
import { ShopsCategory, Rating, Distance, Category } from "./data";
import Img from "@/assets/images/salonImage.svg";
import calendraImages from "@/assets/images/Group 1000003690.svg";
import Lists from "../lists/lists";

const SalonList = () => {
    const [lists, setLists] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);

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

    // const handleScroll = () => {
    //     const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    //     if (scrollTop + clientHeight >= scrollHeight) {
    //         loadMoreItems();
    //     }
    // };

    const loadMoreItems = async () => {
        if (isLoading || !isInitialDataLoaded || lists.length % pageSize !== 0) return;
        setIsLoading(true);
        try {
            const response = await getSalonLists(page + 1, pageSize);
            const responseData = response?.data?.data?.items;
            if (responseData.length > 0) {
                setPage(page + 1);
                const filteredData = responseData.filter(item => !lists.some(existingItem => existingItem.id === item.id));
                setLists(prevLists => [...prevLists, ...filteredData]);
            } else {
                console.log("No more data available.");
            }
        } catch (error) {
            console.error("Error fetching salon data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // <div onScroll={handleScroll}>
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
        />

    );
};

export default SalonList;
