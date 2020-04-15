import React from "react";
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from 'gl-react-dom';

const fragment = require('./shaders/fragment.glsl');
const shaders = Shaders.create({
  helloGLSL: {
    frag: GLSL`${fragment.default}`
  }
});

const HelloGLSL = () => {
  return (
    <Surface width={400} height={400} >
      <Node shader={shaders.helloGLSL} />
    </Surface>
  )
}

export { HelloGLSL }
