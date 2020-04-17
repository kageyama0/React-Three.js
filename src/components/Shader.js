// ----reference-----
// https://codesandbox.io/s/t9-react-three-fiber-shadermaterial-1g4qq?file=/src/index.js
// https://threejs.org/examples/?q=shader#webgl_shader
// https://codesandbox.io/s/y7f9k

import React, { Suspense, useRef } from "react"
import { Canvas, useFrame } from "react-three-fiber"
import { PurpleShader } from "./shaders/PurpleShader"

function Plane() {
  const ref = useRef()
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    ref.current.material.uniforms.time.value = time;
    ref.current.rotation.x = ref.current.rotation.y += 0.01
  })

  return (
    <mesh ref={ref}>
      <planeBufferGeometry attach="geometry" args={[2,2,2]} />
      <shaderMaterial
        attach="material"
        args={[PurpleShader]}
      />
    </mesh>
  )
}

const Shader = () => {
  return (
    <Canvas camera={{ position: [- 1, 1, 1], near: 0.01, far: 10000, fov: 60 }}>
      <ambientLight intensity={0.85} />
      <Suspense fallback={null}>
        <Plane />
      </Suspense>
    </Canvas>
  )
}

export { Shader };
