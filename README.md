# VectorJS

A 2D vector library for handling vectors written in vanilla Javascript.

Standard functions like normalization, length are included.  Also included are static functions for scalar multiplication, dot product and add and subtract between two vectors.

Also includes 3D rotations about the X-Axis and Y-Axis for pretty SVG animations.

## Example
```
import Vector from "./Vector.js"

let a = new Vector(44, 0);
let aN = a.normalized();
// aN.x = 1, aN.y = 0


let b = new Vector(33, 0);
let c = Vector.subtract(a, b);
// c.x = 11, c.y = 0;



//rotate 3D about X-Axis
const [p0, p1, p2] = [new Vector(0, 0), new Vector(10, 5), new Vector(10, -5)];

const triangleArr = [p0, p1, p2];

const center = Vector.getCenter(triangleArr);

const rotatedTriArr = [];
for(let i = 0; i < triangleArr.length; i += 1){
  const nPi = triangleArr[i].rotateAboutXAxis(40, center);
  rotatedTriArr.push(nPi);
}
//
