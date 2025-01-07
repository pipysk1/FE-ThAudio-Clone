import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import * as apis from '../apis';
import { formatTime } from '../ultis/fn';

const PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
const STORAGE_KEY_PREFIX = 'audioPlayer_';

const getStorageKeys = (storeId) => ({
  currentTrack: `${STORAGE_KEY_PREFIX}${storeId}_currentTrack`,
  currentTime: `${STORAGE_KEY_PREFIX}${storeId}_currentTime`,
  playbackSpeed: `${STORAGE_KEY_PREFIX}${storeId}_playbackSpeed`,
  isPlaying: `${STORAGE_KEY_PREFIX}${storeId}_isPlaying`,
});

const AudioControls = ({
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  onSeek,
  playbackSpeed,
  onSpeedChange,
}) => (
  <div className='flex items-center rounded-b-xl bg-slate-50 text-slate-500 dark:bg-slate-600 dark:text-slate-200'>
    <div className='flex flex-auto items-center justify-evenly'>
      <button
        type='button'
        onClick={onPrev}
        className='hidden sm:block lg:hidden xl:block'
        aria-label='Previous'
      >
        <svg width='24' height='24' fill='none'>
          <path
            d='m10 12 8-6v12l-8-6Z'
            fill='currentColor'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M6 6v12'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
      <button
        type='button'
        onClick={() => onSeek(-10)}
        aria-label='Rewind 10 seconds'
      >
        <svg width='24' height='24' fill='none'>
          <path
            d='M6.492 16.95c2.861 2.733 7.5 2.733 10.362 0 2.861-2.734 2.861-7.166 0-9.9-2.862-2.733-7.501-2.733-10.362 0A7.096 7.096 0 0 0 5.5 8.226'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M5 5v3.111c0 .491.398.889.889.889H9'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
    </div>
    <button
      type='button'
      onClick={onPlayPause}
      className='-my-2 mx-auto flex h-20 w-20 flex-none items-center justify-center rounded-full bg-white text-slate-900 shadow-md ring-1 ring-slate-900/5 dark:bg-slate-100 dark:text-slate-700'
      aria-label={isPlaying ? 'Pause' : 'Play'}
    >
      {isPlaying ? (
        <svg width='30' height='32' fill='currentColor'>
          <rect x='6' y='4' width='4' height='24' rx='2' />
          <rect x='20' y='4' width='4' height='24' rx='2' />
        </svg>
      ) : (
        <svg width='30' height='32' fill='currentColor'>
          <path d='M10 4l15 12-15 12V4z' />
        </svg>
      )}
    </button>
    <div className='flex flex-auto items-center justify-evenly'>
      <button
        type='button'
        onClick={() => onSeek(10)}
        aria-label='Skip 10 seconds'
      >
        <svg width='24' height='24' fill='none'>
          <path
            d='M17.509 16.95c-2.862 2.733-7.501 2.733-10.363 0-2.861-2.734-2.861-7.166 0-9.9 2.862-2.733 7.501-2.733 10.363 0 .38.365.711.759.991 1.176'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M19 5v3.111c0 .491-.398.889-.889.889H15'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
      <button
        type='button'
        onClick={onNext}
        className='hidden sm:block lg:hidden xl:block'
        aria-label='Next'
      >
        <svg width='24' height='24' fill='none'>
          <path
            d='M14 12 6 6v12l8-6Z'
            fill='currentColor'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M18 6v12'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
      <button
        type='button'
        onClick={onSpeedChange}
        className='rounded-lg px-2 text-xs font-semibold leading-6 text-slate-500 ring-2 ring-inset ring-slate-500 hover:bg-slate-100 dark:text-slate-100 dark:ring-slate-400 dark:hover:bg-slate-700'
        aria-label='Change playback speed'
      >
        {playbackSpeed}x
      </button>
    </div>
  </div>
);

