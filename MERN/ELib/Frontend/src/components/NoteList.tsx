import Notes from "./Notes";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useTokenStore from "../store";
import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../services/api";
import { NoteTypes } from "../Types";

function NoteList() {
  const navigate = useNavigate();
  // @ts-expect-error needs to be correct
  const user = useTokenStore((state) => state.token);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes"],
    queryFn: getBooks,
  });

  useEffect(() => {
    if (!user) {
      navigate("/signIn");
    }
  }, []);

  if (!user) return;

  if (data?.data.books.length === 0) {
    return (
      <div className="flex justify-center items-center mt-14 flex-col">
        <p className="font-bold text-blue-400 tracking-widest underline text-xl">
          No Notes to show
        </p>
        <NavLink to={"/note/create"}>
          <button className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full mt-4">
            Upload Notes
          </button>
        </NavLink>
      </div>
    );
  }
  return (
    <div className="mt-4 max-w-5xl mx-auto">
      <div className="flex gap-16 flex-wrap p-4 justify-center md:justify-normal">
        {isLoading && <p>Loading...</p>}
        {isError && (
          <p className="text-xl font-bold text-red-800">
            Something went wrong !
          </p>
        )}
        {data?.data.books.map((note: NoteTypes) => (
          // @ts-expect-error needs to be correct
          <Notes note={note} key={note._id} />
        ))}
      </div>
    </div>
  );
}

export default NoteList;
