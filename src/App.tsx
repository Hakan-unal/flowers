import { useState, useEffect } from "react";
import useWindowSize from "./hooks/useWindowSize";
import { Space, Switch, Button } from 'antd';


const leafPositions = [
  { xPosition: 0, yPosition: -55, radius: 15, color: "green" },
  { xPosition: 55, yPosition: 0, radius: 15, color: "green" },
  { xPosition: -55, yPosition: 0, radius: 15, color: "green" },
  { xPosition: -40, yPosition: -40, radius: 15, color: "green" },
  { xPosition: 40, yPosition: -40, radius: 15, color: "green" },
  { xPosition: -40, yPosition: 40, radius: 15, color: "green" },
  { xPosition: 40, yPosition: 40, radius: 15, color: "green" },
]
const App = () => {
  const [checked, setChecked] = useState(false)
  let canvas = document.getElementById("canvas");
  const draw = canvas?.getContext("2d");
  const size = useWindowSize()

  const papatya = (event: any) => {
    //  yuvarlak
    draw.beginPath();
    draw.arc(event.clientX, event.clientY, 40, 0, 2 * Math.PI, false);
    draw.fillStyle = "yellow";
    draw.fill();
    draw.stroke();
    // yaprak
    leafPositions.map((obj) => {
      draw.beginPath();
      draw.arc(event.clientX + obj.xPosition, event.clientY + obj.yPosition, obj.radius, 0, 2 * Math.PI, false);
      draw.fillStyle = obj.color;
      draw.fill();
      draw.stroke();
    })
    // çubbuk
    draw.beginPath();
    draw.moveTo(event.clientX, event.clientY + 40);
    draw.lineTo(event.clientX, event.clientY + 190);
    draw.strokeStyle = "green";
    draw.stroke();
  }

  const gul = (event: any) => {
    //  yuvarlak
    draw.beginPath();
    draw.arc(event.clientX, event.clientY, 40, 0, 2 * Math.PI, false);
    draw.fillStyle = "red";
    draw.fill();
    draw.stroke();

  }

  const handleClear = () => {
    draw.clearRect(0, 0, size.width - 30, size.height - 20);

  }
  canvas?.addEventListener("click", (event) => {
    checked ? papatya(event) : gul(event)

  });


  return (<Space direction="vertical">
    <Space direction="horizontal">
      <Switch
        checked={checked}
        onChange={() => setChecked(!checked)}
        checkedChildren={"Papatya"}
        unCheckedChildren={"Gül"}
        defaultChecked />
      <Button onClick={() => handleClear()} type="dashed" >Temizle</Button>
    </Space>
    <canvas id="canvas" height={size.height - 20} width={size.width - 30} >Not supported</canvas>
  </Space>
  )
}


export default App;
