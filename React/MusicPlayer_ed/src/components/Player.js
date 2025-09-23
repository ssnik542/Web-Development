import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
const Player = ({
  currentSong,
  isPlaying,
  setisPlaying,
  audioRef,
  songinfo,
  setSonginfo,
  songs,
  setcurrentSong,
  setSongs
}) => {
  //useEffect
  useEffect(() => {
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
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
  }, [currentSong]);
  //ref
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setisPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setisPlaying(!isPlaying);
    }
  };
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSonginfo({ ...songinfo, currentTime: e.target.value });
  };
  // state
  const skipTrackHandler = async (direction) => {
    let currIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setcurrentSong(songs[(currIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currIndex - 1) % songs.length === -1) {
        await setcurrentSong(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.play();
        return;
      }
      await setcurrentSong(songs[(currIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };
  return (
    <div className="player-container">
      <div className="time-control">
        <p>{getTime(songinfo.currentTime)}</p>
        <input
          min={0}
          max={songinfo.duration || 0}
          value={songinfo.currentTime}
          onChange={dragHandler}
          type="range"
        />
        <p>{songinfo.duration ? getTime(songinfo.duration) : "0.00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          icon={faAngleLeft}
          size="2x"
          onClick={() => {
            skipTrackHandler("skip-back");
          }}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          icon={isPlaying ? faPause : faPlay}
          size="2x"
        />
        <FontAwesomeIcon
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
          onClick={() => {
            skipTrackHandler("skip-forward");
          }}
        />
      </div>
    </div>
  );
};
export default Player;
