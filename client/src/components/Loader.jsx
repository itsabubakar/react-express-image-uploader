const Loader = ({ percentage }) => {
    return (
        <div className="shadow-lg h-8 flex items-center py-4 px-4 rounded">
            <div className="w-[300px] bg-gray-200 rounded-full dark:bg-gray-700">
                <div className="bg-blue-600 text-lg pl-3 font-medium text-blue-100 text-center p-0.5 leading-none rounded-full h-2" style={{ width: `${percentage}%` }}></div>
            </div></div>
    )
}
export default Loader