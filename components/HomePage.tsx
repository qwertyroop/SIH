"use client";

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import {
  Search,
  Leaf,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Menu,
  ChevronDown,
  ChevronUp,
  X,
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
import Link from "next/link";

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
  tag: string[];
}

const mockPlants: Plant[] = [
  {
    id: 1,
    name: "Withania Somnifera",
    botanicalName: "Withania somnifera",
    commonNames: "Ashwagandha, Indian ginseng",
    methodOfCultivation:
      "Propagated through seeds, thrives in dry and sunny climates",
    category: "Herb",
    description:
      "An herb commonly used in traditional Indian medicine, known for its adaptogenic properties.",
    nativeHabitat: "Indian subcontinent, North Africa, and the Middle East",
    medicinalUsage:
      "Used to reduce stress, anxiety, and improve concentration (extensive research)",
    images: [
      "https://unsplash.com/photos/image-of-ashwagandha-plant",
      "https://unsplash.com/photos/image-of-ashwagandha-root",
      "https://unsplash.com/photos/image-of-ashwagandha-powder",
    ],
    tag: ["stress relief", "anxiety", "cognitive health"],
  },
  {
    id: 2,
    name: "Thumba",
    botanicalName: "Leucas aspera",
    commonNames: "Thumba, Thumba plant",
    methodOfCultivation: "Propagated through seeds, grows well in sandy soils",
    category: "Herb",
    description:
      "A small herb with medicinal properties, often used in Ayurvedic treatments.",
    nativeHabitat: "Indian subcontinent",
    medicinalUsage:
      "Used for respiratory ailments and skin conditions (limited evidence)",
    images: [
      "https://unsplash.com/photos/image-of-thumba-plant",
      "https://unsplash.com/photos/image-of-thumba-flowers",
      "https://unsplash.com/photos/image-of-thumba-leaves",
    ],
    tag: ["respiratory health", "skin care"],
  },
  {
    id: 3,
    name: "Poovarshu",
    botanicalName: "Melia dubia",
    commonNames: "Malai Vembu, Poovarasu",
    methodOfCultivation:
      "Propagated through seeds, thrives in well-drained soil with good sunlight",
    category: "Tree",
    description: "A fast-growing tree used for timber and bioenergy.",
    nativeHabitat: "Indian subcontinent",
    medicinalUsage:
      "Potential for medicinal use in Ayurveda (limited research)",
    images: [
      "https://unsplash.com/photos/image-of-poovarasu-plant",
      "https://unsplash.com/photos/image-of-poovarasu-leaves",
      "https://unsplash.com/photos/image-of-poovarasu-tree",
    ],
    tag: ["Ayurvedic medicine"],
  },
  {
    id: 4,
    name: "Lantana Bloussum",
    botanicalName: "Lantana camara",
    commonNames: "Wild sage, Lantana",
    methodOfCultivation:
      "Propagated through seeds and cuttings, can grow in a variety of soils",
    category: "Shrub",
    description: "A colorful flowering shrub, often used in landscaping.",
    nativeHabitat: "Tropical regions of the Americas",
    medicinalUsage:
      "Some use in traditional medicine for skin and respiratory issues (limited evidence)",
    images: [
      "https://unsplash.com/photos/image-of-lantana-bloussum",
      "https://unsplash.com/photos/image-of-lantana-flowers",
      "https://unsplash.com/photos/image-of-lantana-leaves",
    ],
    tag: ["skin care", "respiratory health"],
  },
  {
    id: 5,
    name: "King of Bitters",
    botanicalName: "Andrographis paniculata",
    commonNames: "Kalmegh",
    methodOfCultivation:
      "Propagated through seeds, prefers sunny areas with well-drained soil",
    category: "Herb",
    description:
      "A medicinal herb used in Ayurveda for its bitter taste and potential health benefits.",
    nativeHabitat: "India, Sri Lanka, Southeast Asia",
    medicinalUsage:
      "Used for digestive and liver health, immunity boosting (some research)",
    images: [
      "https://unsplash.com/photos/image-of-king-of-bitters",
      "https://unsplash.com/photos/image-of-king-of-bitters-plant",
      "https://unsplash.com/photos/image-of-king-of-bitters-leaves",
    ],
    tag: ["digestive health", "liver health", "immunity"],
  },
  {
    id: 6,
    name: "Fatboi",
    botanicalName: "Opuntia ficus-indica",
    commonNames: "Prickly pear, Nopal",
    methodOfCultivation:
      "Propagated through pads or seeds, thrives in arid climates",
    category: "Succulent",
    description:
      "A drought-tolerant cactus known for its edible pads and fruit.",
    nativeHabitat: "Mexico",
    medicinalUsage:
      "Used in traditional medicine for diabetes and inflammation (ongoing research)",
    images: [
      "https://unsplash.com/photos/image-of-prickly-pear",
      "https://unsplash.com/photos/image-of-nopal-plant",
      "https://unsplash.com/photos/image-of-prickly-pear-fruit",
    ],
    tag: ["diabetes management", "anti-inflammatory"],
  },
  {
    id: 7,
    name: "Basil",
    botanicalName: "Ocimum basilicum",
    commonNames: "Sweet basil, Thai basil",
    methodOfCultivation:
      "Propagated through seeds or cuttings, prefers warm weather and well-drained soil",
    category: "Herb",
    description:
      "An aromatic herb used in various cuisines, especially in Mediterranean and Asian dishes.",
    nativeHabitat: "Tropical regions of central Africa and Southeast Asia",
    medicinalUsage:
      "Used for digestive health and stress relief (limited evidence)",
    images: [
      "https://unsplash.com/photos/image-of-basil-plant",
      "https://unsplash.com/photos/image-of-basil-leaves",
      "https://unsplash.com/photos/image-of-basil-flower",
    ],
    tag: ["digestive health", "stress relief"],
  },
  {
    id: 8,
    name: "Bacopa",
    botanicalName: "Bacopa monnieri",
    commonNames: "Water hyssop",
    methodOfCultivation:
      "Propagated through cuttings, thrives in wet soils and sunny conditions",
    category: "Herb",
    description:
      "A creeping herb with small white flowers, often used in Ayurvedic medicine.",
    nativeHabitat: "Wetlands of India and Southeast Asia",
    medicinalUsage:
      "Used to improve memory and cognitive function (some evidence)",
    images: [
      "https://unsplash.com/photos/image-of-bacopa-plant",
      "https://unsplash.com/photos/image-of-bacopa-leaves",
      "https://unsplash.com/photos/image-of-bacopa-flower",
    ],
    tag: ["cognitive health", "memory improvement"],
  },
  {
    id: 9,
    name: "Oak",
    botanicalName: "Quercus spp.",
    commonNames: "Red oak, White oak, Live oak",
    methodOfCultivation:
      "Propagated through acorns, requires well-drained soil and full sun",
    category: "Tree",
    description:
      "A deciduous tree known for its strong, durable wood. Often used in construction and furniture making.",
    nativeHabitat: "Temperate regions of the Northern Hemisphere",
    medicinalUsage:
      "Limited medicinal use, some oak species have potential astringent properties (limited research)",
    images: [
      "https://unsplash.com/photos/image-of-oak-tree",
      "https://unsplash.com/photos/image-of-oak-leaves",
      "https://unsplash.com/photos/image-of-oak-acorn",
    ],
    tag: ["astringent"],
  },
  {
    id: 10,
    name: "Tulsi",
    botanicalName: "Ocimum tenuiflorum",
    commonNames: "Holy basil",
    methodOfCultivation:
      "Propagated through seeds or cuttings, prefers warm climates with moderate watering",
    category: "Herb",
    description:
      "A sacred plant in Hinduism, known for its medicinal properties and aromatic leaves. Often used in teas and Ayurvedic medicine.",
    nativeHabitat: "Indian subcontinent",
    medicinalUsage:
      "Used in Ayurvedic medicine for various ailments, potential benefits for stress, anxiety, and blood sugar control (ongoing research)",
    images: [
      "https://unsplash.com/photos/image-of-tulsi-plant",
      "https://unsplash.com/photos/image-of-tulsi-leaves",
      "https://unsplash.com/photos/image-of-tulsi-flowers",
    ],
    tag: ["stress relief", "anxiety", "blood sugar control"],
  },
  {
    id: 11,
    name: "Pine",
    botanicalName: "Pinus spp.",
    commonNames: "Scots pine, Lodgepole pine, White pine",
    methodOfCultivation:
      "Propagated through seeds, requires well-drained soil and full sun",
    category: "Tree",
    description:
      "A coniferous evergreen tree known for its tall stature and needle-like leaves. Often used for lumber and paper production.",
    nativeHabitat: "Temperate regions of the Northern Hemisphere",
    medicinalUsage:
      "Limited medicinal use, some pine species have potential respiratory benefits (ongoing research)",
    images: [
      "https://unsplash.com/photos/image-of-pine-forest",
      "https://unsplash.com/photos/image-of-pine-cone",
      "https://unsplash.com/photos/image-of-pine-needle",
    ],
    tag: ["respiratory health"],
  },
  {
    id: 12,
    name: "Aloe Vera",
    botanicalName: "Aloe barbadensis miller",
    commonNames: "None",
    methodOfCultivation:
      "Propagated through pups or offsets, thrives in hot, dry climates with good drainage",
    category: "Succulent",
    description:
      "A succulent plant known for its medicinal properties. Often used for skin care and wound healing.",
    nativeHabitat: "Arabian Peninsula",
    medicinalUsage:
      "Widely used for topical application to soothe burns, sunburns, and minor skin irritations (extensive research)",
    images: [
      "https://unsplash.com/photos/image-of-aloe-vera-plant",
      "https://unsplash.com/photos/image-of-aloe-vera-gel",
      "https://unsplash.com/photos/image-of-aloe-vera-leaves",
    ],
    tag: ["skin care", "wound healing"],
  },
  {
    id: 13,
    name: "Banana",
    botanicalName: "Musa acuminata",
    commonNames: "Plantain, Cavendish",
    methodOfCultivation:
      "Propagated through suckers or corms, thrives in warm, humid climates",
    category: "Fruit",
    description:
      "A tropical fruit known for its curved shape and yellow peel. Rich in potassium and vitamins.",
    nativeHabitat: "Tropical regions of Southeast Asia",
    medicinalUsage:
      "Used in traditional medicine for digestive issues and skin health (limited evidence)",
    images: [
      "https://unsplash.com/photos/image-of-banana-plant",
      "https://unsplash.com/photos/image-of-ripe-banana",
      "https://unsplash.com/photos/image-of-banana-peel",
    ],
    tag: ["digestive health", "skin health"],
  },
];

