import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Icosahedron, Torus, Sphere } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function CoreSphere() {
  const mesh = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.y = state.clock.elapsedTime * 0.15
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
  })
  return (
    <Icosahedron ref={mesh} args={[1.1, 12]}>
      <MeshDistortMaterial
        color="#14d9ff"
        emissive="#14d9ff"
        emissiveIntensity={0.35}
        roughness={0.15}
        metalness={0.85}
        distort={0.32}
        speed={1.6}
      />
    </Icosahedron>
  )
}

function InnerCore() {
  const mesh = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.y = state.clock.elapsedTime * -0.3
  })
  return (
    <Sphere ref={mesh} args={[0.55, 32, 32]}>
      <meshStandardMaterial color="#7c6dff" emissive="#7c6dff" emissiveIntensity={0.6} roughness={0.2} metalness={0.8} />
    </Sphere>
  )
}

function OrbitRing({ radius, tilt, color, speed }: { radius: number; tilt: number; color: string; speed: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = state.clock.elapsedTime * speed
  })
  return (
    <Torus ref={ref} args={[radius, 0.008, 16, 120]} rotation={[tilt, 0, 0]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} toneMapped={false} />
    </Torus>
  )
}

function OrbitDot({ radius, tilt, speed, color, offset }: { radius: number; tilt: number; speed: number; color: string; offset: number }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed + offset
    ref.current.position.set(
      Math.cos(t) * radius,
      Math.sin(t) * radius * Math.sin(tilt),
      Math.sin(t) * radius * Math.cos(tilt)
    )
  })
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
      </mesh>
    </group>
  )
}

export function HeroCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#14d9ff" />
      <pointLight position={[-5, -3, 2]} intensity={1.5} color="#7c6dff" />
      <pointLight position={[0, 3, -4]} intensity={1} color="#3b82f6" />
      <Suspense fallback={null}>
        <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
          <CoreSphere />
          <InnerCore />
        </Float>
        <OrbitRing radius={1.7} tilt={1.2} color="#14d9ff" speed={0.3} />
        <OrbitRing radius={2.1} tilt={-0.6} color="#3b82f6" speed={-0.2} />
        <OrbitRing radius={2.5} tilt={0.3} color="#7c6dff" speed={0.15} />
        <OrbitDot radius={1.7} tilt={1.2} speed={0.6} color="#14d9ff" offset={0} />
        <OrbitDot radius={2.1} tilt={-0.6} speed={-0.5} color="#3b82f6" offset={2} />
        <OrbitDot radius={2.5} tilt={0.3} speed={0.4} color="#7c6dff" offset={4} />
      </Suspense>
    </Canvas>
  )
}
