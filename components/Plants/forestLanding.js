import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Forest(props) {
  const { nodes, materials } = useGLTF('/forest.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ForestGround001.geometry}
        material={materials.Textures}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Bushes001.geometry}
          material={materials.Textures}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Rocks001.geometry}
          material={materials.Textures}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Trees001.geometry}
          material={materials.Textures}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Water001.geometry}
          material={materials.Textures}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('/forest.glb')
