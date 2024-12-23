import React, { useEffect, useState, useRef } from "react";
import { getToken, playTrack } from "../spotify";

import {
  Box,
  Image,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  IconButton,
} from "@chakra-ui/react";
import { FaPlay, FaPause } from "react-icons/fa";
import { SimpleGrid } from "@chakra-ui/react";

const MusicCard = ({ image, title, artist, audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const [token, setToken] = useState(null);
  const [deviceId, setDeviceId] = useState(null);

  // Play the track when the component mounts

  // Toggle Play/Pause and update state
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update currentTime as the audio plays
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Load duration when metadata is available
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  // Seek functionality
  const handleSliderChange = (value) => {
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  return (
    <Box
      maxW="400px"
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
      bg="white"
      _hover={{ transform: "scale(1.02)", transition: "0.2s" }}
      p="4"
      display="flex"
      alignItems="center"
    >
      {/* Album Image */}
      <Image src={image} alt={title} boxSize="80px" borderRadius="md" mr="4" />

      {/* Song Details */}
      <Box flex="1">
        <Text fontSize="lg" fontWeight="bold" mb="1">
          {title}
        </Text>
        <Text fontSize="sm" color="gray.600">
          {artist}
        </Text>

        {/* Progress Slider */}
        <Slider
          aria-label="Music progress"
          value={currentTime}
          max={duration}
          onChange={handleSliderChange}
          mt="2"
        >
          <SliderTrack bg="gray.200">
            <SliderFilledTrack bg="teal.500" />
          </SliderTrack>
          <SliderThumb boxSize={3} />
        </Slider>
      </Box>

      {/* Play/Pause Button */}
      <IconButton
        icon={isPlaying ? <FaPause /> : <FaPlay />}
        colorScheme="teal"
        variant="outline"
        onClick={togglePlayPause}
        ml="4"
        aria-label="Play/Pause"
      />

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
    </Box>
  );
};

export default MusicCard;
