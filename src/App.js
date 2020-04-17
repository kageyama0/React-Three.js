import React from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import './css/index.css'
import { Home } from './components/Home'
import { RotateBox } from './components/RotateBox'
import { TextureLoading } from './components/TextureLoading'
import { Dodecahedron } from './components/Dodecahedron'
// import { SvgLoading } from './components/SvgLoading'
import { TexturedBox } from './components/TexturedBox'
import { HelloGLSL } from './components/HelloGLSL'
//import { Font } from './components/Font'
import { Shader } from './components/Shader'
import { TextGeo } from './components/Text'

const App = () => {
  return (
    <BrowserRouter>
      <div>{document.title}</div>
      <Switch>
        <Route exact path='/'><Home /></Route>
        <Route path='/1'><RotateBox /></Route>
        <Route path='/2'><TextureLoading /></Route>]
        <Route path='/3'><Dodecahedron /></Route>
        {/* <Route path='/4'><SvgLoading /></Route> */}
        <Route path='/5'><TexturedBox /></Route>
        {/* <Route path='/6'><Font /></Route> */}
        <Route path='/7'><HelloGLSL /></Route>
        <Route path='/8'><Shader /></Route>
        <Route path='/9'><TextGeo /></Route>
      </Switch>
      <Link to='/'>ホーム画面へ</Link>
      <Link to='/1'>　回転する箱</Link>
      <Link to='/2'>　画像ファイルの読み込み...</Link>
      <Link to='/3'>　転がる12面体の箱へ</Link>
      {/* <Link to='/4'>　svg読み込み</Link> */}
      <Link to='/5'>　画像貼り付けた箱へ</Link>
      {/* <Link to='/6'>　Font</Link> */}
      <Link to='/7'>　GLSL初期サンプル</Link>
      <Link to='/8'>　シェーダー</Link>
      <Link to='/9'>　3D文字</Link>
    </BrowserRouter>
  )
}

export default App;
