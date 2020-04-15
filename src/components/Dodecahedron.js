import React from "react"
import { Canvas, useThree } from "react-three-fiber"
import { useDrag, useHover } from "react-use-gesture"
import { useSpring, a } from "react-spring/three"
import "../css/Dodecahedron.css"

function Dode() {
  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width
  const [spring, set] = useSpring(() => ({
    scale: [1, 1, 1],
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    config: { mass: 3, friction: 40, tension: 800 }
  }))
  const bindDrag = useDrag(
    ({ offset: [x, y], vxvy: [vx, vy], down, ...props }) => set({ position: [x / aspect, -y / aspect, 0], rotation: [y / aspect, x / aspect, 0] }),
    { pointerEvents: true }
  )

  const bindHover = useHover(({ hovering }) => set({ scale: hovering ? [1.2, 1.2, 1.2] : [1, 1, 1] }), {
    pointerEvents: true
  })

  return (
    <a.mesh {...spring} {...bindDrag()} {...bindHover()} castShadow>
      <dodecahedronBufferGeometry attach="geometry" args={[1.4, 0]} />
      <meshNormalMaterial attach="material" />
    </a.mesh>
  )
}

const Dodecahedron = () => {
  return (
    <Canvas style={{ background: "lightblue" }} shadowMap camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <spotLight intensity={0.6} position={[20, 10, 10]} angle={0.2} penumbra={1} shadow-mapSize-width={2048} shadow-mapSize-height={2048} castShadow />
      <mesh receiveShadow>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <meshPhongMaterial attach="material" color="#272727" />
      </mesh>
      <Dode />
    </Canvas >
  )
}

export { Dodecahedron };
