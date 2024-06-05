// import { useEffect, useState, useCallback, useRef } from "react";
// import ReactDOM from "react-dom";
// import { IoSearchSharp } from "react-icons/io5";
// import styles from "./searchInput.module.css";
// import { searchService, searchText } from "../../api/account.api";
// import Session from "@/service/session";

// function SearchInput() {
//   const [services, setServices] = useState([]);
//   const [text, setText] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [filteredServices, setFilteredServices] = useState([]);
//   const [inputRect, setInputRect] = useState(null);
//   const debounceTimeout = useRef(null);
//   const city = Session.get("city");
//   //const city = location.split(',')[0].trim();
//   console.log("Loc", city);
//   useEffect(() => {
//     if (!city) return;

//     const fetchServices = async () => {
//       try {
//         const res = await searchService(city);
//         setServices(res?.data?.data || []);
//       } catch (error) {
//         console.error("Error fetching services:", error);
//       }
//     };

//     fetchServices();
//   }, [city]);

//   const handleInputChange = async (e) => {
//     setInputValue(e.target.value);
//     const rect = e.target.getBoundingClientRect();
//     setInputRect(rect);

//     if (debounceTimeout.current) {
//       clearTimeout(debounceTimeout.current);
//     }

//     debounceTimeout.current = setTimeout(async () => {
//       try {
//         if (e.target.value) {
//           const res = await searchService(city);
//           const services = res?.data?.data || [];
//           const filtered = services.filter((s) =>
//             s.toLowerCase().includes(e.target.value.toLowerCase())
//           );
//           setFilteredServices(filtered);
//         } else {
//           setFilteredServices([]);
//         }
//       } catch (error) {
//         console.error("Error fetching services:", error);
//       }
//     }, 300); // Debounce delay reduced for better UX
//   };

//   const handleSearch = useCallback(async (query) => {
//     try {
//       const res = await searchText(query, 1, 10);
//       setText(res?.data?.data || []);
//       setFilteredServices([]); // Clear suggestions when search results are fetched
//     } catch (error) {
//       console.error("Error searching text:", error);
//     }
//   }, []);

//   const handleKeyDown = useCallback(
//     async (e) => {
//       if (e.key === "Enter" && inputValue) {
//         await handleSearch(inputValue);
//       }
//     },
//     [inputValue, handleSearch]
//   );

//   const handleSuggestionClick = async (suggestion, source) => {
//     setInputValue(suggestion);
//     if (source === "input") {
//       await handleSearch(suggestion);
//     } else if (source === "icon") {
//       // Handle click from search icon
//       try {
//         const res = await searchText(suggestion, 1, 10);
//         setText(res?.data?.data || []);
//         setFilteredServices([]); // Clear suggestions when search results are fetched
//       } catch (error) {
//         console.error("Error searching text:", error);
//       }
//     }
//   };

//   const renderDropdown = () => (
//     <ul
//       className={styles.dropdown}
//       style={{
//         top: inputRect ? inputRect.bottom + window.scrollY + 4 : 0,
//         left: inputRect ? inputRect.left + window.scrollX : 0,
//         width: inputRect ? inputRect.width : "auto",
//       }}
//     >
//       {filteredServices.map((item, index) => (
//         <li
//           key={index}
//           className={styles.dropdownItem}
//           onClick={() => handleSuggestionClick(item, "input")} // Pass "input" as source
//         >
//           <span
//             className={styles.searchIcon}
//             onClick={(e) => {
//               e.stopPropagation();
//               handleSuggestionClick(item, "icon"); // Pass "icon" as source
//             }}
//           >
//             <IoSearchSharp className={styles.icon} />
//           </span>
//           {item}
//         </li>
//       ))}
//     </ul>
//   );

//   const handleIconClick = async () => {
//     if (inputValue) {
//       await handleSearch(inputValue);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <IoSearchSharp className={styles.searchIcon} onClick={handleIconClick} />
//       <input
//         type="text"
//         placeholder="Search for a service e.g., Hair cut, spa, etc."
//         className={styles.input}
//         value={inputValue}
//         onChange={handleInputChange}
//         onKeyDown={handleKeyDown}
//       />
//       {(filteredServices.length > 0 || text.length > 0) &&
//         inputRect &&
//         ReactDOM.createPortal(renderDropdown(), document.body)}
//     </div>
//   );
// }

