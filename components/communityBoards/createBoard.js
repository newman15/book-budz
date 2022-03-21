// This will be how the board author creates a new public book board

export default function CreateBoard(){

    return (
        <div>
            <h2>Create a new public book board</h2>
            <form>
                <label>Board Name:
                    <input type="text" id="boardName" placeholder="NewBoard"  required/>
                </label>

                <label>Board Genre:
                    <input type="text" id="boardName" placeholder="Science Fiction"  required/>
                </label>

                <label>Board Description:
                    <textarea type="text" id="boardDescription" name="boardDescription" placeholder="ie: This board is for fans of the DOOM series." required/>
                </label>

                <input type="submit" value="Save Board" />
            </form>
        </div>
    )
}