import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { ArrowLeft, ArrowRight, Play, Search, Settings } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import LoggedInContainer from "@/containers/LoggedInContainer";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Line,
  LineChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import p1 from "../assets/Pictures/708a320ec3182cd3a629e98808e73fb5_2744128242798474951-removebg-preview.png";

const menuItemsLeft = [
  { label: "Home", uri: "/" },
  { label: "Feed", uri: "/feed" },
  { label: "Trending", uri: "/trending" },
  { label: "Upload", uri: "/upload" },
  { label: "Premium", uri: "/payment" },
];

// Dữ liệu xếp hạng bài hát giả
const rankingData = [
  { time: "15:00", song1: 80, song2: 40, song3: 30 },
  { time: "17:00", song1: 75, song2: 45, song3: 35 },
  { time: "19:00", song1: 70, song2: 42, song3: 32 },
  { time: "21:00", song1: 65, song2: 38, song3: 28 },
  { time: "23:00", song1: 72, song2: 40, song3: 30 },
  { time: "01:00", song1: 85, song2: 45, song3: 35 },
  { time: "03:00", song1: 95, song2: 50, song3: 40 },
  { time: "05:00", song1: 90, song2: 48, song3: 38 },
  { time: "07:00", song1: 85, song2: 46, song3: 36 },
  { time: "09:00", song1: 88, song2: 47, song3: 37 },
  { time: "11:00", song1: 82, song2: 44, song3: 34 },
  { time: "13:00", song1: 85, song2: 45, song3: 35 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-[#34224F] p-3 shadow-lg border border-white/10">
        <div className="flex items-center gap-2">
          <img src={p1} alt="Song thumbnail" className="w-10 h-10 rounded" />
          <div>
            <p className="font-medium text-white">{payload[0].value}%</p>
            <p className="text-sm text-gray-400">{label}</p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function TrendingPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMouseEnter = (data, index) => {
    setActiveIndex(index);
  };

  // Dữ liệu giả cho danh sách bài hát
  const songs = [
    { title: "Song 1", artist: "Artist 1", duration: "03:45" },
    { title: "Song 2", artist: "Artist 2", duration: "04:00" },
    { title: "Song 3", artist: "Artist 3", duration: "03:30" },
    { title: "Song 4", artist: "Artist 4", duration: "04:20" },
    { title: "Song 5", artist: "Artist 5", duration: "03:50" },
  ];

  // Dữ liệu giả cho bảng xếp hạng tuần
  const regions = [
    { region: "Việt Nam", songs: songs },
    { region: "US-UK", songs: songs },
    { region: "K-Pop", songs: songs },
  ];

  return (
    <div className="min-h-screen bg-[#170f23] text-gray">
      {/* Chart Section */}
      <LoggedInContainer>
        <div className="p-8">
          <div className="flex items-center gap-4 mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
              SoundBox
            </h1>
            <Button
              size="icon"
              className="rounded-full bg-[#9b4de0] hover:bg-[#9b4de0]/90"
            >
              <Play className="h-4 w-4" />
            </Button>
          </div>

          {/* Chart */}
          <Card className="w-full bg-[#2f2739]/50 mb-8">
            <CardContent className="p-6">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={rankingData}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    onMouseLeave={() => setActiveIndex(0)}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={true}
                      vertical={false}
                      stroke="rgba(255,255,255,0.1)"
                    />
                    <XAxis
                      dataKey="time"
                      stroke="#9CA3AF"
                      tick={{ fill: "#9CA3AF" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis hide={true} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="linear"
                      dataKey="song1"
                      stroke="hsl(217, 91%, 60%)"
                      strokeWidth={2}
                      dot={(props) => {
                        const { cx, cy, index } = props;
                        return (
                          <circle
                            cx={cx}
                            cy={cy}
                            r={index === activeIndex ? 6 : 4}
                            stroke="hsl(217, 91%, 60%)"
                            strokeWidth={2}
                            fill="#170f23"
                          />
                        );
                      }}
                      activeDot={false}
                      onMouseEnter={handleMouseEnter}
                    />
                    <Line
                      type="monotone"
                      dataKey="song2"
                      stroke="hsl(142, 71%, 45%)"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="song3"
                      stroke="hsl(0, 84%, 60%)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Song List */}
          <div className="space-y-4">
            {songs.map((song, index) => (
              <Card key={index} className="bg-[#2f2739]/50 hover:bg-[#2f2739]">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold text-gray-400 w-8">
                      {index + 1}
                    </span>
                    <div className="w-10 h-10">
                      <img
                        src={p1}
                        alt="Song thumbnail"
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{song.title}</h3>
                      <p className="text-sm text-gray-400">{song.artist}</p>
                    </div>
                    <span className="text-sm text-gray-400">
                      {song.duration}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Weekly Rankings */}
        <div className="p-8 bg-[#2f2739]/30">
          <h2 className="text-2xl font-bold mb-6">Bảng Xếp Hạng Tuần</h2>
          <div className="grid grid-cols-3 gap-6">
            {regions.map((region) => (
              <Card key={region.region} className="bg-[#2f2739]/50">
                <CardContent className="p-4">
                  <CardHeader>
                    <CardTitle>{region.region}</CardTitle>
                  </CardHeader>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Song</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {region.songs.map((song, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{song.title}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </LoggedInContainer>
    </div>
  );
}
