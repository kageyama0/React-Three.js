import * as THREE from 'three'
import React, { Suspense, useRef, useMemo } from 'react'
import { Canvas, useLoader, useFrame, useThree, extend } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import bold from '../resources/fonts/bold.blob'
extend({ OrbitControls })

export function Controls() {
  const ref = useRef()
  const { camera, gl } = useThree()
  useFrame(() => ref.current.update())
  return <orbitControls ref={ref} args={[camera, gl.domElement]} enableDamping dampingFactor={0.1} rotateSpeed={0.5} />
}

function Text({ st, size = 1, ...props }) {
  const font = useLoader(THREE.FontLoader, bold)
  const config = useMemo(
    () => ({
      font,
      size: 30,
      height: 30,
      curveSegments: 32,
      bevelEnabled: true,
      bevelThickness: 6,
      bevelSize: 2.5,
      bevelOffset: 0,
      bevelSegments: 8,
    }),
    [font]
  )
  const mesh = useRef([st])
  return (
    <mesh
      ref={mesh}
      scale={[0.1 * size, 0.1 * size, 0.1]}
      {...props}>
      <textGeometry attach="geometry" args={[st, config]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  )
}

function BoldText() {
  const ref = useRef()
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    ref.current.position.y = Math.sin(time) * 3
  })
  return (
    <group ref={ref}>
      <Text position={[-8, 4, 0]} st="3D" size={1.3}/>
      <Text position={[0, 4, 0]} st="TEXT" size={1.3}/>
      <Text position={[-8, 0, 0]} st="WITH" />
      <Text position={[ 4, 0, 0]} st="R3F" />
    </group>
  )
}

const TextGeo = () => {
  return (
    <div style={{ background: 'aqua' }}>
      <ul>
        <li>ドラッグしてカーソルを動かすと、カメラの位置を動かせます。</li>
        <li>マウスのホイールでカメラの位置を遠ざけたり、近づけたり出来ます。</li>
      </ul>
      <Canvas
        camera={{ position: [0, 5, 20] }}
        style={{ height:'800px' }}
      >
        <ambientLight intensity={2} />
        <Suspense fallback={null}>
          <BoldText />
        </Suspense>
        <Controls />
      </Canvas>
    </div>
  )
}

export { TextGeo }
