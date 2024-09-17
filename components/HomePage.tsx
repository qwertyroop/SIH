"use client";

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import {
  Search,
  Leaf,
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
  botanicalName: string;
  commonNames: string;
  methodOfCultivation: string;
  category: string;
  description: string;
  nativeHabitat: string;
  medicinalUsage: string;
  images: string[];
}

const mockPlants: Plant[] = [
  {
    id: 1,
    name: "Banana",
    botanicalName: "Musa acuminata",
    commonNames: "Plantain, Cavendish",
    methodOfCultivation: "Propagated through suckers or corms, thrives in warm, humid climates",
    category: "Fruit",
    description: "A tropical fruit known for its curved shape and yellow peel. Rich in potassium and vitamins.",
    nativeHabitat: "Tropical regions of Southeast Asia",
    medicinalUsage: "Used in traditional medicine for digestive issues and skin health (limited evidence)",
    images: [
      "https://unsplash.com/photos/image-of-banana-plant",
      "https://unsplash.com/photos/image-of-ripe-banana",
      "https://unsplash.com/photos/image-of-banana-peel"
    ],
  },
  {
    id: 2,
    name: "Aloe Vera",
    botanicalName: "Aloe barbadensis miller",
    commonNames: "None",
    methodOfCultivation: "Propagated through pups or offsets, thrives in hot, dry climates with good drainage",
    category: "Succulent",
    description: "A succulent plant known for its medicinal properties. Often used for skin care and wound healing.",
    nativeHabitat: "Arabian Peninsula",
    medicinalUsage: "Widely used for topical application to soothe burns, sunburns, and minor skin irritations (extensive research)",
    images: [
      "https://unsplash.com/photos/image-of-aloe-vera-plant",
      "https://unsplash.com/photos/image-of-aloe-vera-gel",
      "https://unsplash.com/photos/image-of-aloe-vera-leaves"
    ],
  },
  {
    id: 3,
    name: "Pine",
    botanicalName: "Pinus spp.",
    commonNames: "Scots pine, Lodgepole pine, White pine",
    methodOfCultivation: "Propagated through seeds, requires well-drained soil and full sun",
    category: "Tree",
    description: "A coniferous evergreen tree known for its tall stature and needle-like leaves. Often used for lumber and paper production.",
    nativeHabitat: "Temperate regions of the Northern Hemisphere",
    medicinalUsage: "Limited medicinal use, some pine species have potential respiratory benefits (ongoing research)",
    images: [
      "https://unsplash.com/photos/image-of-pine-forest",
      "https://unsplash.com/photos/image-of-pine-cone",
      "https://unsplash.com/photos/image-of-pine-needle"
    ],
  },
  {
    id: 4,
    name: "Tulsi",
    botanicalName: "Ocimum tenuiflorum",
    commonNames: "Holy basil",
    methodOfCultivation: "Propagated through seeds or cuttings, prefers warm climates with moderate watering",
    category: "Herb",
    description: "A sacred plant in Hinduism, known for its medicinal properties and aromatic leaves. Often used in teas and Ayurvedic medicine.",
    nativeHabitat: "Indian subcontinent",
    medicinalUsage: "Used in Ayurvedic medicine for various ailments, potential benefits for stress, anxiety, and blood sugar control (ongoing research)",
    images: [
      "https://unsplash.com/photos/image-of-tulsi-plant",
      "https://unsplash.com/photos/image-of-tulsi-leaves",
      "https://unsplash.com/photos/image-of-tulsi-flowers"
    ],
  },
  {
    id: 5,
    name: "Oak",
    botanicalName: "Quercus spp.",
    commonNames: "Red oak, White oak, Live oak",
    methodOfCultivation: "Propagated through acorns, requires well-drained soil and full sun",
    category: "Tree",
    description: "A deciduous tree known for its strong, durable wood. Often used in construction and furniture making.",
    nativeHabitat: "Temperate regions of the Northern Hemisphere",
    medicinalUsage: "Limited medicinal use, some oak species have potential astringent properties (limited research)",
    images: [
      "https://unsplash.com/photos/image-of-oak-tree",
      "https://unsplash.com/photos/image-of-oak-leaves",
      "https://unsplash.com/photos/image-of-oak-acorn"
    ],
  },
];

const plantComponents: { [key: string]: React.ComponentType<any> } = {
  Banana: Plants.BananaPlant,
  Alovera: Plants.AloveraPlant,
  Pine: Plants.PinePlant,
  Tulsi: Plants.TulsiPlant,
  Oak : Plants.Oak,
  Bacopa: Plants.Bacopa,
  Basill: Plants.Basill,
  Fatboi: Plants.Fatboi,
  KingOfBitters : Plants.KingOfBitters,
  LantanaBloussum : Plants.LantanaBloussum,
  Poovarshu : Plants.Poovarshu,
  Thumba : Plants.Thumba,
  WithaniaSomnifera: Plants.WithaniaSomnifera,

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
  const [modelViewHeight, setModelViewHeight] = useState(75); 
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
    <div className="flex h-screen bg-white text-black overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/5 bg-white shadow-lg overflow-hidden flex flex-col">
        <div className="p-6 bg-white">
          <h2 className="text-2xl font-bold text-black flex items-center mb-6">
            <Leaf className="mr-2 h-6 w-6 text-black" />
            AYUSH
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
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
              
              return (
                <button
                  key={plant.id}
                  type="button"
                  className={`w-full text-left p-3 rounded-lg mb-2 transition-colors flex items-center
                              ${
                                selectedPlant?.id === plant.id
                                  ? "bg-white text-black"
                                  : "hover:bg-green-200 text-black"
                              }`}
                  onClick={() => setSelectedPlant(plant)}
                >
                  
                  <div>
                    <div className="font-medium">{plant.name}</div>
                    <div className="text-sm text-black">
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
          className="h-2 bg-black cursor-ns-resize flex items-center justify-center"
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
