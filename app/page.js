import styles from "./page.module.css";
import HomePage from "@/pages/HomePage/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <HomePage />
      {/* <Footer /> */}
      <ToastContainer />
    </>
  );
}

// "use client";
// import React, { useState, useEffect } from 'react';
// import dynamic from 'next/dynamic';
// import styles from "./page.module.css";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Circles } from 'react-loader-spinner';  // Import the loader

// const HomePage = dynamic(() => import('@/pages/HomePage/HomePage'), { ssr: false });

// export default function Home() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1000); // Simulate loading delay

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <>
//       {loading ? (
//         <div className={styles.loaderContainer}>
//           <Circles
//             height="100"
//             width="100"
//             color="black"
//             ariaLabel="circles-loading"
//             wrapperStyle={{}}
//             wrapperClass=""
//             visible={true}
//           />
//         </div>
//       ) : (
//         <HomePage />
//       )}
//       <ToastContainer />
//     </>
//   );
// }
