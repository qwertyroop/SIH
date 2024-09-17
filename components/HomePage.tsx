"use client";

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import {
  Search,
  Leaf,
  Apple,
  Flower2,
  Wheat,
  Sprout,
  Sun,
  Moon,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import * as Plants from "@/components/Plants/allPlants";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/map/map"), { ssr: false });

interface Plant {
  id: number;
  name: string;
  category: string;
  icon: React.ComponentType<any>;
  description: string;
  nativeHabitat: string;
  images: string[];
}

const mockPlants: Plant[] = [
  {
    id: 1,
    name: "Banana",
    category: "Fruit",
    icon: Apple,
    description:
      "A tropical fruit known for its curved shape and yellow peel. Rich in potassium and vitamins.",
    nativeHabitat: "Tropical regions of Southeast Asia",
    images: [
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
    ],
  },
  {
    id: 2,
    name: "Alovera",
    category: "Herb",
    icon: Sprout,
    description:
      "A daisy-like plant known for its calming properties. Often used in teas and aromatherapy.",
    nativeHabitat: "Europe and Western Asia",
    images: [
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
    ],
  },
  {
    id: 3,
    name: "Pine",
    category: "Herb",
    icon: Sprout,
    description:
      "A daisy-like plant known for its calming properties. Often used in teas and aromatherapy.",
    nativeHabitat: "Europe and Western Asia",
    images: [
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
    ],
  },
  {
    id: 4,
    name: "Tulsi",
    category: "Herb",
    icon: Sprout,
    description:
      "A daisy-like plant known for its calming properties. Often used in teas and aromatherapy.",
    nativeHabitat: "Europe and Western Asia",
    images: [
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
    ],
  },
  {
    id: 5,
    name: "Oak",
    category: "Herb",
    icon: Sprout,
    description:
      "A daisy-like plant known for its calming properties. Often used in teas and aromatherapy.",
    nativeHabitat: "Europe and Western Asia",
    images: [
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
    ],
  },
];

const plantComponents: { [key: string]: React.ComponentType<any> } = {
  Banana: Plants.BananaPlant,
  Alovera: Plants.AloveraPlant,
  Pine: Plants.PinePlant,
  Tulsi: Plants.TulsiPlant,
  Oak : Plants.Oak,

};

function PlantModel({
  plantName,
  zoom,
  rotation,
}: {
  plantName: string;
  zoom: number;
  rotation: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (camera) {
      camera.position.z = 5 / zoom;
    }
  }, [zoom, camera]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotation * 0.01;
    }
  });

  const PlantComponent = plantComponents[plantName];

  return <group ref={groupRef}>{PlantComponent && <PlantComponent />}</group>;
}

export default function HerbalPlantExplorer() {
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(
    mockPlants.find((plant) => plant.name === "Banana") || null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [modelViewHeight, setModelViewHeight] = useState(75); // Initial height percentage
  const [isDragging, setIsDragging] = useState(false);

  const filteredPlants = mockPlants.filter(
    (plant) =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const containerHeight = e.currentTarget.clientHeight;
      const newHeight = (e.clientY / containerHeight) * 100;
      setModelViewHeight(Math.min(Math.max(newHeight, 20), 80)); // Limit between 20% and 80%
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  return (
    <div className="flex h-screen bg-green-50 text-green-900 overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/5 bg-green-100 shadow-lg overflow-hidden flex flex-col">
        <div className="p-6 bg-green-200">
          <h2 className="text-2xl font-bold text-green-800 flex items-center mb-6">
            <Leaf className="mr-2 h-6 w-6 text-green-600" />
            Herbal Plants
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
            <Input
              type="text"
              placeholder="Search plants..."
              className="w-full pl-10 pr-4 py-2 rounded-full border-green-300 bg-white focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="flex-grow">
          <div className="p-6 pt-4">
            {filteredPlants.map((plant) => {
              const IconComponent = plant.icon;
              return (
                <button
                  key={plant.id}
                  type="button"
                  className={`w-full text-left p-3 rounded-lg mb-2 transition-colors flex items-center
                              ${
                                selectedPlant?.id === plant.id
                                  ? "bg-green-200 text-green-800"
                                  : "hover:bg-green-200 text-green-700"
                              }`}
                  onClick={() => setSelectedPlant(plant)}
                >
                  <IconComponent
                    className={`mr-3 h-5 w-5 ${
                      selectedPlant?.id === plant.id
                        ? "text-green-600"
                        : "text-green-500"
                    }`}
                  />
                  <div>
                    <div className="font-medium">{plant.name}</div>
                    <div className="text-sm text-green-600">
                      {plant.category}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content Area */}
      <div
        className="w-4/5 flex flex-col relative"
        onMouseMove={handleMouseMove}
      >
        {/* Upper half for 3D model view */}
        <div
          className="border-b border-green-200 flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-green-50 relative"
          style={{ height: `${modelViewHeight}%` }}
        >
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <OrbitControls />
            <Environment preset={"forest"} background />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            {selectedPlant && (
              <PlantModel
                plantName={selectedPlant.name}
                zoom={zoom}
                rotation={rotation}
              />
            )}
          </Canvas>
          <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-4">
            <Button
              variant="outline"
              className="bg-white"
              size="icon"
              onClick={() => setZoom(Math.min(zoom + 0.1, 2))}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="bg-white"
              size="icon"
              onClick={() => setZoom(Math.max(zoom - 0.1, 0.5))}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Slider
              value={[rotation]}
              onValueChange={([value]) => setRotation(value)}
              max={10}
              step={0.1}
              className="w-32"
            />
            <Button
              variant="outline"
              className="bg-white"
              size="icon"
              onClick={() => setRotation(0)}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Draggable divider */}
        <div
          className="h-2 bg-green-200 cursor-ns-resize flex items-center justify-center"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <div className="w-10 h-1 bg-green-400 rounded-full"></div>
        </div>

        {/* Lower half for plant details and map */}
        <ScrollArea
          className="bg-white flex-grow p-10"
          style={{ height: `calc(${100 - modelViewHeight}% - 0.5rem)` }}
        >
          <div className="p-6">
            {selectedPlant ? (
              <div>
                <h2 className="text-3xl font-bold mb-4 text-green-800">
                  {selectedPlant.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-green-700">
                      Details
                    </h3>
                    <p className="text-green-600">
                      {selectedPlant.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-green-700">
                      Native Habitat
                    </h3>
                    <p className="text-green-600">
                      {selectedPlant.nativeHabitat}
                    </p>
                    <div className="mt-5 bg-green-50 h-40 flex items-center justify-center rounded-md border border-green-200">
                      <Map />
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-2 text-green-700">
                    Gallery
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {selectedPlant.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${selectedPlant.name} image ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-md border border-green-200"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-green-600 flex flex-col items-center justify-center h-full">
                <Leaf className="h-16 w-16 mb-4 text-green-400" />
                <p className="text-xl">Select a plant to view details</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
