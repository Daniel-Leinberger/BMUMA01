package main.java.leinberger.daniel;

import java.util.*;

public class Main {
    public static void main(String[] args) {
        String text = "Das ist ein kurzer Satz";
        System.out.println("----- Teilaufgabe E -----");
        Map<String, Integer> h = histogram(text);
        System.out.println(h+"\n");

        System.out.println("----- Teilaufgabe F -----");
        Node root = createHuffmanTree(text);
        System.out.println("Root-Knoten heißt: "+root.getCharacter()+"\n");

        System.out.println("----- Teilaufgabe G -----");
        h.forEach((key, value)->
                System.out.println("Der Code für das Zeichen "+key+" ist: "+getCharacterCode(root,key,new StringBuilder()))
        );
    }

    public static Map<String, Integer> histogram(String text)
    {
        Map<String, Integer> map = new HashMap<>();
        for(char c : text.toCharArray())
        {
            if(c ==' ')
            {
                c = '␣';
            }
            map.put("'"+c+"'", map.getOrDefault("'"+c+"'",0)+1);
        }

        return map;
    }

    public static Node createHuffmanTree(String sentence)
    {
        Map<String, Integer> map = histogram(sentence);
        //https://docs.oracle.com/javase/8/docs/api/java/util/PriorityQueue.html
        PriorityQueue<Node> queue = new PriorityQueue<>(Comparator.comparingDouble(Node::getProbability));

        double totalCharacters = sentence.length();

        map.forEach((key, value) -> queue.add(new Node(key, value, totalCharacters)));

        leafsToRoot(queue);

        return queue.poll();
    }

    /**
     * Arbeitet sich durch die Queue der Leafes und erstellt solange Knoten bis der Root des Huffman-Codebaums erreicht wurde.
     * @param queue
     * @return queue mit einem einzigen Element -> Dem root der Huffman-Codebaums
     */
    private static void leafsToRoot(PriorityQueue<Node> queue) {
        while(queue.size()>1)
        {
            Node left = queue.poll();
            Node right = queue.poll();

            System.out.println("Connecting "+left.getCharacter()+" and "+right.getCharacter());

            Node parent = new Node();
            parent.setCharacter(left.getCharacter()+" "+right.getCharacter());
            parent.setProbability(left.getProbability()+right.getProbability());
            parent.setLeftNode(left);
            parent.setRightNode(right);

            queue.add(parent);
        }
    }

    public static String getCharacterCode(Node node, String character, StringBuilder sb)
    {
        Map.Entry<Node, Integer> entry = leftOrRightNode(node, character);
        if(entry.getValue() != -1)
        {
            sb.append(entry.getValue());
            getCharacterCode(entry.getKey(), character, sb);
        }
        return sb.toString();

    }

    private static Map.Entry<Node, Integer> leftOrRightNode(Node node, String character)
    {
        if(!node.isLeaf())
        {
            if(node.getLeftNode().getCharacter().contains(character))
            {
                return new AbstractMap.SimpleEntry<>(node.getLeftNode(), 0);
            }
            else if(node.getRightNode().getCharacter().contains(character))
            {
                return new AbstractMap.SimpleEntry<>(node.getRightNode(), 1);
            }
            else
            {
                return new AbstractMap.SimpleEntry<>(node, -1);
            }
        }
        else
        {
            return new AbstractMap.SimpleEntry<>(node, -1);
        }
    }
}