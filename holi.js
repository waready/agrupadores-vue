const exampleEgg = () => {
    let matriz = createMatriz(9, 12);
    console.log("CREANDO LA MATRIZ 9 x 12");
    console.log(matriz);
    matriz = addValueInMatriz(matriz, "vector", 0);
    matriz = addValueInMatriz(matriz, "matrix", 1);
    matriz = addValueInMatriz(matriz, "programa", 2);
    matriz = addValueInMatriz(matriz, "subprograma", 3);
    matriz = addValueInMatriz(matriz, "subproceso", 4);
    matriz = addValueInMatriz(matriz, "variable", 5);
    matriz = addValueInMatriz(matriz, "entero", 6);
    matriz = addValueInMatriz(matriz, "para", 7);
    matriz = addValueInMatriz(matriz, "mientras", 8);
    console.log("METIENDO LOS VALORES");
    console.log(matriz);
    orderWordInMatriz(matriz);
    console.log("ORDENANDO LOS VALORES");
    console.log(matriz);
  };
  
  const createMatriz = (x, y) => {
    const matriz = [];
    for (let i = 0; i < x; i++) {
      matriz.push("* ".repeat(y - 1) + "*");
    }
    return matriz;
  };
  const addValueInMatriz = (matriz, word, row) => {
    const position = matriz[row];
    const positionSplit = position.split(" ");
    const wordSplit = word.split("");
    positionSplit.splice(0, word.length, ...wordSplit);
    matriz[row] = positionSplit.join(" ");
    return matriz;
  };
  
  const orderWordInMatriz = (matriz) => {
    const aux = [];
    for (let mat of matriz) {
      const pos = mat.split(" ").indexOf("r");
      aux.push(pos);
    }
    const maxPos = Math.max(...aux);
    const leftSpaces = aux.map((el) => maxPos - el);
  
    for (let i in matriz) {
      const matWord = matriz[i]
        .split(" ")
        .filter((el) => el !== "*")
        .join("");
      const spaceMatWord = ("*".repeat(leftSpaces[i]) + matWord).split("");
      const positionSplit = matriz[i].split(" ");
      positionSplit.splice(0, spaceMatWord.length, ...spaceMatWord);
      matriz[i] = positionSplit.join(" ");
    }
    return matriz;
  };
  exampleEgg();