function MediaPlayer() {
  const location = useLocation();
  const { item } = location.state || {};
  const [audioList, setAudioList] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const storageKeys = getStorageKeys(item?.store_plug);

  // Load saved state from localStorage
  useEffect(() => {
    if (item?.store_plug) {
      const savedTrack =
        parseInt(localStorage.getItem(storageKeys.currentTrack)) || 0;
      const savedTime =
        parseFloat(localStorage.getItem(storageKeys.currentTime)) || 0;
      const savedSpeed =
        parseFloat(localStorage.getItem(storageKeys.playbackSpeed)) || 1;
      const savedIsPlaying =
        localStorage.getItem(storageKeys.isPlaying) === 'true';

      setCurrentTrack(savedTrack);
      setCurrentTime(savedTime);
      setPlaybackSpeed(savedSpeed);
      // Don't set isPlaying here, wait for audio to load
    }
  }, [item?.store_plug]);

  // Save state to localStorage when it changes
  useEffect(() => {
    if (item?.store_plug) {
      localStorage.setItem(storageKeys.currentTrack, currentTrack);
      localStorage.setItem(storageKeys.currentTime, currentTime);
      localStorage.setItem(storageKeys.playbackSpeed, playbackSpeed);
      localStorage.setItem(storageKeys.isPlaying, isPlaying);
    }
  }, [currentTrack, currentTime, playbackSpeed, isPlaying, item?.store_plug]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apis.getAudio(item?.store_plug);
        console.log(data);

        setAudioList(data.data || []);
      } catch (error) {
        console.error('Failed to fetch audio:', error);
      }
    };
    if (item?.store_plug) {
      fetchData();
    }
  }, [item?.store_plug]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed, audioRef.current]);

  const handlePlayPause = () => {
    if (!audioRef.current || !audioList.length) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error('Playback failed:', error);
          setIsPlaying(false);
        });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTrackEnd = () => {
    if (currentTrack < audioList.length - 1) {
      setCurrentTrack((prev) => prev + 1);
      setIsPlaying(true); // Keep playing when moving to next track
    } else {
      setIsPlaying(false);
      setCurrentTrack(0); // Loop back to first track
    }
  };

  const handleSeek = (seconds) => {
    if (audioRef.current && isLoaded) {
      audioRef.current.currentTime += seconds;
    }
  };

  const handleNext = () => {
    if (currentTrack < audioList.length - 1) {
      setCurrentTrack((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentTrack > 0) {
      setCurrentTrack((prev) => prev - 1);
    }
  };

  const handleSpeedChange = () => {
    const currentIndex = PLAYBACK_SPEEDS.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % PLAYBACK_SPEEDS.length;
    setPlaybackSpeed(PLAYBACK_SPEEDS[nextIndex]);
  };

  const handleProgressClick = (e) => {
    if (!audioRef.current || !isLoaded || !progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    const newTime = percent * duration;

    if (newTime >= 0 && newTime <= duration) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleProgressMouseDown = (e) => {
    setIsDragging(true);
    handleProgressClick(e);
  };

  const handleProgressMouseMove = (e) => {
    if (isDragging) {
      handleProgressClick(e);
    }
  };

  const handleProgressMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleProgressMouseMove);
    document.addEventListener('mouseup', handleProgressMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleProgressMouseMove);
      document.removeEventListener('mouseup', handleProgressMouseUp);
    };
  }, [isDragging]);

  // Handle audio loading and position setting
  useEffect(() => {
    if (audioRef.current && !isLoaded && audioList.length > 0) {
      const handleCanPlay = () => {
        if (currentTime > 0) {
          audioRef.current.currentTime = currentTime;
        }
        setIsLoaded(true);
        // Check if it should be playing
        const savedIsPlaying =
          localStorage.getItem(storageKeys.isPlaying) === 'true';
        if (savedIsPlaying) {
          audioRef.current.play().catch((error) => {
            console.error('Auto-play failed:', error);
          });
          setIsPlaying(true);
        }
      };

      audioRef.current.addEventListener('canplay', handleCanPlay);
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('canplay', handleCanPlay);
        }
      };
    }
  }, [audioRef.current, isLoaded, currentTime, audioList]);

  // Reset isLoaded when track changes or audioList updates
  useEffect(() => {
    setIsLoaded(false);
  }, [currentTrack, audioList]);

  // Auto-play when loaded if it was playing before
  useEffect(() => {
    if (audioRef.current && isLoaded && isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error('Auto-play failed:', error);
        setIsPlaying(false);
      });
    }
  }, [isLoaded, isPlaying]);

  return (
    <div className='h-16 space-y-6 rounded-t-xl border-b border-slate-100 bg-white p-4 pb-6 sm:space-y-8 sm:p-10 sm:pb-8 lg:space-y-6 lg:p-6 xl:space-y-8 xl:p-10 xl:pb-8 dark:border-slate-500 dark:bg-slate-800'>
      <div className='mt-5 bg-slate-500'>
        <div className='text-center text-xl font-bold text-white'>{`Tập: ${currentTrack + 1}`}</div>
      </div>
      <div className='space-y-2'>
        <div className='relative'>
          <div
            ref={progressRef}
            className='cursor-pointer overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700'
            onClick={handleProgressClick}
            onMouseDown={handleProgressMouseDown}
          >
            <div
              className='h-2 bg-cyan-500 dark:bg-cyan-400'
              style={{ width: `${(currentTime / duration) * 100}%` }}
              role='progressbar'
              aria-label='music progress'
              aria-valuenow={currentTime}
              aria-valuemin='0'
              aria-valuemax={duration}
            ></div>
          </div>
          <div
            className='absolute left-0 top-1/2 -mt-2 h-4 w-4 cursor-grab active:cursor-grabbing'
            style={{
              left: `${(currentTime / duration) * 100}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <div className='h-4 w-4 rounded-full bg-white shadow-md ring-2 ring-cyan-500 dark:ring-cyan-400'>
              <div className='h-1.5 w-1.5 rounded-full bg-cyan-500 ring-1 ring-inset ring-slate-900/5 dark:bg-cyan-400'></div>
            </div>
          </div>
        </div>
        <div className='flex justify-between text-sm font-medium tabular-nums leading-6'>
          <div className='text-cyan-500 dark:text-slate-100'>
            {formatTime(currentTime)}
          </div>
          <div className='text-slate-500 dark:text-slate-400'>
            {formatTime(duration)}
          </div>
        </div>
      </div>
      <AudioControls
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrev={handlePrev}
        onSeek={handleSeek}
        playbackSpeed={playbackSpeed}
        onSpeedChange={handleSpeedChange}
      />
      <div className='scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-400 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 max-h-64 overflow-y-auto border border-red-400'>
        <div className='space-y-1 pr-2'>
          {audioList.map((audio, index) => (
            <div
              key={index}
              className={`flex cursor-pointer items-center space-x-4 rounded-lg p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50 ${
                index === currentTrack ? 'bg-slate-100 dark:bg-slate-700' : ''
              }`}
              onClick={() => setCurrentTrack(index)}
            >
              <div className='flex min-w-0 flex-auto items-center'>
                <div className='min-w-0 flex-auto'>
                  <h2 className='truncate text-sm font-medium leading-6 text-slate-900 dark:text-slate-200'>
                    {audio.title}
                  </h2>
                  {audio.duration && (
                    <p className='text-xs text-slate-500 dark:text-slate-400'>
                      {formatTime(audio.duration)}
                    </p>
                  )}
                </div>
                {index === currentTrack && (
                  <div className='ml-4'>
                    <div className='h-2 w-2 rounded-full bg-cyan-500 dark:bg-cyan-400'></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {audioList[currentTrack] && (
        <audio
          ref={audioRef}
          src={audioList[currentTrack].url}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleTrackEnd}
          preload='auto'
          className='hidden'
        />
      )}
    </div>
  );
}

export default MediaPlayer;
