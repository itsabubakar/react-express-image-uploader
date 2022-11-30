import { useEffect } from "react";
import { useRef, useState } from "react";
import ImageIcon from "../icons/ImageIcon";
import axios from 'axios'

function DragDropFile() {
    // drag state
    const [dragActive, setDragActive] = useState(false)
    const inputRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [percentage, setPercentage] = useState(0)

    let percent = 0

    const config = {
        onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            percent = Math.floor((loaded * 100) / total)
            console.log(`${loaded}kb of ${total}kb | ${percent}%`) // just to see whats happening in the console

            if (percent <= 100) {
                setPercentage(percent)
                setLoading(true) // hook to set the value of current level that needs to be passed to the progressbar
            }

            if (percent >= 100) {
                setLoading(false)
            }
        }
    }

    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };



    // handle drag events
    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false)

        }
    }

    const handleDrop = async function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // at least one file has been dropped so do something
            // handleFiles(e.dataTransfer.files)
            let imgFile = e.dataTransfer.files[0]

            const formData = new FormData()

            formData.append('file', imgFile)
            try {
                const response = await axios.post('http://localhost:3500/upload', formData, config)
                    .then(res => {
                        setPercentage(percent), () => {
                            setTimeout(() => {
                                setPercentage(0)
                            }, 1000);
                        }
                    })
                    .catch((error) => {
                        console.error('Upload Error:', error)
                    })

                // response.then(() => {
                //     console.log('File uploaded successfully')
                // })

            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            // at least one file has been selected so do something
            // handleFiles(e.target.files);
            // setFile(e.target.files[0])
            // console.log(file)
        }
    }

    return (
        <>
            {loading && percentage < 100 &&
                <div className="">
                    <div className="w-[300px] bg-gray-200 rounded-full dark:bg-gray-700">
                        <div className="bg-blue-600 text-lg pl-3 font-medium text-blue-100 text-center p-0.5 leading-none rounded-full h-2" style={{ width: `${percentage}%` }}></div>
                    </div></div>

            }

            {!loading && percentage === 100 && <div>Done</div>}
            {!loading && percentage < 100 && <div className="text-center hsd py-8 px-5 rounded-lg">
                <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                    <h2 className='font-semibold text-xl mb-3'>Upload your image</h2>
                    <p className='text-sm mb-5'>Files should be Jpeg, Png or Jpg</p>
                    <input ref={inputRef} type="file" id="input-file-upload" accept="image/*" onChange={handleChange} />
                    <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
                        <div className="flex flex-col items-center py-4 bg-[#F6F8FB]">
                            <ImageIcon width={150} height={150} />

                            <p className="text-[#BDBDBD] text-md">Drag and drop your images here</p>
                        </div>
                    </label>
                    {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
                </form>
                <p className="text-[#BDBDBD] text-md mb-3">or</p>
                <button onClick={onButtonClick} className="upload-button bg-blue-500 text-white py-1 px-2 rounded-md">Choose a file</button>
            </div>}
        </>

    );
}

export default DragDropFile