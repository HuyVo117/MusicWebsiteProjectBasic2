import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  ButtonGroup,
  Box,
} from "@chakra-ui/react";
import { songColumnsData, songData } from "../variables/songData";

const SongList = () => {
  return (
    <Box overflowX="auto">
      <Table variant="striped" size="md">
        <Thead>
          <Tr>
            {songColumnsData.map((column, index) => (
              <Th key={index}>{column}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {songData.length === 0 ? (
            <Tr>
              <Td colSpan={songColumnsData.length} textAlign="center">
                No songs available
              </Td>
            </Tr>
          ) : (
            songData.map((song) => (
              <Tr key={song.id}>
                <Td>{song.id}</Td>
                <Td>{song.name}</Td>
                <Td>{song.artist}</Td>
                <Td>{song.year}</Td>
                <Td>{song.genre}</Td>
                <Td>{song.duration}</Td>
                <Td>
                  <ButtonGroup>
                    <Button colorScheme="blue" size="sm">
                      Edit
                    </Button>
                    <Button colorScheme="red" size="sm">
                      Delete
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SongList;
