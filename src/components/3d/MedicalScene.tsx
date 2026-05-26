"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Stars, Float } from "@react-three/drei"
import { useRef, useMemo, Suspense } from "react"
import * as THREE from "three"

function DNAHelix() {
  const group = useRef<THREE.Group>(null)

  const strand = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i < 60; i++) {
      const t = (i / 60) * Math.PI * 6
      pts.push(new THREE.Vector3(Math.cos(t) * 1.2, (i / 60) * 8 - 4, Math.sin(t) * 1.2))
    }
    return pts
  }, [])

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.18
    }
  })

  return (
    <group ref={group}>
      {strand.map((pt, i) => (
        <mesh key={`a${i}`} position={pt}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={1.2} />
        </mesh>
      ))}
      {strand.map((pt, i) => (
        <mesh key={`b${i}`} position={[-pt.x, pt.y, -pt.z]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={1.2} />
        </mesh>
      ))}
      {strand.filter((_, i) => i % 6 === 0).map((pt, i) => {
        const end = new THREE.Vector3(-pt.x, pt.y, -pt.z)
        const mid = pt.clone().add(end).multiplyScalar(0.5)
        const dir = end.clone().sub(pt).normalize()
        const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1, 0, 0), dir)
        const len = pt.distanceTo(end)
        return (
          <mesh key={`link${i}`} position={mid} quaternion={quat}>
            <boxGeometry args={[len, 0.025, 0.025]} />
            <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.6} transparent opacity={0.7} />
          </mesh>
        )
      })}
    </group>
  )
}

function Particles() {
  const ref = useRef<THREE.Points>(null)
  const count = 300

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 14
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14
    }
    return arr
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.04
      ref.current.rotation.x = state.clock.elapsedTime * 0.015
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.055} color="#06b6d4" transparent opacity={0.45} sizeAttenuation />
    </points>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]}   color="#06b6d4" intensity={4} />
      <pointLight position={[-5, -5, 4]} color="#6366f1" intensity={2.5} />
      <pointLight position={[0, 0, 8]}   color="#22d3ee" intensity={1.5} />
      <Stars radius={45} depth={30} count={700} factor={2} fade speed={0.4} />
      <Particles />
      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.8}>
        <DNAHelix />
      </Float>
    </>
  )
}

export default function MedicalScene() {
  return (
    <Canvas camera={{ position: [0, 0, 9], fov: 55 }} style={{ background: "transparent" }}>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
