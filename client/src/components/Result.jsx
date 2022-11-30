// import img from '../assets/dashboard.png'

import { useState } from "react"

const Result = ({ filepath }) => {
    const [copied, setCopied] = useState(false)
    const onCopy = () => {
        navigator.clipboard.writeText(`http://127.0.0.1:5173/public${filepath}`)
        setCopied(!copied)
        setTimeout(() => {
            setCopied(false)
        }, 1000)
    }

    return (
        <div className='hsd w-[400px] h-[450px]'>
            <h2 className="text-center text-2xl font-semibold mt-5">Upload Successful</h2>
            <div className="mt-4 flex flex-col mx-5">
                <div className="w-[300px] h-[224px]">
                    <img className="border h-full shadow-md rounded-md" src={`../../public${filepath}`} alt="alt" />
                </div>
                <div className="bg-[#efefef] text-[14px] flex mt-4 border-2 rounded">
                    <input readOnly className="text-[#888] bg-[#efefef] py-1 px-1 flex-1" type="text" value={`http://127.0.0.1:5173/public${filepath}`} />
                    <button onClick={onCopy} className="px-1 bg-blue-500  text-white flex-2 rounded-lg">Copy Link</button>
                </div>
                {copied && <p className="text-blue-600 font-semibold text-center text-base mt-2">Copied!</p>}

            </div>
        </div>
    )
}
export default Result