export default class Vector {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    /** 
     * 
     * @returns {Vector}
     */
    normalized() {
      var x = this.x;
      var y = this.y;
      var length = (x ** 2 + y ** 2) ** 0.5;
      return new Vector(x / length, y / length);
    }
  
    distance(otherVec) {
      let difVec = Vector.subtract(this, otherVec);
      return difVec.length();
    }
  
  
  
    length() {
      let x = this.x;
      let y = this.y;
      return (x ** 2 + y ** 2) ** 0.5;
    }
  
    toStr() {
      return "x = " + this.x + " y = " + this.y;
    }
  
    //#region Transforms
    scaled(xScale, yScale){
      return new Vector(xScale*this.x, yScale*this.y);
    }
  
    scaledInPlace(xScale, yScale, center){
      const centeredVec = Vector.subtract(this, center);
      const scaledVec = centeredVec.scaled(xScale, yScale);
      return new Vector(scaledVec.x + center.x, scaledVec.y + center.y);
    }
  
    rotated(angleInDeg) {
      const rad = (angleInDeg / 180.0) * Math.PI;
      let x1 = this.x * Math.cos(rad) - this.y * Math.sin(rad);
      let y1 = this.x * Math.sin(rad) + this.y * Math.cos(rad);
      return new Vector(x1, y1);
    }
  
    rotatedInPlace(angleInDeg, center){
      const centeredVec = Vector.subtract(this, center);
      const rotatedVec = centeredVec.rotated(angleInDeg);
      return Vector.add(rotatedVec, center);
    }
  
    /** For rotating about the X-Axis
     * 
     * @param {*} angleInDeg 
     * @param {*} center 
     * @returns 
     */
    rotateAboutXAxis(angleInDeg, center=null){
      const rad = (angleInDeg / 180.0) * Math.PI;
      let centeredVec = null;
      if (center){
        centeredVec = Vector.subtract(this, center);
      }
      else{
        centeredVec = this;
      }
  
      const [x, y, z] = [centeredVec.x, centeredVec.y, 0];
  
      
      const newVec = [0, 0, 0];
  
      const m1 = [1, 0, 0];
      const m2 = [0, Math.cos(rad), -Math.sin(rad)];
      const m3 = [0, Math.sin(rad), Math.cos(rad)];
  
      newVec[0] = m1[0]*x + m1[1]*y + m1[2]*z; 
      newVec[1] = m2[0]*x + m2[1]*y + m2[2]*z; 
      newVec[2] = m3[0]*x + m3[1]*y + m3[2]*z; 
  
      const tempFinal = new Vector(newVec[0], newVec[1]);
      if (center)
        return Vector.add(tempFinal, center);
      else{
        return tempFinal;
      }
    }
  
    /** For rotating about the Y-Axis
     * 
     * @param {Number} angleInDeg 
     * @param {Vector} center 
     * @returns {Vector}
     */
    rotateAboutYAxis(angleInDeg, center=null){
      const rad = (angleInDeg / 180.0) * Math.PI;
      let centeredVec = null;
      if (center){
        centeredVec = Vector.subtract(this, center);
      }
      else{
        centeredVec = this;
      }
  
      const [x, y, z] = [centeredVec.x, centeredVec.y, 0];
  
      
      const newVec = [0, 0, 0];
  
      const m1 = [Math.cos(rad), 0, Math.sin(rad)];
      const m2 = [0, 1, 0];
      const m3 = [-Math.sin(rad), 0, Math.cos(rad)];
  
      newVec[0] = m1[0]*x + m1[1]*y + m1[2]*z; 
      newVec[1] = m2[0]*x + m2[1]*y + m2[2]*z; 
      newVec[2] = m3[0]*x + m3[1]*y + m3[2]*z; 
  
      const tempFinal = new Vector(newVec[0], newVec[1]);
      if (center)
        return Vector.add(tempFinal, center);
      else{
        return tempFinal;
      }
    }
    //#endregion
  
  
    //#region Utils
    /**
     * 
     * @param {Array<Vector>} vectorArr 
     * @returns Vector
     */
    static getCenter(vectorArr){
      if (vectorArr.length === 0){
        return null;
      }
  
      let [x1, y1, x2, y2] = [vectorArr[0].x, vectorArr[0].y, vectorArr[0].x, vectorArr[0].y];
  
      let curX = 0;
      let curY = 0;
      for(let i = 0; i < vectorArr.length; i += 1){
          curX = vectorArr[i].x;
          curY = vectorArr[i].y;
  
          if (curX < x1){
              x1 = curX;
          }
          if (curX > x2){
              x2 = curX;
          }
          if (curY < y1){
              y1 = curY;
          }
          if (curY > y2){
              y2 = curY;
          }
      }
      
      return new Vector((x1+x2)*.5, (y1+y2)*.5);
    }
  
    /**
     * 
     * @param {Array<Vector>} vectorArr 
     */
    static getWeightedCenter(vectorArr){
      let x = 0;
      let y = 0;
      for(let i = 0; i < vectorArr.length; i += 1){
        x += vectorArr[i].x;
        y += vectorArr[i].y;
      }
  
      x = x/vectorArr.length;
      y = y/vectorArr.length;
  
      return new Vector(x, y);
    }
    //#endregion
  
  
    //#region Operator Overload functions
    /**
     * 
     * @param {Number} scalar 
     * @param {Vector} vector 
     * @returns 
     */
    static scalar(scalar, vector) {
      return new Vector(scalar * vector.x, scalar * vector.y);
    }
  
    /**
     * 
     * @param {Vector} a 
     * @param {Vector} b 
     * @returns {Number}
     */
    static dot(a, b) {
      return a.x * b.x + a.y * b.y;
    }
  
    /**
     * 
     * @param {Vector} a 
     * @param {Vector} b 
     * @returns {Vector}
     */
    static add(a, b) {
      return new Vector(a.x + b.x, a.y + b.y);
    }
  
      /**
     * 
     * @param {Vector} a 
     * @param {Vector} b 
     * @returns {Vector}
     */
    static subtract(a, b) {
      return new Vector(a.x - b.x, a.y - b.y);
    }
    //#endregion
  }
  
  