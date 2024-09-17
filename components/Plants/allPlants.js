import React from 'react'
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

export function AloveraPlant(props) {
    const { nodes, materials } = useGLTF('/alovera.glb')
    return (
        <group {...props} dispose={null}>
            <group position={[0.431, 1.204, -0.404]} rotation={[0.044, 0, 0.067]} scale={0.863}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Model_material1_0_1.geometry}
                    material={materials.material1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Model_material1_0_2.geometry}
                    material={materials.material0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Model_material1_0_3.geometry}
                    material={materials.material2}
                />
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_5.geometry}
                material={materials.material}
                position={[0.021, 0.114, 0.245]}
                rotation={[Math.PI / 2, 0, -0.044]}
                scale={[-0.062, 0.062, 0.062]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_6.geometry}
                material={materials.material_1}
                position={[0.021, 0.114, 0.245]}
                rotation={[Math.PI / 2, 0, -0.044]}
                scale={[-0.056, 0.056, 0.056]}
            />
        </group>
    )
}


export function PinePlant(props) {
    const { nodes, materials } = useGLTF('/pine.glb')
    return (
        <group {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={1.168}>
                <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                    <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.tree_Material002_0.geometry}
                            material={materials['Material.002']}
                            position={[-0.034, 0.541, 0.789]}
                            scale={0.589}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.leaves_Material001_0.geometry}
                            material={materials['Material.001']}
                            position={[-0.034, 0.541, 0.789]}
                            scale={0.589}
                        />
                    </group>
                </group>
            </group>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={1.168}>
                <group rotation={[Math.PI / 2, 0, 0]}>
                    <group position={[0.004, 0, -0.006]} scale={1.849}>
                        <group
                            position={[0.009, 0.062, 0.136]}
                            rotation={[-Math.PI / 2, 0, 0.044]}
                            scale={-0.01}>
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Object_5.geometry}
                                material={materials.material}
                                scale={3.002}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Object_6.geometry}
                                material={materials.material_1}
                                scale={3.002}
                            />
                        </group>
                    </group>
                </group>
            </group>
        </group>
    )
}

export function TulsiPlant(props) {
    const { nodes, materials } = useGLTF('/tulsi.glb')
    return (
        <group {...props} dispose={null}>
            <group
                position={[0.00913, 0.0616, 0.13645]}
                rotation={[-Math.PI / 2, 0, 0.04363]}
                scale={-0.01036}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_5.geometry}
                    material={materials.material}
                    position={[-23.58031, -66.98598, -2.82127]}
                    scale={3.00215}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_6.geometry}
                    material={materials.material_1}
                    position={[-23.58031, -66.98598, -2.82127]}
                    scale={3.00215}
                />
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_4.geometry}
                material={materials.nettle_plant}
                position={[0.21028, 0.41342, -0.88261]}
                scale={7.60257}
            />
        </group>
    )
}


export function Oak(props) {
    const { nodes, materials } = useGLTF('/Oak.glb')
    return (
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_11.geometry}
          material={materials.bark}
          position={[0, 0, 125.087]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1, 1, 1.137]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_13.geometry}
          material={materials.foliage}
          position={[0, 0, 125.087]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5002.geometry}
          material={materials['material.002']}
          position={[-0.883, -1.791, 133.578]}
          rotation={[Math.PI / 2, 0, -0.044]}
          scale={[-0.58, 0.58, 0.58]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_6.geometry}
          material={materials['material_1.002']}
          position={[-0.883, -1.791, 133.578]}
          rotation={[Math.PI / 2, 0, -0.044]}
          scale={[-0.58, 0.58, 0.58]}
        />
      </group>
    )
  }
  
  export function Model(props) {
    const { nodes, materials } = useGLTF('/compressed.glb')
    return (
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_Material002_0.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_Material003_0.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_Material004_0.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_Material001_0.geometry}
          material={materials['Material.003']}
          position={[-0.019, 0.972, -0.011]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.096}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials['material.001']}
          position={[0.006, 0.1, 0.269]}
          rotation={[Math.PI / 2, 0, -0.044]}
          scale={[-0.019, 0.019, 0.019]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_6.geometry}
          material={materials['material_1.001']}
          position={[0.006, 0.1, 0.269]}
          rotation={[Math.PI / 2, 0, -0.044]}
          scale={[-0.019, 0.019, 0.019]}
        />
      </group>
    )
  }

useGLTF.preload('/bananaPlant.glb')
useGLTF.preload('/tulsi.glb')
useGLTF.preload('/Oak.glb')
useGLTF.preload('/alovera.glb')
useGLTF.preload('/pine.glb')

