function sigmoid(x){
    return 1 / (1 + Math.exp(-x));
  }
  
  function dsigmoid(y){
    // return sigmoid(x) * (1 - sigmoid(x));
    return y * (1 - y);
  }
  
  class NeuralNetwork{
    constructor(numInput, numHidden, numOutput){
      // number of nodes
      this.input_nodes = numInput;
      this.hidden_nodes = numHidden;
      this.output_nodes = numOutput;
      // create the weight matrices
      this.weights_ih = new Matrix(numHidden, numInput);
      this.weights_ho = new Matrix(numOutput, numHidden);
      // initialize the weights to be random
      this.weights_ih.randomize();
      this.weights_ho.randomize();
      // create the biases
      this.bias_ih = new Matrix(numHidden, 1);
      this.bias_ho = new Matrix(numOutput, 1);
      // randomize biases
      this.bias_ih.randomize();
      this.bias_ho.randomize();
      // learning rate
      this.lr = 1;
    }
    
    reset(){
      // initialize the weights to be random
      this.weights_ih.randomize();
      this.weights_ho.randomize();
      // randomize biases
      this.bias_ih.randomize();
      this.bias_ho.randomize();
    }
    
    feedForward(input_array){
      /// generation of hidden output(s)
      // convert input array to a matrix
      let inputs = Matrix.fromArray(input_array);
      // calculate hidden output
      let hiddenOutput = Matrix.mult(this.weights_ih, inputs);
      // add bias for hidden node
      hiddenOutput.add(this.bias_ih);
      // activation function
      hiddenOutput.map(sigmoid);
      
      /// generation of output(s)
      // calculate output
      let output = Matrix.mult(this.weights_ho, hiddenOutput);
      // add bias for output node
      output.add(this.bias_ho);
      // activation function
      output.map(sigmoid);
      
      // convert output matrix to an array before returning
      let outputArray = output.toArray();
      // return output(array)
      return outputArray;
    }
    
    train(inputArray, answerArray){
      // make a guess
      /// generation of hidden output(s)
      let inputs = Matrix.fromArray(inputArray);
      let hiddenOutput = Matrix.mult(this.weights_ih, inputs);
      hiddenOutput.add(this.bias_ih);
      hiddenOutput.map(sigmoid);
      
      /// generation of output(s)
      let output = Matrix.mult(this.weights_ho, hiddenOutput);
      output.add(this.bias_ho);
      output.map(sigmoid);
      
      // convert answer(array) to matrix
      let answers = Matrix.fromArray(answerArray);
      // calculate error
      let output_errors = Matrix.sub(answers, output);
      // calc gradient
      let gradients = Matrix.map(output, dsigmoid);
      gradients.mult(output_errors);
      gradients.mult(this.lr);
      
      
      // calc deltas
      let transposed_hidden_output = Matrix.transpose(hiddenOutput);
      let weight_ho_delta = Matrix.mult(gradients, transposed_hidden_output);
  
      // tweak the weights by delta
      this.weights_ho.add(weight_ho_delta);
      this.bias_ho.add(gradients);
      
      // transpose weights from hidden to output
      let transposed_weights_ho = Matrix.transpose(this.weights_ho);
      // calculate hidden error(s)
      let hidden_errors = Matrix.mult(transposed_weights_ho, output_errors);
      
      // calc hidden gradient
      let hidden_gradients = Matrix.map(hiddenOutput, dsigmoid);
      hidden_gradients.mult(hidden_errors);
      hidden_gradients.mult(this.lr);
      
      // calc input->hidden deltas
      let transposed_input = Matrix.transpose(inputs);
      let weight_ih_delta = Matrix.mult(hidden_gradients, transposed_input);
      
      // tweak the hidden weights by delta
      this.weights_ih.add(weight_ih_delta);
      this.bias_ih.add(hidden_gradients);
      // debugging
      // print("The Neural Network's guess: ");
      // guess.print();
      // print("The Known Correct Answer: ");
      // answers.print();
      // print("Output Error(answers - guess): ");
      // output_errors.print();    
      // print("Hidden Error(answers - guess): ");
      // hidden_errors.print();    
    }
  }