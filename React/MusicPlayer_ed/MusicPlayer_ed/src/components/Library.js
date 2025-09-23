import LibrarySong from "./LibrarySong";
const Library = ({
  songs,
  setcurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus
}) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            songs={songs}
            setcurrentSong={setcurrentSong}
            song={song}
            key={song.id}
            id={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};
export default Library;