const plantComponents: { [key: string]: React.ComponentType<any> } = {
  Banana: Plants.BananaPlant,
  Alovera: Plants.AloveraPlant,
  Pine: Plants.PinePlant,
  Tulsi: Plants.TulsiPlant,
  Oak: Plants.Oak,
  Bacopa: Plants.Bacopa,
  Basill: Plants.Basill,
  Fatboi: Plants.Fatboi,
  KingOfBitters: Plants.KingOfBitters,
  LantanaBloussum: Plants.LantanaBloussum,
  Poovarshu: Plants.Poovarshu,
  Thumba: Plants.Thumba,
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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [modelViewHeight, setModelViewHeight] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTagsVisible, setIsTagsVisible] = useState(false);

  const allTags = Array.from(new Set(mockPlants.flatMap((plant) => plant.tag)));

  const filteredPlants = mockPlants.filter(
    (plant) =>
      (plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedTags.length === 0 ||
        selectedTags.some((tag) => plant.tag.includes(tag)))
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const containerHeight = window.innerHeight;
      const newHeight = (e.clientY / containerHeight) * 100;
      setModelViewHeight(Math.min(Math.max(newHeight, 20), 80));
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const containerHeight = window.innerHeight;
        const newHeight = (e.clientY / containerHeight) * 100;
        setModelViewHeight(Math.min(Math.max(newHeight, 20), 80));
      }
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, [isDragging]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white text-black overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-green-100">
        <Link
          href="/"
          className="text-2xl font-bold text-black flex items-center"
        >
          <Leaf className="mr-2 h-6 w-6 text-black" />
          AYUSH
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`w-full md:w-1/4 bg-white shadow-lg overflow-hidden flex flex-col ${
          isSidebarOpen ? "fixed inset-0 z-50" : "hidden md:flex"
        }`}
      >
        <div className="p-6 bg-white">
          <Link
            href="/"
            className="text-2xl font-bold text-black flex items-center mb-6 hidden md:flex"
          >
            <Leaf className="mr-2 h-6 w-6 text-black" />
            AYUSH
          </Link>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
            <Input
              type="text"
              placeholder="Search plants..."
              className="w-full pl-10 pr-4 py-2 rounded-full border-green-300 bg-white focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Button
              onClick={() => setIsTagsVisible(!isTagsVisible)}
              className="w-full justify-between"
              variant="outline"
            >
              Filter by Tags
              {isTagsVisible ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </Button>
            {isTagsVisible && (
              <div className="mt-2 flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleTag(tag)}
                    className="text-xs"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
        <ScrollArea className="flex-grow overflow-y-auto">
          <div className="p-6 pt-4">
            {filteredPlants.map((plant) => (
              <button
                key={plant.id}
                type="button"
                className={`w-full text-left p-3 rounded-lg mb-2 transition-colors flex items-center
                            ${
                              selectedPlant?.id === plant.id
                                ? "bg-white text-black"
                                : "hover:bg-green-200 text-black"
                            }`}
                onClick={() => {
                  setSelectedPlant(plant);
                  setIsSidebarOpen(false);
                }}
              >
                <div>
                  <div className="font-medium">{plant.name}</div>
                  <div className="text-sm text-black">{plant.category}</div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content Area */}
      <div className="w-full md:w-3/4 flex flex-col relative">
        {/* Upper half for 3D model view */}
        <div
          className="border-b border-green-200 flex flex-col items-center justify-center relative rounded-xl m-2"
          style={{ height: `${modelViewHeight}%`, minHeight: "300px" }}
        >
          <Canvas className="rounded-xl mt-2">
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <OrbitControls />
            <Environment preset="forest" background />
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
          className="h-2 bg-white cursor-ns-resize flex items-center justify-center"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className="w-10 h-1 bg-black rounded-full"></div>
        </div>

        {/* Lower half for plant details and map */}
        <ScrollArea
          className="bg-white flex-grow p-4 md:p-10"
          style={{ height: `calc(${100 - modelViewHeight}% - 0.5rem)` }}
        >
          <div className="p-2 md:p-6">
            {selectedPlant ? (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-green-800">
                  {selectedPlant.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-green-700">
                      Details
                    </h3>
                    <p className="text-green-600 mb-4">
                      {selectedPlant.description}
                    </p>
                    <h3 className="text-xl font-semibold mb-2 text-green-700">
                      Botanical Name
                    </h3>
                    <p className="text-green-600 mb-4">
                      {selectedPlant.botanicalName}
                    </p>
                    <h3 className="text-xl font-semibold mb-2 text-green-700">
                      Common Names
                    </h3>
                    <p className="text-green-600 mb-4">
                      {selectedPlant.commonNames}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-green-700">
                      Native Habitat
                    </h3>
                    <p className="text-green-600 mb-4">
                      {selectedPlant.nativeHabitat}
                    </p>
                    <h3 className="text-xl font-semibold mb-2 text-green-700">
                      Method of Cultivation
                    </h3>
                    <p className="text-green-600 mb-4">
                      {selectedPlant.methodOfCultivation}
                    </p>
                    <h3 className="text-xl font-semibold mb-2 text-green-700">
                      Medicinal Usage
                    </h3>
                    <p className="text-green-600 mb-4">
                      {selectedPlant.medicinalUsage}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-2 text-green-700">
                    Native Habitat Map
                  </h3>
                  <div className="w-full h-64 md:h-96 rounded-md border border-green-200 overflow-hidden">
                    <Map selectedPlant={selectedPlant.name} />{" "}
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-2 text-green-700">
                    Gallery
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedPlant.images.map((image, index) => (
                      <img
                        key={index}
                        src={`/api/placeholder/400/300?text=Image ${index + 1}`}
                        alt={`${selectedPlant.name} image ${index + 1}`}
                        className="w-full h-auto object-cover rounded-md border border-green-200"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-green-600 flex flex-col items-center justify-center h-full">
                <Leaf className="h-16 w-6 mb-4 text-green-400" />
                <p className="text-xl">Select a plant to view details</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
