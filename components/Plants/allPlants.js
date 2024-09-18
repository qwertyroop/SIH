import React from "react";
import { useGLTF } from "@react-three/drei";

export function BananaPlant(props) {
  const { nodes, materials } = useGLTF("/bananaPlant.glb");
  return (
    <group {...props} dispose={null}>
      <group position={[0, 0, 0]} scale={2.5}>
        <group
          position={[0, -0.2, 0.25]}
          rotation={[Math.PI / 2, 0, -0.044]}
          scale={[-0.02, 0.02, 0.02]}
        >
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
          scale={[-0.034, 0.034, 0.034]}
        >
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
  );
}

export function AloeveraPlant(props) {
  const { nodes, materials } = useGLTF("/AloeVera.glb");
  return (
    <group {...props} dispose={null}>
      <group
        position={[0.431, 1.204, -0.404]}
        rotation={[0.044, 0, 0.067]}
        scale={0.863}
      >
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
  );
}

export function PinePlant(props) {
  const { nodes, materials } = useGLTF("/pine.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={1.168}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.tree_Material002_0.geometry}
              material={materials["Material.002"]}
              position={[-0.034, 0.541, 0.789]}
              scale={0.589}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.leaves_Material001_0.geometry}
              material={materials["Material.001"]}
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
              scale={-0.01}
            >
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
  );
}

export function TulsiPlant(props) {
  const { nodes, materials } = useGLTF("/tulsi.glb");
  return (
    <group {...props} dispose={null}>
      <group
        position={[0.00913, 0.0616, 0.13645]}
        rotation={[-Math.PI / 2, 0, 0.04363]}
        scale={-0.01036}
      >
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
  );
}

export function Oak(props) {
  const { nodes, materials } = useGLTF("/Oak.glb");
  return (
    <group {...props} dispose={null} scale={0.01} position={[0, 0, 0]}>
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
        material={materials["material.002"]}
        position={[-0.883, -1.791, 133.578]}
        rotation={[Math.PI / 2, 0, -0.044]}
        scale={[-0.58, 0.58, 0.58]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_6.geometry}
        material={materials["material_1.002"]}
        position={[-0.883, -1.791, 133.578]}
        rotation={[Math.PI / 2, 0, -0.044]}
        scale={[-0.58, 0.58, 0.58]}
      />
    </group>
  );
}

export function Bacopa(props) {
  const { nodes, materials } = useGLTF("/Bacopa.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0006.geometry}
        material={materials["Material_0.006"]}
        position={[0.518, 0.572, 0.545]}
        rotation={[-0.028, 0.11, -0.008]}
        scale={0.432}
      />
      <group position={[0.497, -0.313, 0.587]} rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0.004, 0, -0.006]} scale={1.849}>
            <group
              position={[0.009, 0.062, 0.136]}
              rotation={[-Math.PI / 2, 0, 0.044]}
              scale={-0.01}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_5.geometry}
                material={materials["material.002"]}
                position={[-0.059, 3.225, -0.403]}
                scale={1.351}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_6.geometry}
                material={materials["material_1.002"]}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

export function Basil(props) {
  const { nodes, materials } = useGLTF("/Basill.glb");
  return (
    <group {...props} dispose={null}>
      <group position={[0.497, -0.313, 0.587]} rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0.004, 0, -0.006]} scale={1.849}>
            <group
              position={[0.009, 0.062, 0.136]}
              rotation={[-Math.PI / 2, 0, 0.044]}
              scale={-0.01}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_5.geometry}
                material={materials["material.002"]}
                position={[-0.059, 3.225, -0.403]}
                scale={1.351}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_6.geometry}
                material={materials["material_1.002"]}
                scale={1.307}
              />
            </group>
          </group>
        </group>
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0009.geometry}
        material={materials["Material_0.009"]}
        position={[0.484, 0.414, 0.625]}
        scale={0.505}
      />
    </group>
  );
}

export function Fatboi(props) {
  const { nodes, materials } = useGLTF("/FAtboiglb.glb");
  return (
    <group {...props} dispose={null}>
      <group position={[0.594, -0.222, 2.383]} rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0.004, 0, -0.006]} scale={1.849}>
            <group
              position={[-0.56, 0.039, -1.075]}
              rotation={[-Math.PI / 2, 0, 0.044]}
              scale={-0.01}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_5.geometry}
                material={materials["material.002"]}
                position={[-0.059, 3.225, -0.403]}
                scale={1.351}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_6.geometry}
                material={materials["material_1.002"]}
                scale={1.307}
              />
            </group>
          </group>
        </group>
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0020.geometry}
        material={materials["Material_0.020"]}
        position={[-0.56, 0.644, 0.192]}
        scale={0.891}
      />
    </group>
  );
}
export function KingOfBitters(props) {
  const { nodes, materials } = useGLTF("/King of bitters.glb");
  return (
    <group {...props} dispose={null}>
      <group position={[0.497, -0.313, 0.587]} rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0.004, 0, -0.006]} scale={1.849}>
            <group
              position={[0.009, 0.062, 0.136]}
              rotation={[-Math.PI / 2, 0, 0.044]}
              scale={-0.01}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_5.geometry}
                material={materials["material.002"]}
                position={[-0.059, 3.225, -0.403]}
                scale={1.351}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_6.geometry}
                material={materials["material_1.002"]}
                scale={1.307}
              />
            </group>
          </group>
        </group>
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0011.geometry}
        material={materials["Material_0.011"]}
        position={[0.662, 0.959, 0.442]}
      />
    </group>
  );
}