// export default SearchInput;


import { useEffect, useState, useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import { IoSearchSharp } from "react-icons/io5";
import styles from "./searchInput.module.css";
import { searchService, searchText } from "../../api/account.api";
import Session from "@/service/session";
import { useDispatch } from "react-redux";
import { setFilteredSalon } from "../../app/Redux/Authslice"; // Update the import path accordingly
import { useRouter } from "next/navigation";

function useDebounce(callback, delay) {
  const debounceTimeout = useRef(null);

  return (...args) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

function SearchInput() {
  const [services, setServices] = useState([]);
  const [text, setText] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);
  const [inputRect, setInputRect] = useState(null);
  const dispatch = useDispatch();
  const city = Session.get("city");
  const router = useRouter();

  useEffect(() => {
    if (!city) return;

    const fetchServices = async () => {
      try {
        const res = await searchService(city);
        setServices(res?.data?.data || []);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [city]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    const rect = e.target.getBoundingClientRect();
    setInputRect(rect);
    debounceFetchServices(e.target.value);
  };

  const debounceFetchServices = useDebounce(async (query) => {
    if (query) {
      try {
        const res = await searchService(city);
        const services = res?.data?.data || [];
        const filtered = services.filter((s) =>
          s.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredServices(filtered);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    } else {
      setFilteredServices([]);
    }
  }, 300);

  const handleSearch = useCallback(async (query) => {
    try {
      const res = await searchText(query, 1, 10);
      setText(res?.data?.data || []);
      setFilteredServices([]); // Clear suggestions when search results are fetched
      return res?.data?.data; // Return the response data
    } catch (error) {
      console.error("Error searching text:", error);
    }
  }, []);

  const handleKeyDown = useCallback(
    async (e) => {
      if (e.key === "Enter" && inputValue) {
        const data = await handleSearch(inputValue);
        console.log("Response data on Enter:", data);
      }
    },
    [inputValue, handleSearch]
  );

  const handleSuggestionClick = async (suggestion, source) => {
    setInputValue(suggestion);
    if (source === "input") {
      const data = await handleSearch(suggestion);
      dispatch(setFilteredSalon(data)); // Dispatch action to store the data
      console.log("Response data on suggestion click (input):", data);
      console.log("Navigating to /salonlist");
      router.push('/salonlist'); // Navigate to salonlist page
    } else if (source === "icon") {
      try {
        const res = await searchText(suggestion, 1, 10);
        setText(res?.data?.data || []);
        setFilteredServices([]); // Clear suggestions when search results are fetched
        dispatch(setFilteredSalon(res?.data?.data)); // Dispatch action to store the data
        console.log("Response data on suggestion click (icon):", res?.data?.data);
        console.log("Navigating to /salonlist");
        router.push('/salonlist'); // Navigate to salonlist page
      } catch (error) {
        console.error("Error searching text:", error);
      }
    }
  };

  const renderDropdown = () => (
    <ul
      className={styles.dropdown}
      style={{
        top: inputRect ? inputRect.bottom + window.scrollY + 4 : 0,
        left: inputRect ? inputRect.left + window.scrollX : 0,
        width: inputRect ? inputRect.width : "auto",
      }}
    >
      {filteredServices.map((item, index) => (
        <li
          key={index}
          className={styles.dropdownItem}
          onClick={() => handleSuggestionClick(item, "input")} // Pass "input" as source
        >
          <span
            className={styles.searchIcon}
            onClick={(e) => {
              e.stopPropagation();
              handleSuggestionClick(item, "icon"); // Pass "icon" as source
            }}
          >
            <IoSearchSharp className={styles.icon} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );

  const handleIconClick = async () => {
    if (inputValue) {
      const data = await handleSearch(inputValue);
      console.log("Response data on icon click:", data);
      console.log("Navigating to /salonlist");
      router.push('/salonlist'); // Navigate to salonlist page
    }
  };

  return (
    <div className={styles.container}>
      <IoSearchSharp className={styles.searchIcon} onClick={handleIconClick} />
      <input
        type="text"
        placeholder="Search for a service e.g., Hair cut, spa, etc."
        className={styles.input}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {filteredServices.length > 0 &&
        inputRect &&
        ReactDOM.createPortal(renderDropdown(), document.body)}
    </div>
  );
}

export default SearchInput;
