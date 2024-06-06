// // pages/salon-list.js

// import { getSalonLists } from "@/api/account.api";
// import SalonList from "./serverSide";

// export async function getServerSideProps(context) {
//     console.log("getServerSideProps is called");
//     const page = 1;
//     const pageSize = 10;

//     try {
//         const response = await getSalonLists(page, pageSize);
//         console.log("API response:", response); // Log the API response
//         const initialData = response?.data?.data?.items || [];
//         console.log("initialData:", initialData); // Log the initialData
//         return {
//             props: {
//                 initialData,
//             },
//         };
//     } catch (error) {
//         console.error("Error fetching salon data:", error);
//         return {
//             props: {
//                 initialData: [],
//             },
//         };
//     }
// }

// const SalonListPage = ({ initialData }) => {
//     console.log("initial data", initialData);
//     return <SalonList initialData={initialData} />;
// };

// export default SalonListPage;








// pages/salon-list.js

import SalonList from "./serverSide";
import { getSalonLists } from "@/api/account.api";

export async function getServerSideProps(context) {
    console.log("getServerSideProps is called");
    const page = 2;
    const pageSize = 10;

    try {
        const response = await getSalonLists(page, pageSize);
        console.log("API response:", response); 
        const initialData = response?.data?.data?.items || [];
        console.log("initialData:", initialData); // Log the initialData
        return {
            props: {
                initialData,
            },
        };
    } catch (error) {
        console.error("Error fetching salon data:", error);
        return {
            props: {
                initialData: [],
                error: "Error fetching salon data. Please try again later.",
            },
        };
    }
}

const SalonListPage = ({ initialData, error }) => {
    console.log("initial data", initialData);
    if (error) {
        return <div>{error}</div>;
    }

    return <SalonList initialData={initialData} />;
};

export default SalonListPage;
