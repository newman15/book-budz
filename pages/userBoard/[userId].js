import { useRouter } from "next/router";
import SearchUser from "../../components/search/searchUser";
import styles from "../../styles/Home.module.css"

export default function UserBoard() {

    const router = useRouter(); // Create router instance
    const user = router.query; // Store userId
    const userId = user.userId;

    return (
        <div className={styles.gradient}>
            <SearchUser userId={userId} />
        </div>
    )
}