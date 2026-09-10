package main.java.leinberger.daniel;

import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        String text = "Das ist ein kurzer Satz";
        Map<String, Integer> h = histogram(text);
        System.out.println(h);
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
}