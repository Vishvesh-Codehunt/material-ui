import React from "react";

function NoteCard(props){
    return(
        <div>
            {props.note.title}
        </div>
    );
}

export default NoteCard;