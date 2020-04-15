import * as THREE from 'three'
import React, { useRef, Suspense } from 'react'
import { Canvas, Dom, useFrame, useLoader } from 'react-three-fiber'
import textureUrl from '../resources/images/crate.gif'

function Cube() {
  const mesh = useRef()
  const texture = useLoader(THREE.TextureLoader, textureUrl)
  useFrame(() => {
    mesh.current.rotation.x += 0.005;
    mesh.current.rotation.y += 0.01;
  })
  return (
    <mesh ref={mesh}>
      <boxBufferGeometry attach="geometry" args={[200, 200, 200]} />
      <meshBasicMaterial attach="material" map={texture} depthTest={false} />
    </mesh>
  )
}

const TexturedBox = () => {
  return (
    <Canvas camera={{ position: [0, 0, 400] }}>
      <Suspense fallback={<Dom>...Loading</Dom>}>
        <Cube />
      </Suspense>
    </Canvas>
  )
}

export { TexturedBox }
