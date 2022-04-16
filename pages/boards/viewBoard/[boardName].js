import { useRouter } from "next/router"
import ShowBooksInBoard from "../../../components/communityBoards/showBooksInBoard";

export default function ViewBoards() {

    const router = useRouter();
    const {boardName} = router.query;
    
    return (
        <div>
            <ShowBooksInBoard boardName={boardName}/>
        </div>
    )
};
