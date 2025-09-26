import { useQuery } from "@tanstack/react-query";
import NoteForm from "../components/NoteForm";
import { getBookById } from "../services/api";
import { useParams } from "react-router-dom";

function EditNotePage() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note"],
    queryFn: () => getBookById(id),
  });

  const note = data?.data.book;

  if (isError) {
    return <p>Something went wrong</p>;
  }
  if (!note) {
    return <p>Something went wrong</p>;
  }
  console.log(isLoading);
  return <NoteForm title={"Edit a Note"} note={note} id={id} />;
}

export default EditNotePage;
