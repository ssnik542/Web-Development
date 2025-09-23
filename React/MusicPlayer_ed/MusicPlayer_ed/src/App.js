import Player from "./components/Player";
import Song from "./components/Song";
import data from "./utils";
import Library from "./components/Library";
import "./styles/styles.scss";
import { useRef, useState } from "react";
import Nav from "./components/Nav";
import { playAudio } from "./funct";
export default function App() {
  const audioRef = useRef(null);
  //state
  const [songs, setSongs] = useState(data());
  const [currentSong, setcurrentSong] = useState(songs[0]);
  const [isPlaying, setisPlaying] = useState(false);
  const [songinfo, setSonginfo] = useState({
    currentTime: 0,
    duration: 0
  });
  console.log(currentSong.src)
  const [libraryStatus, setLibraryStatus] = useState(false);
  const timeUpdateHandler = (e) => {
    const curr = e.target.currentTime;
    const dur = e.target.duration;
    setSonginfo({ ...songinfo, currentTime: curr, duration: dur });
  };
  const songEndHandler = async () => {
    let currIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setcurrentSong(songs[(currIndex + 1) % songs.length]);
    playAudio(isPlaying, audioRef);
  };
  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} isPlaying={isPlaying} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setisPlaying={setisPlaying}
        audioRef={audioRef}
        songinfo={songinfo}
        setSonginfo={setSonginfo}
        songs={songs}
        setcurrentSong={setcurrentSong}
        setSongs={setSongs}
      />
      <Library
        songs={songs}
        setcurrentSong={setcurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}
