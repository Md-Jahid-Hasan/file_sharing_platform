import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import FileViewer from "react-file-viewer";
import {useParams} from "react-router-dom";
import axios from "axios";
import {getHeader} from "../../context/action/auth";

const onError = e => {
    console.log(e, "error in file-viewer");
};


function ShowFile() {
    const {fileId} = useParams();

    const [file, setFile] = useState()
    const [fileType, setFileType] = useState()

    useEffect(() => {
        axios
            .get(`/api/directory/file/${fileId}/`, getHeader())
            .then(res => {
                setFile(res.data)
                setFileType(res.data.content.split(".").at(-1))
            })
            .catch(error => console.log(error.response))
    }, [])
    console.log(file, fileType)
    return (
        <div>
            {file &&
                <FileViewer fileType={fileType}
                             style={{width:"80%"}}
                            filePath={file.content}
                            onError={onError}/>
            }
        </div>
    );
}

export default ShowFile
