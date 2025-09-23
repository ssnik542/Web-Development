import { playAudio } from "../funct";
export default function LibrarySong({
  song,
  songs,
  setcurrentSong,
  audioRef,
  isPlaying,
  id,
  setSongs
}) {
  const songSelectHandler = () => {
    setcurrentSong(song);
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true
        };
      } else {
        return {
          ...song,
          active: false
        };
      }
    });
    setSongs(newSongs);
    playAudio(isPlaying, audioRef);
  };
  return (
    <div
      className={`library-song ${song.active ? "selected" : ""}`}
      onClick={songSelectHandler}
    >
      <img src={song.cover} alt={song.name}></img>
      <div className="songDes">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}
