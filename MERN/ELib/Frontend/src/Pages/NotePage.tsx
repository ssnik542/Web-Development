import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBookById } from "../services/api";
import { ArrowBigLeft } from "lucide-react";
function NotePage() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note"],
    queryFn: () => getBookById(id),
  });

  const note = data?.data.book;
  const downloadPDF = () => {
    window.open(note.file, "_blank");
  };
  if (isError) {
    return <p>Something went wrong</p>;
  }
  const handleBack = () => {
    window.history.back();
  };

  if (!note) {
    return <p>Something went wrong</p>;
  }
  return (
    <>
      <ArrowBigLeft className="mt-4 ml-1 cursor-pointer" onClick={handleBack} />
      <div className="md:max-w-5xl md:mx-auto mt-4 flex justify-center p-4">
        {isLoading && <p>Loading...</p>}
        <div className="flex gap-4 flex-col md:flex-row">
          <div>
            <img
              src={
                note?.coverImage
                  ? note?.coverImage
                  : "https://th.bing.com/th?id=OIP.SlOEDd4qG_pradkmBlFPxwHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
              }
              alt={note.title}
              className="h-64 rounded-md md:w-64 w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold">{note?.title}</h1>
            <span className="-mt-3 text-sm text-gray-500">
              {note.createdAt.slice(0, 10)}
            </span>
            <p className="font-semibold text-md -mt-2">{note.author.name}</p>
            <span className="md:w-96">{note?.genre}</span>
            <div className="flex gap-3">
              <button
                onClick={downloadPDF}
                className="w-full border-2 py-1 px-3 mt-2 border-blue-400 rounded-md hover:border-blue-300 transition-all active:scale-90 font-semibold tracking-wide"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotePage;
