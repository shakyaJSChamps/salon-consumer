import Image from 'next/image'
import Link from 'next/link'
import styles from './authlink.module.css'
import authUser from "@/assets/images/loginUser.svg"
function Authlink() {
    const status = true
    return (
        <div>
            {status ? (<Link href={"/login"}>
                <Image src={authUser} width={25}
                    height={25} alt='authUser' />
                <span>Signin/Signup</span>
            </Link>) : (<div className={styles.user}>
                <Image src={authUser} width={25}
                    height={25} alt='authUser' />
                <span className={styles.userName} >Anil Kumar</span>
            </div>
            )}
        </div>
    )
}

export default Authlink
