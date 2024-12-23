import { useState, useEffect } from "react";
import {
  Input,
  Button,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import {
  makeAuthenticatedPOSTRequest,
  makeAuthenticatedPUTRequest,
} from "../utils/serverHelper";

const CreatePlaylistModal = ({ closeModal, isOpen, playlist }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistThumbnail, setPlaylistThumbnail] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");

  // If there's a playlist, populate the fields with the existing data
  useEffect(() => {
    if (playlist) {
      setPlaylistName(playlist.name || "");
      setPlaylistThumbnail(playlist.thumbnail || "");
      setPlaylistDescription(playlist.desc || "");
    }
  }, [playlist, isOpen]);

  const createOrUpdatePlaylist = async () => {
    const data = {
      name: playlistName,
      thumbnail: playlistThumbnail,
      description: playlistDescription,
      songs: playlist.songs || [],
    };

    let response;
    if (playlist && playlist._id) {
      // Update existing playlist
      response = await makeAuthenticatedPUTRequest(
        `/playlist/update/${playlist._id}`,
        data
      );
    } else {
      // Create a new playlist
      response = await makeAuthenticatedPOSTRequest("/playlist/create", data);
    }

    if (response._id) {
      closeModal(); // Close modal after creating or updating playlist
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent bg="appBlack" color="white" p={8}>
        <ModalHeader>
          {playlist ? "Edit Playlist" : "Create Playlist"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={4}>
            <Text mb={2}>Name</Text>
            <Input
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              placeholder="Playlist Name"
              bg="gray.700"
              color="white"
            />
          </Box>
          <Box mb={4}>
            <Text mb={2}>Thumbnail</Text>
            <Input
              value={playlistThumbnail}
              onChange={(e) => setPlaylistThumbnail(e.target.value)}
              placeholder="Playlist Thumbnail URL"
              bg="gray.700"
              color="white"
            />
          </Box>
          <Box mb={4}>
            <Text mb={2}>Description</Text>
            <Input
              value={playlistDescription}
              onChange={(e) => setPlaylistDescription(e.target.value)}
              placeholder="Playlist Description"
              bg="gray.700"
              color="white"
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={createOrUpdatePlaylist}>
            {playlist ? "Save Changes" : "Create"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreatePlaylistModal;
