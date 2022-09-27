class Matrix {
    constructor(rows, cols){
      this.mm = [];
      this.rows = rows;
      this.cols = cols;
      for (let r = 0; r < rows; r++){
        this.mm[r] = [];
        for (let c = 0; c < cols; c++){
          this.mm[r][c] = 0;
        }
      }
    }
    
    reset(){
      
    }
    
    // Scalar and element-wise
    mult(n){
      if (n instanceof Matrix){ // element-wise
        for (let i = 0; i < this.rows; i++){
          for (let j = 0; j < this.cols; j++){
            this.mm[i][j] *= n.mm[i][j];
          }
        }
      } else { // scalar
        for (let i = 0; i < this.rows; i++){
          for (let j = 0; j < this.cols; j++){
            this.mm[i][j] *= n;
          }
        }
      }
    }
    add(n){
      if (n instanceof Matrix){
        for (let i = 0; i < this.rows; i++){
          for (let j = 0; j < this.cols; j++){
            this.mm[i][j] += n.mm[i][j];
          }
        }
      } else {
        for (let i = 0; i < this.rows; i++){
          for (let j = 0; j < this.cols; j++){
            this.mm[i][j] += n;
          }
        }
      }
    }
    sub(n){
      if (n instanceof Matrix){ // element wise
        for (let i = 0; i < this.rows; i++){
          for (let j = 0; j < this.cols; j++){
            this.mm[i][j] -= n.mm[i][j];
          }
        }
      } else { // scalar
        for (let i = 0; i < this.rows; i++){
          for (let j = 0; j < this.cols; j++){
            this.mm[i][j] -= n;
          }
        }
      }
    }
    div(n){
      if (n instanceof Matrix){
        for (let i = 0; i < this.rows; i++){
          for (let j = 0; j < this.cols; j++){
            this.mm[i][j] /= n.mm[i][j];
          }
        }
      } else {
        for (let i = 0; i < this.rows; i++){
          for (let j = 0; j < this.cols; j++){
            this.mm[i][j] /= n;
          }
        }
      }
    }
    
    // helpful utility functions
    randomize(){
      for (let i = 0; i < this.rows; i++){
        for (let j = 0; j < this.cols; j++){
          this.mm[i][j] = Math.random() * 2 - 1;
        }
      }
    }
    print(){
      console.table(this.mm);
    }
    transpose(){
      // create new mm, rows and cols
      let newMM = [];
      let newRows = this.cols;
      let newCols = this.rows;
      for (let i = 0; i < newRows; i++){
        newMM[i] = [];
        for (let j = 0; j < newCols; j++){
          newMM[i][j] = 0;
        }
      }
      // transpose newMM
      for (let i = 0; i < newRows; i++){
        for (let j = 0; j < newCols; j++){
          newMM[i][j] = this.mm[j][i];
        }
      }
      // change current mm, rows, cols to new ones
      this.mm = newMM;
      this.rows = newRows;
      this.cols = newCols;
    }
    map(func){
      for(let i=0; i < this.rows; i++){
        for(let j=0; j < this.cols; j++){
          // apply a function to every element of the matrix
          let val = this.mm[i][j];
          this.mm[i][j] = func(val);
        }
      }
    }
    toArray(){
      let arr = [];
      for (let i = 0; i < this.rows; i++){
        for (let j = 0; j < this.cols; j++){
          arr[i] = this.mm[i][j];
        }
      }
      return arr;
    }
    copy(){
      let result = new Matrix(this.rows, this.cols);
      for (let i=0; i<this.rows;i++){
        for (let j=0; j<this.cols;j++){
          result.mm[i][j] = this.mm[i][j];
        }
      }
      return result;
    }
    
    // Static methods
    static mult(m1, m2){
      let a = m1;
      let b = m2;
      if (a.cols !== b.rows){
        console.log("cols of a must be the same as the rows of b");
        return undefined;
      }
      let result = new Matrix(a.rows, b.cols);
      for (let i = 0; i < result.rows; i++){
        for (let j = 0; j < result.cols; j++){
          // dot product
          let sum = 0;
          for (let k = 0; k < a.cols; k++){
            sum += a.mm[i][k] * b.mm[k][j];
          }
          result.mm[i][j] = sum;
        }
      }
      return result;
    }
    static add(m1, m2){
      let result = m1.copy();
      for (let i = 0; i < result.rows; i++){
        for (let j = 0; j < result.cols; j++){
          result.mm[i][j] += m2.mm[i][j];
        }
      }
      return result;
    }
    static sub(m1, m2){
      let result = m1.copy();
      for (let i = 0; i < result.rows; i++){
        for (let j = 0; j < result.cols; j++){
          result.mm[i][j] -= m2.mm[i][j];
        }
      }
      return result;
    }
    static div(m1, m2){
      let result = m1.copy();
      for (let i = 0; i < result.rows; i++){
        for (let j = 0; j < result.cols; j++){
          result.mm[i][j] /= m2.mm[i][j];
        }
      }
      return result;
    }
    static transpose(m){
       // create new Matrix
      let newM = new Matrix(m.cols, m.rows)
      for (let i = 0; i < newM.rows; i++){
        newM.mm[i] = [];
        for (let j = 0; j < newM.cols; j++){
          newM.mm[i][j] = 0;
        }
      }
      // transpose newMM
      for (let i = 0; i < newM.rows; i++){
        for (let j = 0; j < newM.cols; j++){
          newM.mm[i][j] = m.mm[j][i];
        }
      }
      // return result
      return newM;
    }
    static fromArray(arr){
      let m = new Matrix(arr.length, 1);
      for (let i = 0; i < arr.length; i++){
        m.mm[i][0] = arr[i];
      }
      return m;
    }
    static map(m, func){
      let result = new Matrix(m.rows, m.cols);
      for(let i=0; i < m.rows; i++){
        for(let j=0; j < m.cols; j++){
          // apply a function to every element of the matrix
          let val = m.mm[i][j];
          result.mm[i][j] = func(val);
        }
      }
      return result;
    }
  }