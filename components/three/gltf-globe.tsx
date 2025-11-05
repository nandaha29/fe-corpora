"use client"

import { useGLTF } from "@react-three/drei"
import { useRef, useEffect, useState } from "react"
import type { Mesh } from "three"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface GLTFGlobeProps {
  onGlobeClick: () => void
  gltfPath: string
  scale?: number
  autoRotate?: boolean
}

export function GLTFGlobe({ onGlobeClick, gltfPath, scale = 1, autoRotate = true }: GLTFGlobeProps) {
  const meshRef = useRef<Mesh>(null)
  const [loadError, setLoadError] = useState(false)
  const gltf = useGLTF(gltfPath)
  const scene = gltf.scene

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Create fallback material if textures are missing
          if (child.material) {
            const material = child.material as THREE.MeshStandardMaterial

            // If material has missing textures, create a fallback
            if (!material.map || !material.normalMap) {
              const fallbackMaterial = new THREE.MeshStandardMaterial({
                color: new THREE.Color(0x4a90e2), // Nice blue color for globe
                roughness: 0.7,
                metalness: 0.1,
                emissive: new THREE.Color(0x001122),
                emissiveIntensity: 0.1,
              })
              child.material = fallbackMaterial
            }
          }
        }
      })
    }
  }, [scene])

  // Auto rotation animation
  useFrame((state, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  // If GLTF failed to load or there's an error, return fallback sphere
  if (loadError || !scene) {
    return (
      <mesh ref={meshRef} onClick={onGlobeClick} scale={[scale, scale, scale]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#4a90e2"
          roughness={0.7}
          metalness={0.1}
          emissive="#001122"
          emissiveIntensity={0.1}
        />
      </mesh>
    )
  }

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={[scale, scale, scale]}
      onClick={onGlobeClick}
      onPointerOver={(e) => {
        e.stopPropagation()
        document.body.style.cursor = "pointer"
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        document.body.style.cursor = "auto"
      }}
    />
  )
}

// Don't preload if there might be issues with the file
// useGLTF.preload("/models/scene.gltf")
