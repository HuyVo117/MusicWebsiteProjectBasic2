import React from "react";
import Sidebar from "../components/Sidebar";
import { Box } from "@chakra-ui/react";
import image from "../assets/Pictures/0c1f51cf62b4a54f6b80e5a29224390f-removebg-preview.png";
import PlaylistView from "../components/PlaylistView/PlaylistView";
import Navbar from "../components/Navbar";
import UserView from "@/components/UserView";

const soundboxPlaylistData = [
  {
    title: "Peaceful Piano",
    description: "Lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
  {
    title: "Huy",
    description: "Lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
  {
    title: "Tien",
    description: "Lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
  {
    title: "Thuan",
    description: "Lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
  {
    title: "Hoa",
    description: "Lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
];

const focusCardData = [
  {
    title: "Peaceful Piano",
    description: "Lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
  {
    title: "Huy",
    description: "Lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
  {
    title: "Tien",
    description: "Lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
  {
    title: "Thuan",
    description: "Lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
  {
    title: "Hoa",
    description: "Lorem ipsum dolor sit amet consectetur",
    imgUrl: image,
  },
];

const menuItemsLeft = [
  { label: "Home", uri: "/" },
  { label: "Feed", uri: "/feed" },
  { label: "Trending", uri: "/trending" },
  { label: "Upload", uri: "/upload" },
  { label: "Premium", uri: "/payment" },
  { label: "Store", uri: "/store" },
];

const HomePage = () => {
  return (
    <div
      className="transform"
      sx={{
        transform: "scale(1.0)", // Giữ nguyên kích thước gốc
        transformOrigin: "0 0",
        overflow: "hidden",
      }}
    >
      <Navbar menuItemsLeft={menuItemsLeft} />
      <Box display="flex" minHeight="100vh" position={"relative"}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <Box flex="1" display="flex" flexDirection="column" overflowY="auto">
          {/* Playlist Views */}
          <Box p={4} className="content">
            <PlaylistView
              titleText="Recently Played"
              cardsData={focusCardData}
            />
            <PlaylistView
              titleText="More of what you like"
              cardsData={soundboxPlaylistData}
            />
            <UserView titleText="Artists you should know" />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;
