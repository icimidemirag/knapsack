//İçimi Demirağ - 191180033

function knapsack(){
    
  let k = Number(document.getElementById("k").value) || 0;

  let wA = Number(document.getElementById("wA").value) || 0;
  let wB = Number(document.getElementById("wB").value) || 0;
  let wC = Number(document.getElementById("wC").value) || 0;
  let wD = Number(document.getElementById("wD").value) || 0;
  let wE = Number(document.getElementById("wE").value) || 0;

  let vA = Number(document.getElementById("vA").value) || 0;
  let vB = Number(document.getElementById("vB").value) || 0;
  let vC = Number(document.getElementById("vC").value) || 0;
  let vD = Number(document.getElementById("vD").value) || 0;
  let vE = Number(document.getElementById("vE").value) || 0;

  let weights = [wA, wB, wC, wD, wE];
  let values = [vA, vB, vC, vD, vE];

  if ( !(5 <= k && k <= 25)) {
    alert("N = 5 için 5 ≤ K ≤ 25 olmalıdır.");
    return;
  }

  for (w of weights) {
      if (!(1 <= w && w <= k)) {
          alert("K = " + k + " için 1 ≤ W ≤ " + k + " olmalıdır.");
          return;
      }
  }

  for (v of values) {
      if (!(1 <= v && v <= 25)) {
          alert("N = 5 için 1 ≤ V ≤ 25 olmalıdır.");
          return;
      }
  }

  const objects = {A: {weight: wA, value: vA}, B: {weight: wB, value: vB},
  C: {weight: wC, value: vC}, D: {weight: wD, value: vD}, E: {weight: wE, value: vE}};

  let nodeDataArray = [];
  let bestValue = 0, bestKey = 0;

  function knapsack(items = ["A", "B", "C", "D", "E"], data = [], step = 0, key = 0, parent = 0){
    let w = 0, v = 0;

    for (let i = 0; i < data.length; i++) {
      w += objects[data[i]].weight;
      v += objects[data[i]].value;
    }

    if (step === Object.keys(objects).length && v > bestValue && w <= k) {
      bestValue = v;
      bestKey = key;
    }

    let resultLeaf = false;
    if(step === Object.keys(objects).length && w <= k){
        resultLeaf = true
    }

    nodeDataArray.push({    
      key,
      parent,
      name: "Nesneler: [" + items + "]",
      title:"Seçilenler: [" + data + "]",
      headOf: " V:" + v + "; W:" + w,
      icon: resultLeaf ? "success.png":undefined
    });

    if (step === Object.keys(objects).length) {
      return;
    }

    knapsack(items.filter(item => item !== Object.keys(objects)[step]), [...data, Object.keys(objects)[step]],
    step + 1, Math.floor(Math.random() * 1000), key);

    knapsack(items, data, step + 1, Math.floor(Math.random() * 1000), key);
  };

  knapsack();

  nodeDataArray.find(item => item.key === bestKey).icon = "check-mark.png"

  myDiagram.model = new go.TreeModel(nodeDataArray);
}