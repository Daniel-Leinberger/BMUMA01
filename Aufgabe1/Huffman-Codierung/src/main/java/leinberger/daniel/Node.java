package main.java.leinberger.daniel;

public class Node {
    private String character;
    private double probability;
    private Node leftNode = null;
    private Node rightNode = null;

    public Node(){};
    public Node(String character, int count, double totalCountOfCharacters) {
        this.character = character;
        this.probability = count / totalCountOfCharacters;
    }

    public boolean isLeaf()
    {
        return leftNode == null && rightNode==null;
    }

    public String getCharacter() {
        return character;
    }

    public void setCharacter(String character) {
        this.character = character;
    }

    public double getProbability() {
        return probability;
    }

    public void setProbability(double probability) {
        this.probability = probability;
    }

    public void setLeftNode(Node leftNode) {
        this.leftNode = leftNode;
    }

    public void setRightNode(Node rightNode) {
        this.rightNode = rightNode;
    }

    public Node getLeftNode() {
        return leftNode;
    }

    public Node getRightNode() {
        return rightNode;
    }
}
