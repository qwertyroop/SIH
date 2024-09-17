"use client"
import { useState } from 'react'
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { BananaPlant } from '@/components/Plants/banana'

const mockPlants = [
  { id: 1, name: 'Chamomile' },
  { id: 2, name: 'Lavender' },
  { id: 3, name: 'Peppermint' },
  { id: 4, name: 'Echinacea' },
  { id: 5, name: 'Ginger' },
  { id: 6, name: 'Aloe Vera' },
  { id: 7, name: 'Turmeric' },
  { id: 8, name: 'Ginseng' },
  { id: 9, name: 'Banana' }, // Add Banana to the mockPlants
]

export default function HerbalPlantExplorer() {
  const [selectedPlant, setSelectedPlant] = useState<null | { id: number; name: string; }>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <div 
        className={`bg-gray-200 transition-all duration-300 ease-in-out overflow-hidden flex flex-col
                    ${isSidebarOpen ? 'w-64' : 'w-0'}`}
      >
        <div className="p-4 flex-shrink-0">
          <div className="flex items-center mb-4">
            <Input type="text" placeholder="Search plants..." className="w-full bg-white" />
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 bg-gray-300 hover:bg-gray-400 transition-colors"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" className="w-full flex items-center justify-center bg-white">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
        </div>
        <ScrollArea className="flex-grow">
          <div className="p-4 pt-0">
            {mockPlants.map((plant) => (
              <button
                key={plant.id}
                className={`w-full text-left p-2 rounded-md mb-2 transition-colors
                            ${selectedPlant?.id === plant.id 
                              ? 'bg-gray-300 text-gray-900' 
                              : 'hover:bg-gray-300 text-gray-700'}`}
                onClick={() => setSelectedPlant(plant)}
              >
                {plant.name}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col">
        {/* Toggle Sidebar Button (visible when sidebar is closed) */}
        {!isSidebarOpen && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 z-10 bg-gray-300 hover:bg-gray-400 transition-colors"
            onClick={() => setIsSidebarOpen(true)}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}

        {/* Upper half for 3D model view */}
        <div className="h-1/2 border-b border-gray-300 p-4 flex items-center justify-center bg-white">
          <Canvas>
            <OrbitControls />
            <Environment preset="forest" />
            <ambientLight />
            {/* Only render BananaPlant if the selected plant is Banana */}
            {selectedPlant?.name === 'Banana' && <BananaPlant />}
          </Canvas>
        </div>

        {/* Lower half for plant details and map */}
        <ScrollArea className="h-1/2 bg-gray-50">
          <div className="p-6">
            {selectedPlant ? (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">{selectedPlant.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Details</h3>
                    <p className="text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, 
                      molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet 
                      arcu vestibulum accumsan in in leo.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Location</h3>
                    <div className="bg-white h-40 flex items-center justify-center rounded-md border border-gray-300">
                      <p className="text-gray-500">Map Placeholder</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">Images</h3>
                  <div className="flex flex-wrap gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-24 h-24 bg-white rounded-md flex items-center justify-center border border-gray-300">
                        <p className="text-gray-500">Image {i}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">Select a plant to view details</p>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
