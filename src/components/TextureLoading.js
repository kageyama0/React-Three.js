//参考: https://codesandbox.io/embed/three-fiber-useloader-rv84x
import * as THREE from 'three'
import React, { Suspense } from 'react'
import { Canvas, Dom, useLoader } from 'react-three-fiber'
// import textureUrl from '../resources/images/001.jpg'
import url from '../resources/images/crate.gif'
import '../css/TextureLoading.css'

function Image({ url, ...props }) {
  const texture = useLoader(THREE.TextureLoader, url)
  return (
    <sprite {...props}>
      <spriteMaterial attach="material" map={texture} depthTest={false} />
    </sprite>
  )
}

const TextureLoading = () => {
  return (
    <Canvas>
      <Suspense fallback={<Dom>...Loading</Dom>}>
        <Image url={url} scale={[5, 5, 5]} />
      </Suspense>
    </Canvas>
  )
}

export { TextureLoading }
