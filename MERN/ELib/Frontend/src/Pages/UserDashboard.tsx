import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowBigLeft,
  Edit,
  Eye,
  EyeOff,
  Loader,
  Plus,
  Trash,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteBook, getBookOfUser, hideShowBook } from "../services/api";
import { NoteTypes } from "../Types";
import { useState } from "react";

function UserDashboard() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  const [showpopUp, setShowpopUp] = useState(false);
  const [id, setid] = useState("");
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["mynotes"],
    queryFn: getBookOfUser,
  });

  const mutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mynotes"],
      });
      setShowpopUp(false);
    },
    onError: () => {
      setShowpopUp(false);
    },
  });

  const xmutation = useMutation({
    mutationFn: hideShowBook,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mynotes"],
      });
    },
  });
  const Notes = data ? data?.data.books : [];
  if (Notes.length === 0) {
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

  const deleteBookFunc = (id: string) => {
    setShowpopUp(true);
    setid(id);
  };

  const hideBook = (id: string) => {
    xmutation.mutate(id);
  };
  return (
    <div className="mx-4">
      <div className="flex justify-between items-center">
        <ArrowBigLeft
          className="mt-4 ml-1 cursor-pointer"
          onClick={handleBack}
        />
        <NavLink
          to={"/note/create"}
          className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full mt-4 gap-1 flex"
        >
          <button>Add Note</button>
          <Plus />
        </NavLink>
      </div>
      <div className="mt-8 md:mx-24">
        {isLoading && <p>Loading...</p>}
        {isError && (
          <p className="text-xl font-bold text-red-800">
            Something went wrong !
          </p>
        )}
        {Notes.length > 0 && (
          <div
            className={`border border-black md:h-[450px] h-[80vh] p-4 rounded-md overflow-y-scroll relative`}
          >
            {showpopUp && (
              <div className="border-2 rounded-md border-gray-500 w-64 flex justify-center py-4 absolute z-10 bg-gray-400 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col">
                  Are you sure you want to delete?
                  <div className="flex gap-2 justify-center mt-2">
                    <button
                      className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded-full"
                      onClick={() => mutation.mutate(id)}
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? (
                        <Loader className="animate-spin" />
                      ) : (
                        "Yes"
                      )}
                    </button>
                    <button
                      className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded-full"
                      onClick={() => setShowpopUp(false)}
                      disabled={mutation.isPending}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
            <table
              className={`w-full ${
                (mutation.isPending || showpopUp) &&
                "pointer-events-none opacity-40"
              }`}
            >
              <thead className="text-[10px] md:text-lg">
                <tr>
                  <th className="text-left">Sr.no</th>
                  <th className="text-left">cover Image</th>
                  <th className="text-left">Title</th>
                  <th className="text-left">Created At</th>
                  <th className="text-left">Hide/Show</th>
                  <th className="text-left">Edit</th>
                  <th className="text-left">Delete</th>
                </tr>
              </thead>
              <tbody className="">
                {Notes.map((note: NoteTypes, i: number) => (
                  <tr
                    key={note._id}
                    className="border-b border-black text-[8px] md:text-lg"
                  >
                    <td>{i + 1}</td>
                    <td>
                      <img
                        src={note.coverImage}
                        alt={note.title}
                        className="w-6 md:w-12 md:h-12 h-6 rounded"
                      />
                    </td>
                    <td>{note.title}</td>
                    <td>{note.createdAt.slice(0, 10)}</td>
                    <td>
                      <>
                        {note.hide ? (
                          <EyeOff
                            className="cursor-pointer"
                            onClick={() => {
                              hideBook(note._id);
                            }}
                          />
                        ) : (
                          <Eye
                            className="cursor-pointer"
                            onClick={() => {
                              hideBook(note._id);
                            }}
                          />
                        )}
                      </>
                    </td>
                    <td>
                      <NavLink to={`/note/edit/${note._id}`} replace>
                        <Edit className="text-green-500 cursor-pointer h-4 md:h-full" />
                      </NavLink>
                    </td>
                    <td>
                      <Trash
                        className="text-red-500 cursor-pointer h-4 md:h-full"
                        onClick={() => deleteBookFunc(note._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