export function LantanaBloussum(props) {
  const { nodes, materials } = useGLTF("/Lantana Bloussum.glb");
  return (
    <group {...props} dispose={null}>
      <group position={[0.594, -0.222, 2.383]} rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0.004, 0, -0.006]} scale={1.849}>
            <group
              position={[-0.56, 0.039, -1.075]}
              rotation={[-Math.PI / 2, 0, 0.044]}
              scale={-0.01}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_5.geometry}
                material={materials["material.002"]}
                position={[-0.059, 3.225, -0.403]}
                scale={1.351}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_6.geometry}
                material={materials["material_1.002"]}
                scale={1.307}
              />
            </group>
          </group>
        </group>
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0019.geometry}
        material={materials["Material_0.019"]}
        position={[-0.147, 1.049, 0.403]}
      />
    </group>
  );
}
export function Poovarshu(props) {
  const { nodes, materials } = useGLTF("/poovarshu.glb");
  return (
    <group {...props} dispose={null}>
      <group position={[0.594, -0.222, 2.383]} rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0.004, 0, -0.006]} scale={1.849}>
            <group
              position={[-0.56, 0.039, -1.075]}
              rotation={[-Math.PI / 2, 0, 0.044]}
              scale={-0.01}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_5.geometry}
                material={materials["material.002"]}
                position={[-0.059, 3.225, -0.403]}
                scale={1.351}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_6.geometry}
                material={materials["material_1.002"]}
                scale={1.307}
              />
            </group>
          </group>
        </group>
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0018.geometry}
        material={materials["Material_0.018"]}
        position={[-0.624, 0.87, 0.089]}
      />
    </group>
  );
}

export function Thumba(props) {
  const { nodes, materials } = useGLTF("/Thumba_.glb");
  return (
    <group {...props} dispose={null}>
      <group position={[0.594, -0.222, 2.383]} rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0.004, 0, -0.006]} scale={1.849}>
            <group
              position={[-0.56, 0.039, -1.075]}
              rotation={[-Math.PI / 2, 0, 0.044]}
              scale={-0.01}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_5.geometry}
                material={materials["material.002"]}
                position={[-0.059, 3.225, -0.403]}
                scale={1.351}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_6.geometry}
                material={materials["material_1.002"]}
                scale={1.307}
              />
            </group>
          </group>
        </group>
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0017.geometry}
        material={materials["Material_0.017"]}
        position={[-0.462, 1.086, 0.102]}
      />
    </group>
  );
}

export function WithaniaSomnifera(props) {
  const { nodes, materials } = useGLTF("/WithaniaSomnifera.glb");
  return (
    <group {...props} dispose={null}>
      <group position={[0.497, -0.313, 0.587]} rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0.004, 0, -0.006]} scale={1.849}>
            <group
              position={[0.009, 0.062, 0.136]}
              rotation={[-Math.PI / 2, 0, 0.044]}
              scale={-0.01}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_5.geometry}
                material={materials["material.002"]}
                position={[-0.059, 3.225, -0.403]}
                scale={1.351}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_6.geometry}
                material={materials["material_1.002"]}
                scale={1.307}
              />
            </group>
          </group>
        </group>
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0002.geometry}
        material={materials["Material_0.012"]}
        position={[0.423, 0.734, 0.545]}
      />
    </group>
  );
}

useGLTF.preload("/WithaniaSomnifera.glb");

useGLTF.preload("/Thumba_.glb");

useGLTF.preload("/poovarshu.glb");
useGLTF.preload("/Lantana Bloussum.glb");
useGLTF.preload("/King of bitters.glb");
useGLTF.preload("/FAtboiglb.glb");

useGLTF.preload("/Basil.glb");
useGLTF.preload("/Bacopa.glb");
useGLTF.preload("/bananaPlant.glb");
useGLTF.preload("/tulsi.glb");
useGLTF.preload("/Oak.glb");
useGLTF.preload("/AloeVera.glb");
useGLTF.preload("/pine.glb");
