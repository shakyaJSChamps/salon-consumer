import styles from './searchInput.module.css'

function SearchInput() {
  return (
    <div className={styles.container}>
        <input 
        type='text' 
        // placeholder='Search for a service e.g. Hairstylist, Spa etc'
        placeholder='Search for a service e.g., Hair cut, spa, etc.'
        className={styles.input}/>
     
     
    </div>
  )
}

export default SearchInput
