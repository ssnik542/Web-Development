import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowBigLeft, Loader } from "lucide-react";
import { useState } from "react";
import { createBook } from "../services/api";
import { useNavigate } from "react-router-dom";
import { NoteTypes } from "../Types";

interface IFormInput {
  title: string;
  genre: string;
  coverImage: FileList | null;
  file: FileList | null;
}
type noteTypes = {
  title: string;
  note?: NoteTypes;
  id?: string;
};
function NoteForm({ title, note, id }: noteTypes) {
  const [formdata, setFormData] = useState<IFormInput>({
    title: note?.title ? note?.title : "",
    genre: note?.genre ? note.genre : "",
    coverImage: null,
    file: null,
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setFormData((prev) => ({
      ...prev,
      [event.target.id]: event.target.files
        ? event.target.files
        : event.target.value,
    }));

    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile.name);
      // You can access other properties like lastModified, size, etc.
    }
  };

  const mutation = useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
      queryClient.invalidateQueries({
        queryKey: ["mynotes"],
      });
      navigate("/");
    },
    onError(error) {
      setError(error.message);
    },
  });
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", formdata.title);
    formData.append("genre", formdata.genre);
    formdata?.coverImage &&
      formData.append("coverImage", formdata?.coverImage[0]);
    formdata.file && formData.append("file", formdata.file[0]);
    id
      ? mutation.mutate({ data: formData, id })
      : mutation.mutate({ data: formData });
  };

  const handleBack = () => {
    navigate("/user/dashboard");
  };
  return (
    <>
      <div className="mt-4 flex items-center">
        <ArrowBigLeft className="ml-1 cursor-pointer" onClick={handleBack} />
        <p className="ml-1 font-bold text-lg">{title}</p>
      </div>
      <div className="mt-8 mx-6">
        <form
          onSubmit={(e) => onSubmit(e)}
          className="flex flex-col gap-4 justify-center border-t-2 border-t-[#333] px-4 py-8 rounded-md shadow-lg shadow-blue-700/50 shadow-b-2 shadow-r-[3px] -shadow-spread-4"
        >
          <input
            onChange={onChange}
            className="border-2 border-black/50 p-1 rounded-md text-black placeholder:text-black/90"
            placeholder="Title"
            required
            id="title"
            value={formdata.title}
          />
          <input
            onChange={onChange}
            className="border-2 border-black/50 p-1 rounded-md text-black placeholder:text-black/90"
            placeholder="Description"
            required
            id="genre"
            value={formdata.genre}
          />
          <div className="flex gap-4 flex-col md:flex-row w-full">
            <div className="flex flex-col w-full gap-2">
              <div className="flex gap-2 items-center border-2 border-black/50 p-1 rounded-md">
                <label className="font-bold text-sm">Photo </label>
                <input
                  type="file"
                  required={!id}
                  onChange={onChange}
                  id="coverImage"
                  accept="image/png, image/jpeg"
                />
              </div>
              {note?.coverImage && (
                <img
                  src={note?.coverImage}
                  alt=""
                  className="w-1/2 h-36 rounded-md"
                />
              )}
            </div>
            <div className="flex flex-col w-full gap-2">
              <div className="flex gap-2 items-center border-2 border-black/50 p-1 rounded-md">
                <label className="font-bold text-sm">PDF </label>
                <input
                  type="file"
                  required={!id}
                  onChange={onChange}
                  id="file"
                  accept="application/pdf"
                />
              </div>
              {note?.coverImage && <iframe src={note.file}></iframe>}
            </div>
          </div>
          {/* <input
            disabled={mutation.isPending}
            type="submit"
            value={mutation.isPending ? "Submitting..." : "Submit"}
            className="border-2 py-1 cursor-pointer px-3 border-blue-400 rounded-md hover:border-blue-300 transition-all active:scale-90 font-semibold tracking-wide self-center mt-4"
          /> */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="border-2 py-1 cursor-pointer px-3 border-blue-400 rounded-md hover:border-blue-300 transition-all active:scale-90 font-semibold tracking-wide self-center mt-4"
          >
            {mutation.isPending ? (
              <Loader className="animate-spin" />
            ) : (
              "Submit"
            )}
          </button>
        </form>
        {error && (
          <p className="font-bold text-lg text-red-600 text-center mt-5">
            {error} Something went wrong... ☹️
          </p>
        )}
      </div>
    </>
  );
}

export default NoteForm;
