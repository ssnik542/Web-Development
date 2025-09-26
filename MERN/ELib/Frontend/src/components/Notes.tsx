import { useNavigate } from "react-router-dom";
import { NoteTypes } from "../Types";
// @ts-expect-error needs to be correct
function Notes({ note }: NoteTypes) {
  const navigate = useNavigate();
  return (
    <div className="flex gap-4 shadow-lg shadow-blue-700/50 shadow-b-2 shadow-r-[3px] -shadow-spread-4 rounded-md px-2 py-3 border-t-2 border-t-[#333] max-w-72">
      <div>
        <img
          src={
            note.coverImage
              ? note.coverImage
              : "https://th.bing.com/th?id=OIP.SlOEDd4qG_pradkmBlFPxwHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
          }
          alt={note.title}
          className="h-36 rounded-md w-36"
        />
      </div>
      <div className="flex flex-col gap-2 justify-around">
        <h1 className="font-bold text-md">{note.title}</h1>
        <p className="font-semibold text-md -mt-2">{note.author.name}</p>
        <button
          onClick={() => navigate(`/note/${note._id}`)}
          className="border-2 p-1 border-blue-400 rounded-md hover:border-blue-300 transition-all active:scale-90 font-semibold tracking-wide w-24"
        >
          Read more
        </button>
      </div>
    </div>
  );
}

export default Notes;
