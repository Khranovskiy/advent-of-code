function createNode(key) {
  const neighbors = [];

  return {
    key,
    neighbors,
    addNeighbor(node) {
      neighbors.push(node);
    }
  };
}

function createGraph(directed = false) {
  const nodes = [];
  const edges = [];

  return {
    directed,
    nodes,
    edges,

    addNode(key) {
      nodes.push(createNode(key));
      
      return `Add node: ${this.getNode(key).key}`;
    },

    getNode(key) {
      return nodes.find(node => node.key === key);
    },

    addEdge(node1Key, node2Key) {
      const node1 = this.getNode(node1Key);
      const node2 = this.getNode(node2Key);

      node1.addNeighbor(node2);
      edges.push(`${node1Key}-${node2Key}`);

      if (!directed) {
        node2.addNeighbor(node1);
        return `Add edges: ${node1Key} -> ${node2Key}; ${node2Key} -> ${node1Key}`
      }
      
      return `Add edge: ${node1Key} -> ${node2Key}`
    },
    
    printNode(key) {
      let node = this.getNode(key)
      let result = node.key
      
      if (node.neighbors.length) {
        result += ` -> ${node.neighbors
          .map(neighbor => neighbor.key)
          .join(', ')}`;
      }
      
      return result;
    },
    
    print() {
      return nodes
        .map(({ key }) => this.printNode(key)).join(`\n`);
    }
  };
}

export {
   createNode,
   createGraph
}

