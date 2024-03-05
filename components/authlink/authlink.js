import Image from 'next/image'
import Link from 'next/link'
import authUser from "@/assets/images/loginUser.svg"

function Authlink() {
    const status=true
    return (
        <div>
            {status ?(<Link href={"/login"}>
                <Image src={authUser} width={25}
                    height={25} alt='authUser' />
                <span>Signin/Signup</span>
            </Link>):(<>
                <Link href={"/login"}>
                <Image src={authUser} width={25}
                    height={25} alt='authUser' />
                <span >Anil Kumar</span>
            </Link>
            </>
            )}
        </div>
    )
}

export default Authlink
