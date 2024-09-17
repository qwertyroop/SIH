"use client";
import React, { useState, useRef } from "react";
import {
  Search,
  Book,
  ChevronDown,
  Monitor,
  Headset,
  MapPin,
  Leaf,
  Pill,
} from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Sky } from "@react-three/drei";
import * as THREE from "three";
import Link from "next/link";
import Image from "next/image";
import { FlipWordsDemo } from "./hero-words";
import { FloatingDockDemo } from "@/components/dock";
type TabKey = "3D Models" | "Videos" | "Images" | "Audio Guides";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("3D Models");

  const tabContent: Record<
    TabKey,
    { title: string; description: string; image: string }
  > = {
    "3D Models": {
      title: "Interactive 3D Models",
      description:
        "Explore detailed, rotatable 3D models of medicinal plants. Zoom in to examine specific parts and features.",
      image: "/placeholder.svg?height=200&width=300",
    },
    Videos: {
      title: "Educational Videos",
      description:
        "Watch expert-led videos on plant identification, cultivation, and medicinal preparations.",
      image: "/placeholder.svg?height=200&width=300",
    },
    Images: {
      title: "High-Resolution Images",
      description:
        "Browse through our extensive gallery of plant photographs, including close-ups of leaves, flowers, and roots.",
      image: "/placeholder.svg?height=200&width=300",
    },
    "Audio Guides": {
      title: "Informative Audio Tours",
      description:
        "Listen to narrated guides about each plant's history, traditional uses, and modern applications.",
      image: "/placeholder.svg?height=200&width=300",
    },
  };

  return (
    <div className="bg-white min-h-screen text-white font-sans overflow-x-hidden">
      {/* Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="IsoEnergy Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="text-xl font-semibold text-gray-900">
              isoEnergy
            </span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-900">
              Home
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              Energy System
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              Topics
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              Countries
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              Data
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              Reports
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              Contact
            </a>
          </nav>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Subscribe
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-lg overflow-hidden mb-4 ">
          

          <p className="text-[#508023] text-center font-bold text-2xl -mb-8">
            AYUSH
          </p>
          <FlipWordsDemo />
          <p className="text-gray-600 text-center mb-1">
            Virtual Herbal Garden, Now in the Browser.
          </p>
          <center>
            <Image
              src="/plant1.png"
              alt="Bio Energy Landscape"
              width={1000}
              height={800}
              className="w-1/2 z-50"
            />
          </center>
        </div>
        <FloatingDockDemo />
      </main>
      <h1 className="text-[5rem] font-bold text-black  text-center">
            FEATURES
          </h1>
      {/* Features Section */}
      <div className="mt-20 px-10">
        <h2 className="text-3xl font-bold mb-6">Explore Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#2a3e2e] p-6 rounded-3xl">
            <Leaf className="w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold mb-2">3D Plant Models</h3>
            <p className="opacity-70">
              Interact with detailed 3D models of medicinal plants.
            </p>
          </div>
          <div className="bg-[#2a3e2e] p-6 rounded-3xl">
            <MapPin className="w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold mb-2">Map Integration</h3>
            <p className="opacity-70">
              Discover where each plant naturally grows and is cultivated.
            </p>
          </div>
          <div className="bg-[#2a3e2e] p-6 rounded-3xl">
            <Pill className="w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold mb-2">Medicinal Uses</h3>
            <p className="opacity-70">
              Learn about traditional and modern medicinal applications.
            </p>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="mt-20 px-10">
        <div className="flex space-x-4 mb-6">
          {Object.keys(tabContent).map((tab) => (
            <button
              key={tab}
              type="button"
              className={`px-4 py-2 rounded-full ${
                activeTab === tab ? "bg-[#2a3e2e] text-white" : "text-white"
              }`}
              onClick={() => setActiveTab(tab as TabKey)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="bg-[#2a3e2e] p-6 rounded-3xl">
          <h3 className="text-2xl font-bold mb-2">
            {tabContent[activeTab].title}
          </h3>
          <p className="max-w-xl opacity-70 mb-4">
            {tabContent[activeTab].description}
          </p>
          <img
            src={tabContent[activeTab].image}
            alt={tabContent[activeTab].title}
            className="w-full h-64 object-cover rounded-xl"
          />
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="mt-20 px-10">
        <h2 className="text-3xl font-bold mb-6">Plant Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#2a3e2e] p-6 rounded-3xl">
            <h3 className="text-xl font-bold mb-2">Traditional Medicine</h3>
            <p className="opacity-70">
              Discover how plants have been used in traditional healing
              practices across cultures.
            </p>
          </div>
          <div className="bg-[#2a3e2e] p-6 rounded-3xl">
            <h3 className="text-xl font-bold mb-2">Modern Pharmaceuticals</h3>
            <p className="opacity-70">
              Learn about plants that are sources for modern medicine and drug
              development.
            </p>
          </div>
          <div className="bg-[#2a3e2e] p-6 rounded-3xl">
            <h3 className="text-xl font-bold mb-2">Herbal Remedies</h3>
            <p className="opacity-70">
              Explore how to prepare and use herbal remedies for common
              ailments.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-20 px-10 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Start Your Herbal Journey Today
        </h2>
        <p className="max-w-2xl mx-auto mb-8 opacity-70">
          Whether you're a student, practitioner, or enthusiast, our platform
          offers a wealth of knowledge about medicinal plants. Begin exploring
          our extensive library now.
        </p>
        <button
          type="button"
          className="bg-white text-[#1a2e1e] px-8 py-3 rounded-full text-lg font-bold"
        >
          Explore the Library
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-20 bg-[#2a3e2e] py-10">
        <div className="container mx-auto px-10 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold mb-2">Medicinal Plant Explorer</h3>
            <p className="opacity-70">
              Empowering herbal knowledge through technology
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-green-300">
              About Us
            </a>
            <a href="#" className="hover:text-green-300">
              Contact
            </a>
            <a href="#" className="hover:text-green-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-green-300">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function RotatingForest() {
  const forestRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (forestRef.current) {
      forestRef.current.rotation.y += 0.001; // Slow rotation
    }
  });

  return <group ref={forestRef}></group>;
}
