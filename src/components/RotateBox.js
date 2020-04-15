import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import '../css/RotateBox.css'

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // [管理したい変数,それを呼び出すための関数] = useState(初期値)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (hovered && !active) {
      mesh.current.rotation.z += 0.01
      mesh.current.rotation.x += 0.01
    }
    if (hovered && active) {
      mesh.current.rotation.y += 0.02
      mesh.current.rotation.x += 0.06
    }
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [3, 3, 3] : [2, 2, 2]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const RotateBox = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  )
}

export { RotateBox };
