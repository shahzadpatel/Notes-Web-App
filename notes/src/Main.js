import ReactMarkdown from "react-markdown"; //this library is used to render html tags in your edit note section
//.... and you'll see those results in the note preview section 


// this is the right side of the page that represents the note that the user is working on
function Main({ activeNote, onUpdateNote }) {

    const onEditField = (key, value) => {
        onUpdateNote({
            ...activeNote, 
            [key]: value,
            lastModified: Date.now(),
        })

    };

    if(!activeNote) 
        return <div className="no-active-note">No note selected</div>;

    return <div className="app-main">

        <div className="app-main-note-edit">

            <input 
                type="text" 
                id="title" 
                value={activeNote.title} 
                onChange={(e) => onEditField("title", e.target.value)}
                autoFocus />

            <textarea 
                id="body" 
                placeholder="Write your note here...." 
                value={activeNote.body} 
                onChange={(e) => onEditField("body", e.target.value)}
                />

        </div>

        <div className="app-main-note-preview"> 

            <h1 className="preview-title">{activeNote.title}</h1>
            <ReactMarkdown className="markdown-preview">
                {activeNote.body}
            </ReactMarkdown>

        </div>


    </div>;

}

export default Main;