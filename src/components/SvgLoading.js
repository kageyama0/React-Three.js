import { Box3, Sphere } from 'three'
import React, { Suspense, useState, useRef, useEffect, useMemo } from 'react'
import { Canvas, extend, useLoader, useThree, useFrame } from 'react-three-fiber'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import { MapControls } from 'three/examples/jsm/controls/OrbitControls'
import '../css/SvgLoading.css'

extend({ MapControls })

function Controls() {
  const controls = useRef()
  const { camera, gl } = useThree()
  useFrame(() => controls.current.update())
  return <mapControls ref={controls} args={[camera, gl.domElement]} enableDamping dampingFactor={0.1} maxZoom={40} minZoom={1.25} />
}

function Cell({ color, shape, fillOpacity }) {
  return (
    <mesh>
      <meshBasicMaterial attach="material" color={color} opacity={fillOpacity} depthWrite={false} transparent />
      <shapeBufferGeometry attach="geometry" args={[shape]} />
    </mesh>
  )
}

function Svg({ url }) {
  const { paths } = useLoader(SVGLoader, url)
  const shapes = useMemo(
    () => paths.flatMap((p, i) => p.toShapes(true).map(shape => ({ shape, color: p.color, fillOpacity: p.userData.style.fillOpacity }))),
    [paths]
  )

  const [center, setCenter] = useState([0, 0, 0])
  const ref = useRef()
  useEffect(() => {
    const box = new Box3().setFromObject(ref.current)
    const sphere = new Sphere()
    box.getBoundingSphere(sphere)
    setCenter([-sphere.center.x, -sphere.center.y, 0])
  }, [])

  return (
    <group position={center} ref={ref}>
      {shapes.map(props => (
        <Cell key={props.shape.uuid} {...props} />
      ))}
    </group>
  )
}

function SvgLoading() {
  return (
    <Canvas orthographic camera={{ position: [0, 0, 50], zoom: 10, up: [0, 0, 1], far: 10000 }}>
      <Suspense fallback={null}>
        <Svg url="/map.svg" />
      </Suspense>
      <Controls />
    </Canvas>
  )
}

export { SvgLoading };
