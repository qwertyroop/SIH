import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function BananaPlant(props) {
  const { nodes, materials } = useGLTF('/bananaPlant.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[0, 0, 0]} scale={2.5}>
        <group
          position={[0, -0.2, 0.25]} 
          rotation={[Math.PI / 2, 0, -0.044]}
          scale={[-0.02, 0.02, 0.02]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_5.geometry}
            material={materials.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_6.geometry}
            material={materials.material_1}
          />
        </group>
        <group
          position={[-0.03, 0.7, -0.07]} 
          rotation={[1.378, -0.045, 1.897]}
          scale={[-0.034, 0.034, 0.034]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_8.geometry}
            material={materials.material_2}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_9.geometry}
            material={materials.material_3}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_10.geometry}
            material={materials.material_4}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/bananaPlant.glb')