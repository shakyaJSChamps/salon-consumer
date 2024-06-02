import { useEffect, useState, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './searchInput.module.css';
import { searchService, searchText } from '../../api/account.api';

function SearchInput() {
  const [services, setServices] = useState([]);
  const [text, setText] = useState([]);
  const [inputValue, setInputValue] = useState('');
  console.log("inputvalue::>",inputValue)
  const [filteredServices, setFilteredServices] = useState([]);
  const [inputRect, setInputRect] = useState(null);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await searchService();
        setServices(res?.data?.data || []);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    const rect = e.target.getBoundingClientRect();
    setInputRect(rect);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (e.target.value) {
        const filtered = services.filter(s => s.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredServices(filtered);
      } else {
        setFilteredServices([]);
      }
    }, 400);
  };

  const handleKeyDown = useCallback(async (e) => {
    if (e.key === 'Enter' && inputValue) {
      try {
        const res = await searchText(inputValue);
        console.log("API response:", res.data);  
        setText(res?.data?.data || []);
      } catch (error) {
        console.error("Error searching text:", error);
      }
    }
  }, [inputValue]);

  const renderDropdown = () => (
    <ul 
      className={styles.dropdown} 
      style={{ 
        top: inputRect ? inputRect.bottom + window.scrollY + 4 : 0, 
        left: inputRect ? inputRect.left + window.scrollX : 0, 
        width: inputRect ? inputRect.width : 'auto' 
      }}
    >
      {(text.length > 0 ? text : filteredServices).map((item, index) => (
        <li key={index} className={styles.dropdownItem}>
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={styles.container}>
      <input 
        type='text' 
        placeholder='Search for a service e.g., Hair cut, spa, etc.'
        className={styles.input}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {(filteredServices.length > 0 || text.length > 0) && inputRect && ReactDOM.createPortal(
        renderDropdown(),
        document.body
      )}
    </div>
  );
}

export default SearchInput;
