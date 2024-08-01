import { useEffect, useState, useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import { IoSearchSharp } from "react-icons/io5";
import styles from "./searchInput.module.css";
import { searchService, searchText } from "../../api/account.api";
import Session from "@/service/session";
import { useDispatch } from "react-redux";
import { setFilteredSalon } from "../../app/Redux/Authslice";
import { useRouter } from "next/navigation";
import Notify from "@/utils/notify";
import Cookies from "js-cookie";
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
  const latitude = Cookies.get('latitude') || '';
  const longitude = Cookies.get('longitude') || '';

  // console.log("Latitude:", latitude);
  // console.log("Longitude:", longitude);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await searchService(query);
        setServices(res?.data?.data || []);
      } catch (error) {}
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
        const requestUrl =
        latitude !== "" && longitude !== ""
          ? `latitude=${latitude}&longitude=${longitude}`
          : "";  
        const res = await searchService(query,requestUrl);
        const services = res?.data?.data || [];
        const filtered = services.filter((s) =>
          s.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredServices(filtered);
      } catch (error) {
        Notify.error(error.message);
      }
    } else {
      setFilteredServices([]);
    }
  }, 300);

  const handleSearch = useCallback(async (query) => {
    const requestUrl =
      latitude !== "" && longitude !== ""
        ? `latitude=${latitude}&longitude=${longitude}`
        : "";  
    try {
       
        console.log('reqUrl',requestUrl)   
      const res = await searchText(query,requestUrl);
      setText(res?.data?.data || []);
      setFilteredServices([]); 
      return res?.data?.data;
    } catch (error) {
      Notify.error(error.message);
    }
  }, []);

  const handleKeyDown = useCallback(
    async (e) => {
      if (e.key === "Enter" && inputValue) {
        const data = await handleSearch(inputValue);
      }
    },
    [inputValue, handleSearch]
  );

  const handleSuggestionClick = async (suggestion, source) => {
    setInputValue(suggestion);
    if (source === "input") {
      const data = await handleSearch(suggestion);
      dispatch(setFilteredSalon(data)); 
      Session.remove("salonService");
      Session.remove("selectedBannerSalons");

      router.push("/salonlist");
    } else if (source === "icon") {
      try {
        const res = await searchText(suggestion);
        setText(res?.data?.data || []);
        setFilteredServices([]); 
        dispatch(setFilteredSalon(res?.data?.data));
        Session.remove("salonService");
        Session.remove("selectedBannerSalons");

        router.push("/salonlist"); 
      } catch (error) {
        console.error("Error searching text:", error);
      }
    }
  };

  const renderDropdown = () => (
    <ul
      className={styles.dropdown}
    >
      {filteredServices.map((item, index) => (
        <li
          key={index}
          className={styles.dropdownItem}
          onClick={() => handleSuggestionClick(item, "input")}
        >
          <span
            className={styles.searchIcon}
            onClick={(e) => {
              e.stopPropagation();
              handleSuggestionClick(item, "icon"); 
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
      Session.remove("salonService");
      Session.remove("selectedBannerSalons");

      router.push("/salonlist");
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
